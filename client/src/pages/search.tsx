import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const { data: doctors, isLoading } = useQuery({
    queryKey: ["/api/users/doctors"],
    enabled: true,
  });

  const filteredDoctors = doctors?.filter(doctor => 
    doctor.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty?.toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? [];

  const handleBookAppointment = async (doctorId: number) => {
    try {
      // TODO: Implement appointment booking
      toast({
        title: "Coming Soon",
        description: "Appointment booking will be available soon!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book appointment",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-20">
      <h1 className="text-2xl font-bold mb-6">Find a Doctor</h1>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or specialty..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div>Loading doctors...</div>
      ) : (
        <div className="space-y-4">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id}>
              <CardContent className="flex items-center space-x-4 p-4">
                <div className="flex-1">
                  <h3 className="font-medium">{doctor.displayName}</h3>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                </div>
                <Button onClick={() => handleBookAppointment(doctor.id)}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Book
                </Button>
              </CardContent>
            </Card>
          ))}
          
          {filteredDoctors.length === 0 && (
            <div className="text-center text-muted-foreground">
              No doctors found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
