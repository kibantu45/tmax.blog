import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Heart, Droplets, Moon, Star, TrendingUp, Crown, Bell, BellOff, ChevronLeft, ChevronRight, BookOpen, Sparkles, Shield } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const BloomPeriodTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notifications, setNotifications] = useState(true);
  const [cycleDay, setCycleDay] = useState(14);

  const hygieneProducts = [
    { name: "Organic Cotton Pads", brand: "Bloom Care", price: "KES 350", image: "🩱", rating: 4.8 },
    { name: "Menstrual Cup", brand: "EcoFlow", price: "KES 2,500", image: "🥤", rating: 4.9 },
    { name: "Period Underwear", brand: "ComfortPeriod", price: "KES 1,200", image: "🩲", rating: 4.7 },
    { name: "Tampons Super", brand: "Bloom Care", price: "KES 450", image: "🔴", rating: 4.6 }
  ];

  const educationalContent = [
    {
      title: "Understanding Your Menstrual Cycle",
      type: "Article",
      duration: "5 min read",
      phase: "general",
      content: "Learn about the four phases of your cycle and what happens in your body.",
      icon: "📚",
      link: "/education/menstrual-cycle"
    },
    {
      title: "Nutrition During Your Period",
      type: "Video",
      duration: "8 min",
      phase: "menstrual",
      content: "Best foods to eat during menstruation to reduce cramps and boost energy.",
      icon: "🥗",
      link: "/education/nutrition-during-period"
    },
    {
      title: "Fertility and Ovulation Explained",
      type: "Article",
      duration: "7 min read",
      phase: "ovulation",
      content: "Understanding ovulation signs and your fertile window.",
      icon: "🌸",
      link: "/education/fertility-and-ovulation"
    },
    {
      title: "Managing PMS Symptoms",
      type: "Guide",
      duration: "10 min read",
      phase: "luteal",
      content: "Natural ways to manage mood swings, bloating, and other PMS symptoms.",
      icon: "💆‍♀️",
      link: "/education/managing-pms"
    },
    {
      title: "Exercise During Your Cycle",
      type: "Video",
      duration: "12 min",
      phase: "general",
      content: "How to adapt your workout routine to your menstrual cycle phases.",
      icon: "🏃‍♀️",
      link: "/education/exercise-during-cycle"
    }
  ];

  const healthTips = [
    "Stay hydrated! Drink at least 8 glasses of water daily during your period.",
    "Iron-rich foods like spinach and lentils help combat period fatigue.",
    "Gentle yoga can help reduce menstrual cramps and improve mood.",
    "Track your symptoms to better understand your unique cycle patterns."
  ];

  const getCurrentPhase = () => {
    if (cycleDay <= 5) return { phase: 'Menstrual', color: 'bg-red-500', icon: Droplets, description: 'Your period days' };
    if (cycleDay <= 13) return { phase: 'Follicular', color: 'bg-green-500', icon: Star, description: 'Energy building phase' };
    if (cycleDay <= 15) return { phase: 'Ovulation', color: 'bg-pink-500', icon: Heart, description: 'Most fertile days' };
    return { phase: 'Luteal', color: 'bg-purple-500', icon: Moon, description: 'Pre-menstrual phase' };
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isPeriodDay = day <= 5 || (day >= 28 && day <= 31);
      const isOvulationDay = day >= 13 && day <= 15;
      
      days.push(
        <div
          key={day}
          className={`h-12 w-12 flex items-center justify-center rounded-full cursor-pointer transition-all hover:bg-gray-100 relative ${
            isToday ? 'bg-pink-500 text-white' : ''
          } ${isPeriodDay ? 'bg-red-100 border-2 border-red-300' : ''} ${
            isOvulationDay ? 'bg-pink-100 border-2 border-pink-300' : ''
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <span className="text-sm font-medium">{day}</span>
          {isPeriodDay && <div className="absolute w-2 h-2 bg-red-500 rounded-full bottom-1"></div>}
          {isOvulationDay && <div className="absolute w-2 h-2 bg-pink-500 rounded-full bottom-1"></div>}
        </div>
      );
    }

    return days;
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const currentPhase = getCurrentPhase();
  const PhaseIcon = currentPhase.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-red-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-pink-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Bloom
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNotifications(!notifications)}
                className={notifications ? "text-pink-600" : "text-gray-400"}
              >
                {notifications ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" onClick={() => window.location.href = "/"}>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="tracker" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 border border-pink-200 mb-6">
            <TabsTrigger value="tracker">Tracker</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="hygiene">Hygiene</TabsTrigger>
            <TabsTrigger value="education">Learn</TabsTrigger>
            <TabsTrigger value="pregnancy">Pregnancy</TabsTrigger>
          </TabsList>

          {/* Tracker Tab */}
          <TabsContent value="tracker">
            {/* Current Cycle Status */}
            <Card className="mb-8 border-pink-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 ${currentPhase.color} rounded-full flex items-center justify-center`}>
                      <PhaseIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{currentPhase.phase} Phase</h2>
                      <p className="text-gray-600">Day {cycleDay} of your cycle</p>
                      <p className="text-sm text-gray-500">{currentPhase.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-pink-600">Next Period</div>
                    <div className="text-2xl font-bold text-gray-900">in {28 - cycleDay} days</div>
                    <Progress value={(cycleDay / 28) * 100} className="w-32 mt-2" />
                  </div>
                </div>
                
                {/* Daily Tip */}
                <div className="bg-pink-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-5 h-5 text-pink-600" />
                    <span className="font-semibold text-pink-800">Today's Tip</span>
                  </div>
                  <p className="text-pink-700 text-sm">{healthTips[cycleDay % healthTips.length]}</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <div className="lg:col-span-2">
                <Card className="border-pink-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="h-12 flex items-center justify-center font-semibold text-gray-600">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {renderCalendar()}
                    </div>
                    <div className="flex items-center justify-center space-x-6 mt-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-300 rounded-full"></div>
                        <span className="text-sm text-gray-600">Period Days</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-pink-300 rounded-full"></div>
                        <span className="text-sm text-gray-600">Ovulation</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Today's Log */}
                <Card className="border-pink-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900">Today's Log</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Flow Intensity
                      </label>
                      <div className="flex space-x-2">
                        {['Light', 'Medium', 'Heavy'].map(intensity => (
                          <Button
                            key={intensity}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            {intensity}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mood & Symptoms
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {['😊 Happy', '😢 Sad', '🤕 Cramps', '😴 Tired', '🍫 Cravings', '🤯 Headache'].map((symptom, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            {symptom}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="border-pink-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900">Cycle Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Cycle</span>
                      <span className="font-semibold">28 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Period</span>
                      <span className="font-semibold">Nov 15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Period Length</span>
                      <span className="font-semibold">5 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Ovulation</span>
                      <span className="font-semibold">Dec 1</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Hygiene Tab */}
          <TabsContent value="hygiene">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Period Hygiene Products</h2>
                <p className="text-gray-600">Discover eco-friendly and comfortable period care products</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {hygieneProducts.map((product, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 border-pink-200">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">{product.image}</div>
                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                      <div className="flex items-center justify-center space-x-1 mb-3">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <div className="text-lg font-bold text-pink-600 mb-4">{product.price}</div>
                      <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-pink-200 bg-pink-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-6 h-6 text-pink-600" />
                    <h3 className="text-xl font-bold text-pink-800">Hygiene Tips</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-pink-800">During Your Period:</h4>
                      <ul className="text-sm text-pink-700 space-y-1">
                        <li>• Change pads/tampons every 4-6 hours</li>
                        <li>• Wash hands before and after changing</li>
                        <li>• Use unscented products to avoid irritation</li>
                        <li>• Shower regularly with warm water</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-pink-800">General Care:</h4>
                      <ul className="text-sm text-pink-700 space-y-1">
                        <li>• Wear breathable cotton underwear</li>
                        <li>• Clean from front to back</li>
                        <li>• Stay hydrated and eat well</li>
                        <li>• Get enough sleep and exercise</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn About Your Body</h2>
                <p className="text-gray-600">Educational content to help you understand your menstrual health</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {educationalContent.map((content, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 border-pink-200">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="text-2xl">{content.icon}</div>
                        <div>
                          <Badge variant="outline" className="text-xs">
                            {content.type}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{content.duration}</p>
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{content.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{content.content}</p>
                      <Button 
                        className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                        onClick={() => window.location.href = content.link}
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Featured: Understanding Your Cycle</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Droplets className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <h4 className="font-semibold text-red-700">Menstrual</h4>
                      <p className="text-xs text-gray-600">Days 1-5</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Star className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <h4 className="font-semibold text-green-700">Follicular</h4>
                      <p className="text-xs text-gray-600">Days 1-13</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Heart className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                      <h4 className="font-semibold text-pink-700">Ovulation</h4>
                      <p className="text-xs text-gray-600">Days 14-15</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Moon className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <h4 className="font-semibold text-purple-700">Luteal</h4>
                      <p className="text-xs text-gray-600">Days 16-28</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights">
            <div className="space-y-6">
              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Health Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-pink-50 rounded-lg">
                      <h4 className="font-semibold text-pink-800 mb-2">Cycle Analysis</h4>
                      <p className="text-sm text-pink-700">
                        Your cycle is consistent at 28 days. Your periods typically last 5 days with moderate flow.
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Symptom Patterns</h4>
                      <p className="text-sm text-blue-700">
                        You commonly experience mild cramps on day 1-2 and mood changes 3 days before your period.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Fertility Window</h4>
                      <p className="text-sm text-green-700">
                        Your most fertile days are typically around day 12-16 of your cycle. Track cervical mucus for better accuracy.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Pregnancy Tab */}
          <TabsContent value="pregnancy">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Pregnancy & Fertility</h2>
                <p className="text-gray-600">Track your fertility and pregnancy journey</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-pink-200">
                  <CardHeader>
                    <CardTitle>Fertility Tracking</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-pink-50 rounded-lg">
                      <h4 className="font-semibold text-pink-800 mb-2">Current Fertile Window</h4>
                      <p className="text-sm text-pink-700">December 12-16, 2024</p>
                      <Progress value={60} className="mt-2" />
                    </div>
                    <Button className="w-full bg-pink-600 hover:bg-pink-700">
                      Log Ovulation Signs
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-pink-200">
                  <CardHeader>
                    <CardTitle>Pregnancy Mode</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Are you trying to conceive?</h4>
                      <p className="text-sm text-purple-700">Enable pregnancy mode for specialized tracking</p>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Enable Pregnancy Mode
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Notification System */}
      {notifications && (
        <div className="fixed bottom-4 right-4 bg-white border border-pink-200 rounded-lg shadow-lg p-4 max-w-sm">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-pink-600" />
            <div>
              <p className="font-semibold text-sm">Period Reminder</p>
              <p className="text-xs text-gray-600">Your period is expected in 3 days</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setNotifications(false)}>
              ×
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloomPeriodTracker;
