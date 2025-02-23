import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } from "@/lib/firebase";
import { FcGoogle } from "react-icons/fc";
import { useLocation } from "wouter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["patient", "doctor"]).optional(),
});

type AuthFormProps = {
  mode: "signin" | "signup";
};

function ForgotPasswordDialog() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await resetPassword(email);
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email for password reset instructions.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="px-0 font-normal">Forgot password?</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <FormField
            name="email"
            render={() => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            Send Reset Link
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AuthForm({ mode }: AuthFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      role: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    setLoading(true);
    try {
      if (mode === "signin") {
        const result = await signInWithEmail(values.email, values.password);
        if (result.user) {
          setLocation("/"); // Redirect to home/dashboard after successful sign in
        }
      } else {
        if (!values.role) {
          throw new Error("Please select your role");
        }
        // For signup, we need to create the user in Firebase and our database
        const userCredential = await signUpWithEmail(values.email, values.password);

        // Create user in our database with role
        await apiRequest("POST", "/api/users", {
          firebaseId: userCredential.user.uid,
          email: values.email,
          role: values.role,
        });

        setLocation("/"); // Redirect to home/dashboard after successful sign up
      }
      toast({
        title: mode === "signin" ? "Welcome back!" : "Account created",
        description: mode === "signin" ? "Successfully signed in" : "Your account has been created successfully",
      });
    } catch (error: any) {
      let errorMessage = error.message;
      if (error.code === "auth/user-not-found" && mode === "signin") {
        errorMessage = "No account found with this email. Please sign up first.";
        setLocation("/signup");
      } else if (error.code === "auth/email-already-in-use" && mode === "signup") {
        errorMessage = "An account already exists with this email. Please sign in.";
        setLocation("/signin");
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      if (mode === "signup" && !form.getValues("role")) {
        toast({
          title: "Role Required",
          description: "Please select if you are a patient or healthcare provider before continuing with Google",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);
      console.log("Starting Google sign in...");
      const result = await signInWithGoogle();

      if (result && result.user) {
        console.log("Google sign in successful, creating user in database...");
        if (mode === "signup") {
          // Create user in our database with role
          await apiRequest("POST", "/api/users", {
            firebaseId: result.user.uid,
            email: result.user.email,
            role: form.getValues("role"),
          });
        }

        toast({
          title: "Welcome!",
          description: "Successfully signed in with Google",
        });
        setLocation("/"); // Redirect to home/dashboard
      }
    } catch (error: any) {
      console.error('Google Sign In Error:', error);
      toast({
        title: "Google Sign In Failed",
        description: error.message || "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {mode === "signup" && (
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>I am a</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="patient">Patient</SelectItem>
                        <SelectItem value="doctor">Healthcare Provider</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Enter your email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Enter your password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {mode === "signin" && (
              <div className="text-sm text-right">
                <ForgotPasswordDialog />
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {mode === "signin" ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </Form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={loading || (mode === "signup" && !form.getValues("role"))}
        >
          <FcGoogle className="mr-2 h-4 w-4" />
          Google
        </Button>
      </CardContent>
    </Card>
  );
}