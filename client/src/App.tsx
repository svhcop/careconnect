import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/navbar";
import { BottomNav } from "@/components/layout/bottom-nav";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import DoctorDashboard from "@/pages/dashboard/doctor";
import PatientDashboard from "@/pages/dashboard/patient";
import SearchPage from "@/pages/search";
import ProfileSettings from "@/pages/profile/settings";
import NotFound from "@/pages/not-found";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { LandingPage } from "@/pages/landing";
import { Spinner } from "./components/ui/spinner";
import TermsOfService from "@/pages/terms-of-service";
import PrivacyPolicy from "@/pages/privacy-policy";
import LearnMore from "@/pages/learn-more";
import PrivateRoute from "./components/PrivateRoute";
// Remove unused import since Home component is not used and file doesn't exist
// Remove duplicate import since ProfileSettings is already imported above

function Router() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | null>(null);
  const [roleLoading, setRoleLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      setRoleLoading(true);
      
      if (user) {
        try {
          const token = await user.getIdToken();
          const response = await fetch(`/api/users/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          
          const userData = await response.json();
          setUserRole(userData.role);
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
      
      setLoading(false);
      setRoleLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading || (user && roleLoading)) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  const getDashboard = () => {
    if (!user || roleLoading) {
      return <LandingPage />;
    }
    
    if (!userRole) {
      return <div className="h-screen w-full flex items-center justify-center">Error loading user data</div>;
    }
    
    return userRole === 'doctor' ? <DoctorDashboard /> : <PatientDashboard />;
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Switch>
          <Route path="/signin">
            {user ? getDashboard() : <SignIn />}
          </Route>
          <Route path="/signup">
            {user ? getDashboard() : <SignUp />}
          </Route>
          <Route path="/dashboard/doctor">
            {user && userRole === 'doctor' ? <DoctorDashboard /> : <SignIn />}
          </Route>
          <Route path="/dashboard/patient">
            {user && userRole === 'patient' ? <PatientDashboard /> : <SignIn />}
          </Route>
          <Route path="/search">
            {user ? <SearchPage /> : <SignIn />}
          </Route>
          <Route path="/profile">
            {user ? <ProfileSettings /> : <SignIn />}
          </Route>
          <Route path="/terms-of-service">
            <TermsOfService />
          </Route>
          <Route path="/privacy-policy">
            <PrivacyPolicy />
          </Route>
          <Route path="/learn-more">
            <LearnMore />
          </Route>
          <Route path="/">
            {getDashboard()}
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      {user && <BottomNav />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;