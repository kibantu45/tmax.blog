
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, Droplets, Moon, Star, TrendingUp, Crown, Lock, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PeriodTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isPremium, setIsPremium] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [cycleData, setCycleData] = useState<any>({});
  const [symptoms, setSymptoms] = useState<string[]>([]);

  const symptomOptions = [
    { id: 'cramps', name: 'Cramps', icon: '🤕' },
    { id: 'mood', name: 'Mood Changes', icon: '😊' },
    { id: 'headache', name: 'Headache', icon: '🤯' },
    { id: 'bloating', name: 'Bloating', icon: '🎈' },
    { id: 'tender_breasts', name: 'Tender Breasts', icon: '💔' },
    { id: 'fatigue', name: 'Fatigue', icon: '😴' },
    { id: 'acne', name: 'Acne', icon: '🔴' },
    { id: 'cravings', name: 'Food Cravings', icon: '🍫' }
  ];

  const premiumFeatures = [
    'Detailed Cycle Analysis',
    'Symptom Predictions',
    'Health Insights',
    'Ovulation Tracking',
    'Pregnancy Planning',
    'Export Health Reports',
    'Advanced Statistics',
    'Personal Health Coach'
  ];

  const getCurrentPhase = () => {
    const day = new Date().getDate();
    if (day <= 5) return { phase: 'Menstrual', color: 'bg-red-500', icon: Droplets };
    if (day <= 13) return { phase: 'Follicular', color: 'bg-green-500', icon: Star };
    if (day <= 15) return { phase: 'Ovulation', color: 'bg-pink-500', icon: Heart };
    return { phase: 'Luteal', color: 'bg-purple-500', icon: Moon };
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isPeriodDay = day <= 5 || (day >= 28 && day <= 31); // Mock period days
      const isOvulationDay = day >= 13 && day <= 15; // Mock ovulation days
      
      days.push(
        <div
          key={day}
          className={`h-12 w-12 flex items-center justify-center rounded-full cursor-pointer transition-all hover:bg-gray-100 ${
            isToday ? 'bg-tmaxGreen-500 text-white' : ''
          } ${isPeriodDay ? 'bg-red-100 border-2 border-red-300' : ''} ${
            isOvulationDay ? 'bg-pink-100 border-2 border-pink-300' : ''
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <span className="text-sm font-medium">{day}</span>
          {isPeriodDay && <div className="absolute w-2 h-2 bg-red-500 rounded-full mt-6"></div>}
          {isOvulationDay && <div className="absolute w-2 h-2 bg-pink-500 rounded-full mt-6"></div>}
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
                FloTracker
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {isPremium ? (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  <Crown className="w-4 h-4 mr-1" />
                  Premium
                </Badge>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to Premium
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-center">Upgrade to Premium</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-pink-600">KES 100</div>
                        <div className="text-gray-600">per year</div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Premium Features:</h4>
                        {premiumFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500"
                        onClick={() => setIsPremium(true)}
                      >
                        Subscribe Now
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              <Button variant="ghost" onClick={() => window.location.href = "/"}>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Cycle Status */}
        <Card className="mb-8 border-pink-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 ${currentPhase.color} rounded-full flex items-center justify-center`}>
                  <PhaseIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentPhase.phase} Phase</h2>
                  <p className="text-gray-600">Day 3 of your cycle</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-pink-600">Next Period</div>
                <div className="text-2xl font-bold text-gray-900">in 25 days</div>
              </div>
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
                    Symptoms
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {symptomOptions.slice(0, 4).map(symptom => (
                      <Button
                        key={symptom.id}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        {symptom.icon} {symptom.name}
                      </Button>
                    ))}
                  </div>
                  {!isPremium && (
                    <div className="mt-2 p-2 bg-gray-100 rounded-lg flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-600">More symptoms in Premium</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Insights */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Insights
                  {!isPremium && <Lock className="w-4 h-4 ml-2 text-gray-400" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isPremium ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-pink-50 rounded-lg">
                      <p className="text-sm font-medium text-pink-800">
                        Your cycle is 2 days longer than average
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">
                        PMS symptoms usually start 3 days before period
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-800">
                        Your fertility window is optimal next week
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm">
                      Unlock detailed insights with Premium
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Quick Stats</CardTitle>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodTracker;
