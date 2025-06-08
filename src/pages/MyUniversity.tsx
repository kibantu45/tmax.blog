
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, GraduationCap, Users, Bell, BookOpen, Clock, MapPin, Star, Phone } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const MyUniversity = () => {
  const announcements = [
    {
      id: 1,
      title: "Mid-Semester Exam Schedule Released",
      content: "Check your student portal for updated exam timetables. Exams begin next Monday.",
      date: "2024-03-15",
      urgent: true
    },
    {
      id: 2,
      title: "Library Extended Hours",
      content: "The library will be open 24/7 during exam period to support student studies.",
      date: "2024-03-14",
      urgent: false
    },
    {
      id: 3,
      title: "Student Housing Applications",
      content: "Applications for next semester accommodation are now open. Deadline: March 30th.",
      date: "2024-03-12",
      urgent: false
    }
  ];

  const events = [
    {
      id: 1,
      title: "Tech Career Fair",
      date: "March 25, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Main Auditorium",
      description: "Meet with top tech companies and explore career opportunities."
    },
    {
      id: 2,
      title: "Student Innovation Challenge",
      date: "March 30, 2024",
      time: "10:00 AM - 6:00 PM",
      location: "Engineering Building",
      description: "Showcase your innovative projects and compete for prizes."
    },
    {
      id: 3,
      title: "Cultural Festival",
      date: "April 5, 2024",
      time: "6:00 PM - 11:00 PM",
      location: "Campus Grounds",
      description: "Celebrate diversity with food, music, and performances from different cultures."
    }
  ];

  const academicServices = [
    {
      id: 1,
      name: "Academic Advising",
      description: "Get guidance on course selection and academic planning",
      contact: "+254702752033",
      rating: 4.8
    },
    {
      id: 2,
      name: "Tutoring Services",
      description: "Peer tutoring for challenging subjects",
      contact: "+254702752034",
      rating: 4.6
    },
    {
      id: 3,
      name: "Career Counseling",
      description: "Career guidance and job placement assistance",
      contact: "+254702752035",
      rating: 4.9
    },
    {
      id: 4,
      name: "Mental Health Support",
      description: "Counseling and mental wellness services",
      contact: "+254702752036",
      rating: 4.7
    }
  ];

  const handleContact = (service: any) => {
    const message = `Hi! I'd like to inquire about ${service.name}. Please provide more information.`;
    const whatsappUrl = `https://wa.me/${service.contact.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 pb-20">
      {/* Header with glassmorphism */}
      <header className="glass backdrop-blur-xl bg-white/20 border-b border-white/30 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center animate-float">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
                My University
              </h1>
            </div>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 hover:scale-105 transition-all duration-300"
              onClick={() => window.location.href = "/"}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="announcements" className="w-full">
          <TabsList className="grid w-full grid-cols-3 glass bg-white/30 backdrop-blur-sm border-white/20">
            <TabsTrigger 
              value="announcements" 
              className="data-[state=active]:bg-white/50 data-[state=active]:shadow-lg transition-all duration-300"
            >
              <Bell className="w-4 h-4 mr-2" />
              Announcements
            </TabsTrigger>
            <TabsTrigger 
              value="events" 
              className="data-[state=active]:bg-white/50 data-[state=active]:shadow-lg transition-all duration-300"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger 
              value="services" 
              className="data-[state=active]:bg-white/50 data-[state=active]:shadow-lg transition-all duration-300"
            >
              <Users className="w-4 h-4 mr-2" />
              Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="announcements" className="mt-6">
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <Card key={announcement.id} className="glass backdrop-blur-lg bg-white/30 hover:bg-white/40 border-white/20 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] animate-fade-in" style={{animationDelay: `${index * 150}ms`}}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg flex items-center">
                        {announcement.urgent && (
                          <Bell className="w-5 h-5 mr-2 text-red-500 animate-pulse" />
                        )}
                        {announcement.title}
                      </CardTitle>
                      <span className="text-sm text-gray-500">{announcement.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{announcement.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <Card key={event.id} className="glass backdrop-blur-lg bg-white/30 hover:bg-white/40 border-white/20 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in" style={{animationDelay: `${index * 200}ms`}}>
                  <CardHeader>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-purple-500" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                          {event.location}
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all duration-300">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {academicServices.map((service, index) => (
                <Card key={service.id} className="glass backdrop-blur-lg bg-white/30 hover:bg-white/40 border-white/20 hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in" style={{animationDelay: `${index * 150}ms`}}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <div className="flex items-center mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current animate-glow" />
                          <span className="ml-1 text-sm font-medium">{service.rating}</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleContact(service)}
                        className="bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-300"
                        size="sm"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{service.description}</p>
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
