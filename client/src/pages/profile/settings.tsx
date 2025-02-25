import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { uploadProfilePicture } from "@/lib/storage";

const profileSchema = z.object({
  displayName: z.string().min(2),
  phoneNumber: z.string().min(10),
  specialty: z.string().optional(),
  bio: z.string().optional(),
  profilePicture: z.union([z.string(), z.instanceof(File)]).optional(),
  // Additional fields for doctors
  medicalLicense: z.string().optional(),
  education: z.string().optional(),
  certifications: z.string().optional(),
  yearsOfExperience: z.string().optional(),
  languages: z.string().optional(),
});

export default function ProfileSettings() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", auth.currentUser?.uid],
    queryFn: async () => {
      if (!auth.currentUser) {
        throw new Error("Not authenticated");
      }
      try {
        const token = await auth.currentUser.getIdToken(true); // Force refresh token
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: "include",
        });
        if (response.status === 401) {
          throw new Error("Authentication failed");
        }
        if (!response.ok) {
          throw new Error("Error loading user data");
        }
        return response.json();
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
    },
    enabled: !!auth.currentUser,
    retry: 1, // Only retry once on failure
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: "",
      phoneNumber: "",
      specialty: "",
      bio: "",
      profilePicture: "",
      medicalLicense: "",
      education: "",
      certifications: "",
      yearsOfExperience: "",
      languages: "",
    },
  });

  React.useEffect(() => {
    if (user) {
      form.reset({
        displayName: (user as any).displayName || "",
        phoneNumber: (user as any).phoneNumber || "",
        specialty: (user as any).specialty || "",
        bio: (user as any).bio || "",
        profilePicture: (user as any).profilePicture || "",
        medicalLicense: (user as any).medicalLicense || "",
        education: (user as any).education || "",
        certifications: (user as any).certifications || "",
        yearsOfExperience: (user as any).yearsOfExperience || "",
        languages: (user as any).languages || "",
      });
    }
  }, [user, form]);

  // In your existing settings.tsx file, update the onSubmit function:
  
  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      // If there's a new profile picture file
      if (values.profilePicture instanceof File) {
        try {
          const imageUrl = await uploadProfilePicture(values.profilePicture);
          values.profilePicture = imageUrl;
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to upload profile picture",
            variant: "destructive",
          });
          return;
        }
      }
  
      // Update user profile
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
        method: "PATCH",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
  
      if (!response.ok) throw new Error("Failed to update profile");
  
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["user", auth.currentUser?.uid] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Profile Settings</CardTitle>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!isEditing}
                        placeholder="Your full name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!isEditing}
                        placeholder="+1 (555) 000-0000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {(user as { role?: string })?.role === "doctor" && (
                <FormField
                  control={form.control}
                  name="specialty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialty</FormLabel>
                      <Select
                        disabled={!isEditing}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your specialty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="dermatology">Dermatology</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-4">
                        {field.value && typeof field.value === 'string' && (
                          <img
                            src={field.value}
                            alt="Profile"
                            className="h-20 w-20 rounded-full object-cover"
                          />
                        )}
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                            }
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={!isEditing}
                        placeholder="Tell us about yourself..."
                        className="h-32"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {(user as { role?: string })?.role === "doctor" && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="medicalLicense"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical License Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isEditing}
                            placeholder="Enter your medical license number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            disabled={!isEditing}
                            placeholder="Enter your educational background"
                            className="h-24"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="certifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certifications</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            disabled={!isEditing}
                            placeholder="List your professional certifications"
                            className="h-24"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearsOfExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isEditing}
                            placeholder="Enter years of professional experience"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="languages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Languages Spoken</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isEditing}
                            placeholder="Enter languages you speak (comma-separated)"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {isEditing && (
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
