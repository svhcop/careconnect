import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentCard } from "@/components/dashboard/appointment-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Search, Calendar, Clock } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/lib/notification-context";
import { NotificationBell } from "@/components/ui/notification-bell";

export default function PatientDashboard() {
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: appointments, isLoading, error } = useQuery({
    queryKey: ["/api/appointments/patient", auth.currentUser?.uid],
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

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      nextAvailable: "Tomorrow at 10:00 AM",
    },
    {
      id: 2,
      name: "Dr. Michael Smith",
      specialty: "Neurologist",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      nextAvailable: "Today at 2:30 PM",
    },
  ];

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <NotificationBell />
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Find a Doctor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or specialty..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id}>
                <CardContent className="flex items-center space-x-4 p-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-16 w-16 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {doctor.specialty}
                    </p>
                    <div className="mt-2 flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      {doctor.nextAvailable}
                    </div>
                  </div>
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    Book
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="space-y-4">
              {isLoading ? (
                <div>Loading appointments...</div>
              ) : (
                <div className="space-y-4">
                  <AppointmentCard
                    doctor={{
                      name: "Dr. Sarah Johnson",
                      specialty: "Cardiologist",
                    }}
                    date={new Date("2024-03-20T10:00:00")}
                    type="virtual"
                    status="confirmed"
                    onCancel={() => handleCancelAppointment(1)}
                  />
                </div>
              )}
            </TabsContent>
            <TabsContent value="past" className="space-y-4">
              <AppointmentCard
                doctor={{
                  name: "Dr. Michael Smith",
                  specialty: "Neurologist",
                }}
                date={new Date("2024-03-15T14:30:00")}
                type="in-person"
                status="confirmed"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}