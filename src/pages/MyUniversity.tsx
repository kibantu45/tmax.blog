
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, FileText, Users, GraduationCap, Clock, MapPin, Phone } from "lucide-react";

const MyUniversity = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const academicResources = [
    { title: "Library Services", description: "Access to digital and physical resources", icon: BookOpen, hours: "24/7 Digital, 6AM-10PM Physical" },
    { title: "Academic Calendar", description: "Important dates and deadlines", icon: Calendar, status: "Current Semester" },
    { title: "Course Registration", description: "Register for courses and view schedules", icon: FileText, deadline: "Registration closes Dec 15" },
    { title: "Student Portal", description: "Access grades, transcripts, and records", icon: Users, status: "Online" }
  ];

  const campusServices = [
    { name: "Student Affairs Office", location: "Main Building, Floor 2", contact: "+254 700 123 456", hours: "8AM-5PM" },
    { name: "Finance Office", location: "Administration Block", contact: "+254 700 123 457", hours: "8AM-4PM" },
    { name: "IT Support", location: "Computer Lab Building", contact: "+254 700 123 458", hours: "8AM-6PM" },
    { name: "Health Center", location: "Near Main Gate", contact: "+254 700 123 459", hours: "24/7 Emergency" }
  ];

  const announcements = [
    { title: "Mid-Semester Exams", date: "Dec 10-15, 2024", type: "Academic", urgent: true },
    { title: "Student Leadership Elections", date: "Dec 20, 2024", type: "Student Life", urgent: false },
    { title: "Career Fair 2024", date: "Jan 15, 2025", type: "Career", urgent: false },
    { title: "Library System Maintenance", date: "Dec 5, 2024", type: "Service", urgent: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastelYellow via-pastelYellow-light to-pastelYellow-dark">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-tmaxGreen-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-tmaxGreen-700">University Resources</h1>
              <p className="text-gray-600 mt-2">Your academic support center</p>
            </div>
            <Button onClick={() => window.history.back()} variant="outline">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="academic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80">
            <TabsTrigger value="academic" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              Academic Resources
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              Campus Services
            </TabsTrigger>
            <TabsTrigger value="announcements" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              Announcements
            </TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              Student Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="academic" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {academicResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white/90">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-tmaxGreen-100 rounded-lg flex items-center justify-center">
                        <resource.icon className="w-6 h-6 text-tmaxGreen-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {resource.hours && (
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Clock className="w-4 h-4 mr-2" />
                        {resource.hours}
                      </div>
                    )}
                    {resource.status && (
                      <Badge variant="outline" className="mb-2">{resource.status}</Badge>
                    )}
                    {resource.deadline && (
                      <Badge variant="destructive" className="mb-2">{resource.deadline}</Badge>
                    )}
                    <Button className="w-full mt-4 bg-tmaxGreen-600 hover:bg-tmaxGreen-700">
                      Access {resource.title}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {campusServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white/90">
                  <CardHeader>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {service.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {service.contact}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {service.hours}
                    </div>
                    <Button 
                      className="w-full mt-4 bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                      onClick={() => window.open(`https://wa.me/254702752033?text=Hi, I need help with ${service.name}`, '_blank')}
                    >
                      Contact via WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="announcements" className="space-y-6">
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <Card key={index} className={`hover:shadow-lg transition-shadow bg-white/90 ${announcement.urgent ? 'border-red-200' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{announcement.title}</h3>
                          {announcement.urgent && <Badge variant="destructive">Urgent</Badge>}
                        </div>
                        <p className="text-gray-600 mb-2">{announcement.date}</p>
                        <Badge variant="outline">{announcement.type}</Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow bg-white/90">
                <CardHeader>
                  <CardTitle>Academic Counseling</CardTitle>
                  <CardDescription>Get guidance on course selection and academic planning</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                    onClick={() => window.open('https://wa.me/254702752033?text=Hi, I need academic counseling support', '_blank')}
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow bg-white/90">
                <CardHeader>
                  <CardTitle>Mental Health Support</CardTitle>
                  <CardDescription>Confidential counseling and wellness resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                    onClick={() => window.open('https://wa.me/254702752033?text=Hi, I need mental health support resources', '_blank')}
                  >
                    Get Support
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow bg-white/90">
                <CardHeader>
                  <CardTitle>Financial Aid</CardTitle>
                  <CardDescription>Information about scholarships and financial assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                    onClick={() => window.open('https://wa.me/254702752033?text=Hi, I need information about financial aid', '_blank')}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow bg-white/90">
                <CardHeader>
                  <CardTitle>Career Services</CardTitle>
                  <CardDescription>Resume help, job search, and career planning</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                    onClick={() => window.open('https://wa.me/254702752033?text=Hi, I need career services support', '_blank')}
                  >
                    Get Career Help
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyUniversity;
