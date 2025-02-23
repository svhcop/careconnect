import { Link } from "wouter";
import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome to CareConnect</CardTitle>
            <CardDescription className="text-center">
              Sign in to access your healthcare dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm mode="signin" />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Don't have an account yet?
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup">Create an Account</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}