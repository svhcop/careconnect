import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentCard } from "@/components/dashboard/appointment-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/lib/notification-context";

export default function AppointmentsPage() {
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const { data: appointments, isLoading, error } = useQuery({
    queryKey: ["/api/appointments/me", auth.currentUser?.uid],
    enabled: !!auth.currentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleCancelAppointment = async (appointmentId: number) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}/cancel`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to cancel appointment');

      toast({
        title: "Appointment cancelled",
        description: "The appointment has been cancelled successfully.",
      });
      addNotification('info', 'Your appointment has been cancelled successfully.');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to cancel appointment",
        variant: "destructive",
      });
    }
  };

  const filteredAppointments = (appointments as any[] || []).filter(appointment => {
    const isUpcoming = new Date(appointment.date) > new Date();
    const matchesSearch = 
      appointment.doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchQuery.toLowerCase());
    return selectedTab === "upcoming" ? (isUpcoming && matchesSearch) : (!isUpcoming && matchesSearch);
  });

  return (
    <div className="container mx-auto px-4 py-8 mb-20">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Appointments</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by doctor name or appointment type..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading appointments...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-destructive">
                  <p>Failed to load appointments. Please try again later.</p>
                </div>
              ) : filteredAppointments.length > 0 ? (
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      doctor={{
                        name: appointment.doctor.name,
                        specialty: appointment.doctor.specialty,
                      }}
                      date={new Date(appointment.date)}
                      type={appointment.type}
                      status={appointment.status}
                      onCancel={() => handleCancelAppointment(appointment.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-lg font-medium mb-2">No appointments found</p>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? "Try different search terms"
                      : selectedTab === "upcoming"
                      ? "You have no upcoming appointments"
                      : "You have no past appointments"}
                  </p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="past" className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading appointments...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-destructive">
                  <p>Failed to load appointments. Please try again later.</p>
                </div>
              ) : filteredAppointments.length > 0 ? (
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      doctor={{
                        name: appointment.doctor.name,
                        specialty: appointment.doctor.specialty,
                      }}
                      date={new Date(appointment.date)}
                      type={appointment.type}
                      status={appointment.status}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-lg font-medium mb-2">No appointments found</p>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? "Try different search terms"
                      : "You have no past appointments"}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}