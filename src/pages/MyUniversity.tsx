
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Calendar, 
  MapPin, 
  Clock,
  FileText,
  Trophy,
  MessageSquare,
  Wifi,
  Coffee,
  Car,
  Heart
} from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const MyUniversity = () => {
  const universityTabs = [
    { id: "academics", name: "Academics", icon: BookOpen },
    { id: "campus-life", name: "Campus Life", icon: Users },
    { id: "facilities", name: "Facilities", icon: MapPin },
    { id: "events", name: "Events", icon: Calendar },
    { id: "resources", name: "Resources", icon: FileText },
  ];

  const academicServices = [
    { name: "Course Registration", description: "Register for semester courses", icon: BookOpen, status: "Available" },
    { name: "Academic Calendar", description: "View important academic dates", icon: Calendar, status: "Updated" },
    { name: "Grade Portal", description: "Check your semester grades", icon: Trophy, status: "Available" },
    { name: "Library Services", description: "Access digital library resources", icon: FileText, status: "24/7" },
    { name: "Academic Advising", description: "Meet with academic advisors", icon: Users, status: "By Appointment" },
    { name: "Transcript Request", description: "Request official transcripts", icon: FileText, status: "Online" },
  ];

  const campusLifeServices = [
    { name: "Student Organizations", description: "Join clubs and societies", icon: Users, color: "bg-blue-100" },
    { name: "Sports & Recreation", description: "Gym, sports, and fitness activities", icon: Trophy, color: "bg-green-100" },
    { name: "Student Housing", description: "Dormitory and housing information", icon: MapPin, color: "bg-purple-100" },
    { name: "Campus Forums", description: "Connect with fellow students", icon: MessageSquare, color: "bg-yellow-100" },
    { name: "Mental Health Support", description: "Counseling and wellness services", icon: Heart, color: "bg-pink-100" },
    { name: "Career Services", description: "Job placement and career guidance", icon: GraduationCap, color: "bg-indigo-100" },
  ];

  const facilities = [
    { name: "WiFi Access", description: "Free campus-wide internet", icon: Wifi, available: true },
    { name: "Computer Labs", description: "24/7 computer access", icon: BookOpen, available: true },
    { name: "Cafeteria", description: "Multiple dining options", icon: Coffee, available: true },
    { name: "Parking", description: "Student parking areas", icon: Car, available: true },
    { name: "Medical Center", description: "On-campus health services", icon: Heart, available: true },
    { name: "Recreation Center", description: "Gym and sports facilities", icon: Trophy, available: true },
  ];

  const upcomingEvents = [
    { name: "Orientation Week", date: "Jan 15-20, 2024", type: "Academic", description: "Welcome new students" },
    { name: "Career Fair", date: "Feb 10, 2024", type: "Career", description: "Meet potential employers" },
    { name: "Sports Day", date: "Feb 25, 2024", type: "Recreation", description: "Inter-faculty competitions" },
    { name: "Tech Conference", date: "Mar 5, 2024", type: "Academic", description: "Latest in technology trends" },
    { name: "Cultural Festival", date: "Mar 20, 2024", type: "Cultural", description: "Celebrate diversity" },
  ];

  const resources = [
    { name: "Student Handbook", description: "Complete guide to university policies", type: "PDF" },
    { name: "Course Catalog", description: "All available courses and requirements", type: "Online" },
    { name: "Campus Map", description: "Interactive campus navigation", type: "Interactive" },
    { name: "Emergency Contacts", description: "Important phone numbers", type: "Quick Access" },
    { name: "IT Help Desk", description: "Technical support for students", type: "Support" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-700 flex items-center">
                <GraduationCap className="w-8 h-8 mr-3" />
                My University
              </h1>
              <p className="text-gray-600 mt-2">Your campus hub for academics and student life</p>
            </div>
            <Button onClick={() => window.history.back()} variant="outline">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="academics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white/80">
            {universityTabs.map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white flex items-center gap-2 text-xs md:text-sm"
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="academics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {academicServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white/90">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          <CardDescription>{service.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{service.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Access Service
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="campus-life" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campusLifeServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white/90">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${service.color || 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
                        <service.icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white/90">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <facility.icon className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{facility.name}</CardTitle>
                          <CardDescription>{facility.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={facility.available ? "default" : "destructive"}>
                        {facility.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={!facility.available}
                    >
                      {facility.available ? "View Details" : "Coming Soon"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white/90">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{event.name}</CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{event.type}</Badge>
                        <p className="text-sm text-gray-600 mt-1">{event.date}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                        Register
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white/90">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{resource.name}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </div>
                      <Badge variant="secondary">{resource.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gray-600 hover:bg-gray-700">
                      Access Resource
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default MyUniversity;
