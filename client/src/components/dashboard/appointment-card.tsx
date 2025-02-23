import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Video, User } from "lucide-react";

type AppointmentCardProps = {
  doctor: {
    name: string;
    specialty: string;
    image?: string;
  };
  date: Date;
  type: "virtual" | "in-person";
  status: "pending" | "confirmed" | "cancelled";
  onCancel?: () => void;
};

export function AppointmentCard({
  doctor,
  date,
  type,
  status,
  onCancel,
}: AppointmentCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-4 pb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={doctor.image} alt={doctor.name} />
          <AvatarFallback>{doctor.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-lg">{doctor.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
        </div>
        <Badge
          variant={
            status === "confirmed"
              ? "default"
              : status === "cancelled"
              ? "destructive"
              : "secondary"
          }
        >
          {status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <p className="text-sm font-medium">
              {format(date, "EEEE, MMMM d, yyyy")}
            </p>
            <p className="text-sm text-muted-foreground">
              {format(date, "h:mm a")}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {type === "virtual" ? (
              <Video className="h-4 w-4 text-muted-foreground" />
            ) : (
              <User className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="text-sm text-muted-foreground capitalize">
              {type}
            </span>
          </div>
        </div>
        {status !== "cancelled" && onCancel && (
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={onCancel}
          >
            Cancel Appointment
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
