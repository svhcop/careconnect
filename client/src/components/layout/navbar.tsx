import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BRAND } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/firebase";
import { useLocation } from "wouter";
import { LogOut, User } from "lucide-react";

export function Navbar() {
  const [, setLocation] = useLocation();

  const handleSignOut = async () => {
    await auth.signOut();
    setLocation("/signin");
  };

  return (
    <nav className="border-b bg-background shadow-sm overflow-x-hidden">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Link href="/" className="flex items-center space-x-2 min-w-0">
          <BRAND.logo className="h-6 w-6 sm:h-7 sm:w-7 text-primary flex-shrink-0" />
          <span className="font-bold text-lg sm:text-xl text-primary truncate">{BRAND.name}</span>
        </Link>

        <div className="flex items-center space-x-4 flex-shrink-0">
          {auth.currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={auth.currentUser.photoURL || ""} alt={auth.currentUser.displayName || ""} />
                    <AvatarFallback>{auth.currentUser.email?.[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setLocation("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-white font-medium px-6">
              <Link href="/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}