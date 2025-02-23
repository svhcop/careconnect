import { Link, useLocation } from "wouter";
import { Home, Search, Calendar, User, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";

export function BottomNav() {
  const [location] = useLocation();

  const { data: user } = useQuery({
    queryKey: ["/api/users/me", auth.currentUser?.uid],
    enabled: !!auth.currentUser,
  });

  const isDoctor = (user as { role?: string })?.role === "doctor";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-background border-t">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium text-sm">
        <div className="flex flex-col items-center justify-center space-y-1">
          <Link href="/">
            <a
              className={cn(
                "inline-flex flex-col items-center justify-center px-5 hover:bg-muted",
                location === "/" && "text-primary"
              )}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs">Home</span>
            </a>
          </Link>
        </div>

        {!isDoctor && (
          <div className="flex flex-col items-center justify-center space-y-1">
            <Link href="/search">
              <a
                className={cn(
                  "inline-flex flex-col items-center justify-center px-5 hover:bg-muted",
                  location === "/search" && "text-primary"
                )}
              >
                <Search className="w-6 h-6" />
                <span className="text-xs">Find Doctor</span>
              </a>
            </Link>
          </div>
        )}

        <div className="flex flex-col items-center justify-center space-y-1">
          <Link href="/appointments">
            <a
              className={cn(
                "inline-flex flex-col items-center justify-center px-5 hover:bg-muted",
                location === "/appointments" && "text-primary"
              )}
            >
              <Calendar className="w-6 h-6" />
              <span className="text-xs">Appointments</span>
            </a>
          </Link>
        </div>

        {isDoctor && (
          <div className="flex flex-col items-center justify-center space-y-1">
            <Link href="/patients">
              <a
                className={cn(
                  "inline-flex flex-col items-center justify-center px-5 hover:bg-muted",
                  location === "/patients" && "text-primary"
                )}
              >
                <Stethoscope className="w-6 h-6" />
                <span className="text-xs">Patients</span>
              </a>
            </Link>
          </div>
        )}

        <div className="flex flex-col items-center justify-center space-y-1">
          <Link href="/profile">
            <a
              className={cn(
                "inline-flex flex-col items-center justify-center px-5 hover:bg-muted",
                location === "/profile" && "text-primary"
              )}
            >
              <User className="w-6 h-6" />
              <span className="text-xs">Profile</span>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
