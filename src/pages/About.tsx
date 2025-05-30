
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Heart, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-700">About Tmax</h1>
              <p className="text-gray-600 mt-2">Your trusted campus services platform</p>
            </div>
            <Button onClick={() => window.location.href = "/"} variant="outline">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-800 mb-6">Our Mission</h2>
          <p className="text-xl text-green-700 max-w-4xl mx-auto">
            To revolutionize campus life by providing students with convenient, reliable, and affordable access to essential services, 
            making university experience smoother and more enjoyable.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center bg-white/90 border-green-200">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-green-800">Community First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">
                We prioritize the needs of our campus community, building services that truly matter to students.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/90 border-green-200">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-green-800">Reliability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">
                Consistent, dependable service delivery that students can count on every day.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/90 border-green-200">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-green-800">Care & Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">
                We genuinely care about student well-being and provide compassionate support.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/90 border-green-200">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-green-800">Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">
                Continuous improvement and innovation to deliver the best possible experience.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story Section */}
        <div className="bg-white/90 rounded-lg p-8 border border-green-200 mb-16">
          <h3 className="text-2xl font-bold text-green-800 mb-6">Our Story</h3>
          <div className="prose prose-green max-w-none">
            <p className="text-green-700 mb-4">
              Tmax was born from a simple observation: university life shouldn't be complicated by basic needs. 
              As students ourselves, we experienced firsthand the challenges of finding reliable services on campus - 
              from getting groceries delivered to finding trustworthy laundry services.
            </p>
            <p className="text-green-700 mb-4">
              What started as a small initiative to help fellow students has grown into a comprehensive platform 
              serving thousands of students across campus. We've partnered with local businesses and service providers 
              to create an ecosystem that benefits everyone - students get convenience, and local businesses get customers.
            </p>
            <p className="text-green-700">
              Today, Tmax continues to evolve, always listening to our community's needs and adapting our services 
              to make campus life better for everyone.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-green-100 rounded-lg p-6 border border-green-200">
            <div className="text-3xl font-bold text-green-800 mb-2">12+</div>
            <div className="text-green-700">Services Available</div>
          </div>
          <div className="bg-green-100 rounded-lg p-6 border border-green-200">
            <div className="text-3xl font-bold text-green-800 mb-2">1000+</div>
            <div className="text-green-700">Happy Students</div>
          </div>
          <div className="bg-green-100 rounded-lg p-6 border border-green-200">
            <div className="text-3xl font-bold text-green-800 mb-2">24/7</div>
            <div className="text-green-700">Support Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
