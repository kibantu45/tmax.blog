
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar, 
  Heart, 
  Droplets, 
  Moon, 
  Star, 
  TrendingUp, 
  Crown, 
  Lock, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Baby,
  Activity,
  BookOpen,
  BarChart3,
  Settings,
  User
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const BloomPeriodTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isPremium, setIsPremium] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isPregnancyMode, setIsPregnancyMode] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    cycleLength: 28,
    periodLength: 5,
    lastPeriodDate: null as Date | null
  });
  const [symptoms, setSymptoms] = useState<any>({});
  const [periodDates, setPeriodDates] = useState<Date[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const symptomOptions = [
    { id: 'cramps', name: 'Cramps', icon: '🤕' },
    { id: 'mood', name: 'Mood Changes', icon: '😊' },
    { id: 'headache', name: 'Headache', icon: '🤯' },
    { id: 'bloating', name: 'Bloating', icon: '🎈' },
    { id: 'tender_breasts', name: 'Tender Breasts', icon: '💔' },
    { id: 'fatigue', name: 'Fatigue', icon: '😴' },
    { id: 'acne', name: 'Acne', icon: '🔴' },
    { id: 'cravings', name: 'Food Cravings', icon: '🍫' },
    { id: 'sleep_quality', name: 'Sleep Quality', icon: '🌙' },
    { id: 'energy_level', name: 'Energy Level', icon: '⚡' }
  ];

  const premiumFeatures = [
    'Advanced Cycle Analytics',
    'Pregnancy Mode & Tracking',
    'Fertility Predictions',
    'Symptom Pattern Analysis',
    'Health Insights & Recommendations',
    'Educational Content Library',
    'Export Health Reports',
    'Personal Health Coach',
    'Irregular Cycle Detection',
    'Ovulation Predictions'
  ];

  const getCurrentPhase = () => {
    if (isPregnancyMode) {
      return { phase: 'Pregnancy', color: 'bg-pink-500', icon: Baby };
    }
    
    const day = new Date().getDate();
    if (day <= 5) return { phase: 'Menstrual', color: 'bg-red-500', icon: Droplets };
    if (day <= 13) return { phase: 'Follicular', color: 'bg-green-500', icon: Star };
    if (day <= 15) return { phase: 'Ovulation', color: 'bg-pink-500', icon: Heart };
    return { phase: 'Luteal', color: 'bg-purple-500', icon: Moon };
  };

  const predictNextPeriod = () => {
    if (!userData.lastPeriodDate) return null;
    const nextPeriod = new Date(userData.lastPeriodDate);
    nextPeriod.setDate(nextPeriod.getDate() + userData.cycleLength);
    return nextPeriod;
  };

  const predictOvulation = () => {
    if (!userData.lastPeriodDate) return null;
    const ovulation = new Date(userData.lastPeriodDate);
    ovulation.setDate(ovulation.getDate() + Math.floor(userData.cycleLength / 2));
    return ovulation;
  };

  const logSymptom = (symptomId: string, intensity: number) => {
    const today = new Date().toDateString();
    setSymptoms(prev => ({
      ...prev,
      [today]: {
        ...prev[today],
        [symptomId]: intensity
      }
    }));
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
      const isPeriodDay = periodDates.some(d => d.toDateString() === date.toDateString());
      const nextPeriod = predictNextPeriod();
      const ovulation = predictOvulation();
      const isNextPeriod = nextPeriod && date.toDateString() === nextPeriod.toDateString();
      const isOvulationDay = ovulation && date.toDateString() === ovulation.toDateString();
      
      days.push(
        <div
          key={day}
          className={`h-12 w-12 flex items-center justify-center rounded-full cursor-pointer transition-all hover:bg-gray-100 relative ${
            isToday ? 'bg-pink-500 text-white' : ''
          } ${isPeriodDay ? 'bg-red-100 border-2 border-red-300' : ''} ${
            isOvulationDay ? 'bg-pink-100 border-2 border-pink-300' : ''
          } ${isNextPeriod ? 'bg-purple-100 border-2 border-purple-300' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <span className="text-sm font-medium">{day}</span>
          {isPeriodDay && <div className="absolute w-2 h-2 bg-red-500 rounded-full mt-6"></div>}
          {isOvulationDay && <div className="absolute w-2 h-2 bg-pink-500 rounded-full mt-6"></div>}
          {isNextPeriod && <div className="absolute w-2 h-2 bg-purple-500 rounded-full mt-6"></div>}
        </div>
      );
    }

    return days;
  };

  const currentPhase = getCurrentPhase();
  const PhaseIcon = currentPhase.icon;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-red-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
              <Droplets className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to Bloom
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Full Name"
              value={userData.name}
              onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={userData.email}
              onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
            />
            <Input
              type="password"
              placeholder="Create Password"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cycle Length (days)</label>
                <Input
                  type="number"
                  value={userData.cycleLength}
                  onChange={(e) => setUserData(prev => ({ ...prev, cycleLength: parseInt(e.target.value) }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Period Length (days)</label>
                <Input
                  type="number"
                  value={userData.periodLength}
                  onChange={(e) => setUserData(prev => ({ ...prev, periodLength: parseInt(e.target.value) }))}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Period Start Date</label>
              <Input
                type="date"
                onChange={(e) => setUserData(prev => ({ ...prev, lastPeriodDate: new Date(e.target.value) }))}
              />
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500"
              onClick={() => setIsAuthenticated(true)}
            >
              Create Account & Start Tracking
            </Button>
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => setIsAuthenticated(true)}
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 border border-pink-200 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="fertility">Fertility</TabsTrigger>
            <TabsTrigger value="pregnancy">Pregnancy</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <Card className="border-pink-200">
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
                    <div className="text-2xl font-bold text-gray-900">
                      {predictNextPeriod() ? `${Math.ceil((predictNextPeriod()!.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days` : 'Set up tracking'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-pink-500" />
                    Fertility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600">
                      {predictOvulation() ? `${Math.ceil((predictOvulation()!.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days` : 'N/A'}
                    </div>
                    <div className="text-gray-600">to ovulation</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-purple-500" />
                    Symptoms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.keys(symptoms[new Date().toDateString()] || {}).slice(0, 3).map(symptom => (
                      <div key={symptom} className="flex justify-between">
                        <span className="text-sm">{symptom}</span>
                        <Badge variant="outline">{symptoms[new Date().toDateString()][symptom]}/5</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                    Cycle Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">Normal</div>
                    <div className="text-gray-600">28-day cycle</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Calendar */}
          <TabsContent value="calendar">
            <Card className="border-pink-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setMonth(newDate.getMonth() - 1);
                      setCurrentDate(newDate);
                    }}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setMonth(newDate.getMonth() + 1);
                      setCurrentDate(newDate);
                    }}>
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Symptoms */}
          <TabsContent value="symptoms" className="space-y-6">
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle>Log Today's Symptoms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {symptomOptions.map(symptom => (
                    <div key={symptom.id} className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">{symptom.icon}</span>
                        <span className="font-medium">{symptom.name}</span>
                      </div>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map(level => (
                          <Button
                            key={level}
                            size="sm"
                            variant={symptoms[new Date().toDateString()]?.[symptom.id] === level ? "default" : "outline"}
                            onClick={() => logSymptom(symptom.id, level)}
                            className="w-8 h-8 p-0"
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {isPremium && (
              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Symptom Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-600">Interactive symptom chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Fertility */}
          <TabsContent value="fertility" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-pink-500" />
                    Ovulation Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-pink-50 rounded-lg">
                    <div className="text-2xl font-bold text-pink-600 mb-2">
                      {predictOvulation() ? predictOvulation()!.toLocaleDateString() : 'Not calculated'}
                    </div>
                    <div className="text-gray-600">Next predicted ovulation</div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      Log Cervical Mucus
                    </Button>
                    <Button className="w-full" variant="outline">
                      Log Basal Body Temperature
                    </Button>
                    <Button className="w-full" variant="outline">
                      Log LH Test Result
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle>Fertile Window</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">High Fertility Days</h4>
                      <p className="text-sm text-green-700">
                        {predictOvulation() ? `${new Date(predictOvulation()!.getTime() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString()} - ${new Date(predictOvulation()!.getTime() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString()}` : 'Set up tracking'}
                      </p>
                    </div>
                    {isPremium && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Pregnancy Probability</h4>
                        <div className="text-2xl font-bold text-blue-600">23%</div>
                        <p className="text-sm text-blue-700">Based on your cycle data</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Pregnancy Mode */}
          <TabsContent value="pregnancy" className="space-y-6">
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Baby className="w-5 h-5 mr-2 text-pink-500" />
                    Pregnancy Mode
                  </div>
                  <Button
                    variant={isPregnancyMode ? "destructive" : "default"}
                    onClick={() => setIsPregnancyMode(!isPregnancyMode)}
                  >
                    {isPregnancyMode ? 'Exit Pregnancy Mode' : 'Enter Pregnancy Mode'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isPregnancyMode ? (
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-pink-50 rounded-lg">
                      <div className="text-3xl font-bold text-pink-600 mb-2">Week 12</div>
                      <div className="text-gray-600 mb-4">Second Trimester</div>
                      <div className="text-lg">🤰 Your baby is the size of a lime!</div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Fetal Development</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li>• Baby's organs are fully formed</li>
                            <li>• Fingernails and toenails are developing</li>
                            <li>• Baby can make facial expressions</li>
                            <li>• Heart rate: 120-160 BPM</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Symptoms to Expect</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li>• Morning sickness may decrease</li>
                            <li>• Increased energy levels</li>
                            <li>• Possible heartburn</li>
                            <li>• Growing belly</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <Baby className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Pregnancy Tracking</h3>
                    <p className="text-gray-600 mb-4">
                      Switch to pregnancy mode to track your journey and get weekly updates about your baby's development.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Insights */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Cycle Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isPremium ? (
                    <div className="space-y-4">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-800">Cycle Regularity</h4>
                        <p className="text-sm text-green-700">Your cycles are consistently 28 days - excellent!</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800">Symptom Patterns</h4>
                        <p className="text-sm text-blue-700">PMS symptoms typically start 3 days before your period</p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <h4 className="font-semibold text-yellow-800">Recommendation</h4>
                        <p className="text-sm text-yellow-700">Consider tracking sleep quality for better insights</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                      <Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 text-sm">
                        Unlock detailed cycle analysis with Premium
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Educational Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <h4 className="font-semibold text-sm">Understanding Your Cycle</h4>
                      <p className="text-xs text-gray-600">Learn about the four phases of menstruation</p>
                    </div>
                    <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <h4 className="font-semibold text-sm">Nutrition During Your Period</h4>
                      <p className="text-xs text-gray-600">Foods that can help reduce PMS symptoms</p>
                    </div>
                    <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <h4 className="font-semibold text-sm">Exercise and Your Cycle</h4>
                      <p className="text-xs text-gray-600">Best workouts for each phase</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BloomPeriodTracker;
