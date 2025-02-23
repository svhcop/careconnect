import { Link } from "wouter";
import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">
              Join CareConnect to manage your healthcare journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm mode="signup" />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}