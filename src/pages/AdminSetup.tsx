import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminSetup = () => {
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const createAdminUser = async () => {
    setLoading(true);

    try {
      // Sign up the admin user
      const { error: signUpError } = await signUp(
        "osinyamaxwel28@gmail.com", 
        "maxwel45.", 
        "Admin User"
      );

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          // User exists, try to update their role
          toast({
            title: "User exists",
            description: "User already exists. Checking if they're already admin...",
          });

          // Check if user exists and update role
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ role: 'admin' })
            .eq('email', 'osinyamaxwel28@gmail.com');

          if (updateError) {
            toast({
              title: "Error",
              description: "Failed to update user role: " + updateError.message,
              variant: "destructive"
            });
          } else {
            toast({
              title: "Success",
              description: "Admin role has been set successfully!",
            });
          }
        } else {
          toast({
            title: "Error",
            description: signUpError.message,
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Admin user created",
          description: "Admin user has been created. They need to verify their email and then their role will be set.",
        });
      }
    } catch (err) {
      console.error('Error:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Admin Setup</CardTitle>
          <CardDescription>
            Create admin user for the system
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-sm text-gray-600">
            This will create an admin user with email: osinyamaxwel28@gmail.com
          </p>
          <Button 
            onClick={createAdminUser}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Creating..." : "Create Admin User"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;