import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, CheckCircle2, BarChart2, Lightbulb, Heart } from "lucide-react";

const CycleTracker = () => {
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [lastPeriodDate, setLastPeriodDate] = useState("2024-08-01");

  return (
    <Card className="border-pink-200 bg-pink-50">
      <CardHeader>
        <CardTitle className="text-2xl text-pink-800">🌸 Track Your Cycle</CardTitle>
        <p className="text-pink-600">Enter your cycle details for personalized insights</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Cycle Length (days)</label>
          <input
            type="number"
            value={cycleLength}
            onChange={(e) => setCycleLength(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Period Length (days)</label>
          <input
            type="number"
            value={periodLength}
            onChange={(e) => setPeriodLength(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Period Start Date</label>
          <input
            type="date"
            value={lastPeriodDate}
            onChange={(e) => setLastPeriodDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
          />
        </div>
        <Button className="w-full bg-pink-600 hover:bg-pink-700">Update Cycle</Button>
      </CardContent>
    </Card>
  );
};

const HealthInsight = ({ title, description, icon: Icon }: { title: string; description: string; icon: React.ComponentType<{ className?: string }> }) => (
  <Card className="border-green-200 bg-green-50">
    <CardHeader>
      <CardTitle className="text-lg text-green-800 flex items-center">
        <Icon className="w-5 h-5 mr-2" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

const BloomPeriodTracker = () => {
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [lastPeriodDate, setLastPeriodDate] = useState("2024-08-01");

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <header className="bg-white/90 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                <CalendarDays className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Bloom Period Tracker
              </h1>
            </div>
            <Button 
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              onClick={() => window.location.href = "/"}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Your Personal Period Tracker</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your menstrual cycle, predict your period, and learn about your body
          </p>
        </div>

        <CycleTracker />

        {/* Educational Content */}
        <section className="mb-12">
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-800 mb-4">📚 Educational Resources</CardTitle>
              <p className="text-purple-600">Learn more about your body and menstrual health</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-pink-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg text-pink-800 flex items-center">
                      🌸 Understanding Your Menstrual Cycle
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Learn about the four phases of your cycle and what happens in your body.</p>
                    <Button 
                      className="w-full bg-pink-600 hover:bg-pink-700"
                      onClick={() => window.location.href = '/education/menstrual-cycle'}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-800 flex items-center">
                      🥗 Nutrition During Your Period
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Discover foods that can help reduce cramps and boost your energy.</p>
                    <Button 
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      onClick={() => window.location.href = '/education/nutrition-during-period'}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-800 flex items-center">
                      🌱 Fertility and Ovulation Explained
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Understand your fertile window and ovulation signs.</p>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => window.location.href = '/education/fertility-and-ovulation'}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-800 flex items-center">
                      🌿 Managing PMS Symptoms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Natural ways to manage mood swings, cramps, and other PMS symptoms.</p>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => window.location.href = '/education/managing-pms'}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-800 flex items-center">
                      🏃‍♀️ Exercise During Your Cycle
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Optimize your workouts based on your menstrual cycle phases.</p>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => window.location.href = '/education/exercise-during-cycle'}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <HealthInsight
            title="Track Symptoms"
            description="Log your daily symptoms to identify patterns."
            icon={CheckCircle2}
          />
          <HealthInsight
            title="Analyze Trends"
            description="View charts of your cycle trends over time."
            icon={BarChart2}
          />
          <HealthInsight
            title="Personalized Tips"
            description="Receive tips tailored to your cycle phase."
            icon={Lightbulb}
          />
        </section>

        <footer className="mt-16 bg-white/90 backdrop-blur-sm border-t border-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p>&copy; 2024 Bloom Period Tracker. Empowering women's health.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BloomPeriodTracker;
