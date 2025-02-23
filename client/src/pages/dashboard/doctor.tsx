import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScheduleCalendar } from "@/components/dashboard/schedule-calendar";
import { AppointmentCard } from "@/components/dashboard/appointment-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Clock, Users, CalendarRange } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/lib/notification-context";
import { NotificationBell } from "@/components/ui/notification-bell";

export default function DoctorDashboard() {
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const { data: appointments, isLoading, error } = useQuery({
    queryKey: ["/api/appointments/doctor", auth.currentUser?.uid],
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
      addNotification('info', 'You have cancelled the appointment successfully.');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to cancel appointment",
        variant: "destructive",
      });
    }
  };

  const stats = [
    {
      title: "Total Patients",
      value: "124",
      icon: Users,
    },
    {
      title: "Appointments Today",
      value: "8",
      icon: Clock,
    },
    {
      title: "This Week",
      value: "32",
      icon: CalendarRange,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-1 lg:col-span-5">
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
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
                        name: "Sarah Johnson",
                        specialty: "General Check-up",
                      }}
                      date={new Date("2024-03-20T10:00:00")}
                      type="virtual"
                      status="confirmed"
                      onCancel={() => handleCancelAppointment(1)}
                    />
                    <AppointmentCard
                      doctor={{
                        name: "Michael Smith",
                        specialty: "Follow-up",
                      }}
                      date={new Date("2024-03-21T14:30:00")}
                      type="in-person"
                      status="pending"
                      onCancel={() => handleCancelAppointment(2)}
                    />
                  </div>
                )}
              </TabsContent>
              <TabsContent value="past" className="space-y-4">
                <AppointmentCard
                  doctor={{
                    name: "Emily Brown",
                    specialty: "Consultation",
                  }}
                  date={new Date("2024-03-15T11:00:00")}
                  type="virtual"
                  status="confirmed"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-4">
              <CardTitle>Availability</CardTitle>
              <NotificationBell />
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <ScheduleCalendar />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
