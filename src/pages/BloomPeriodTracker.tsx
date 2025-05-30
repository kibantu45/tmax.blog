import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Calendar as CalendarIcon, Heart, Star, Clock, Droplets, Moon, Sun, TrendingUp, User, Lock, Bell, BellOff } from "lucide-react";
import { format, addDays, differenceInDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subDays } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const BloomPeriodTracker = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | null>(null);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [notifications, setNotifications] = useState({
    periodReminder: true,
    ovulationAlert: true,
    fertileWindow: true,
    symptomReminder: false
  });
  const { toast } = useToast();
  
  // Cycle calculation
  const calculateCycleData = () => {
    if (!lastPeriodDate) return null;
    
    const today = new Date();
    const daysSinceLastPeriod = differenceInDays(today, lastPeriodDate);
    const currentCycleDay = (daysSinceLastPeriod % cycleLength) + 1;
    
    const nextPeriodDate = addDays(lastPeriodDate, cycleLength);
    const ovulationDate = addDays(lastPeriodDate, Math.floor(cycleLength / 2));
    const fertileStart = subDays(ovulationDate, 5);
    const fertileEnd = addDays(ovulationDate, 1);
    
    return {
      currentCycleDay,
      nextPeriodDate,
      ovulationDate,
      fertileStart,
      fertileEnd,
      daysUntilPeriod: differenceInDays(nextPeriodDate, today),
      daysUntilOvulation: differenceInDays(ovulationDate, today)
    };
  };

  const cycleData = calculateCycleData();

  // Notification system
  useEffect(() => {
    if (!cycleData || !notifications.periodReminder) return;
    
    const checkNotifications = () => {
      const today = new Date();
      
      // Period reminder (3 days before)
      if (notifications.periodReminder && cycleData.daysUntilPeriod === 3) {
        toast({
          title: "Period Reminder",
          description: "Your period is expected in 3 days. Time to prepare!",
          duration: 5000,
        });
      }
      
      // Ovulation alert
      if (notifications.ovulationAlert && cycleData.daysUntilOvulation === 1) {
        toast({
          title: "Ovulation Alert",
          description: "You're likely to ovulate tomorrow!",
          duration: 5000,
        });
      }
      
      // Fertile window
      if (notifications.fertileWindow && cycleData.daysUntilOvulation === 5) {
        toast({
          title: "Fertile Window",
          description: "Your fertile window begins today!",
          duration: 5000,
        });
      }
    };
    
    checkNotifications();
  }, [cycleData, notifications, toast]);

  // Calendar day styling with enhanced visualization
  const getDayStyle = (date: Date) => {
    if (!lastPeriodDate) return "";
    
    const cycleData = calculateCycleData();
    if (!cycleData) return "";
    
    // Period days (current and next cycle)
    const periodDays = [];
    for (let i = 0; i < periodLength; i++) {
      periodDays.push(addDays(lastPeriodDate, i));
      periodDays.push(addDays(cycleData.nextPeriodDate, i));
    }
    
    // Check if date is a period day
    if (periodDays.some(day => isSameDay(day, date))) {
      return "bg-red-100 border-red-300 text-red-800 font-semibold";
    }
    
    // Check if date is ovulation day
    if (isSameDay(date, cycleData.ovulationDate)) {
      return "bg-pink-100 border-pink-300 text-pink-800 font-semibold ring-2 ring-pink-300";
    }
    
    // Check if date is in fertile window
    if (date >= cycleData.fertileStart && date <= cycleData.fertileEnd) {
      return "bg-green-100 border-green-300 text-green-800 font-medium";
    }
    
    return "";
  };

  const getCyclePhase = () => {
    if (!cycleData) return "Unknown";
    
    const { currentCycleDay } = cycleData;
    
    if (currentCycleDay <= periodLength) return "Menstrual";
    if (currentCycleDay <= Math.floor(cycleLength / 2) - 2) return "Follicular";
    if (currentCycleDay <= Math.floor(cycleLength / 2) + 1) return "Ovulation";
    return "Luteal";
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "Menstrual": return "text-red-600";
      case "Follicular": return "text-blue-600";
      case "Ovulation": return "text-pink-600";
      case "Luteal": return "text-purple-600";
      default: return "text-gray-600";
    }
  };

  const getPhaseInsight = () => {
    const phase = getCyclePhase();
    switch (phase) {
      case "Menstrual":
        return "Rest and restore. Focus on gentle activities and self-care.";
      case "Follicular":
        return "Energy rising! Great time for new projects and planning.";
      case "Ovulation":
        return "Peak fertility and energy. Perfect for social activities.";
      case "Luteal":
        return "Prepare for your period. Focus on comfort foods and relaxation.";
      default:
        return "Track your period to get personalized insights.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-2xl font-bold text-green-800">Bloom Period Tracker</h1>
            </div>
            <Button
              onClick={() => setShowPremiumModal(true)}
              className="bg-gradient-to-r from-green-500 to-yellow-500 text-white"
            >
              <Star className="w-4 h-4 mr-2" />
              Go Premium
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Status */}
        {cycleData && (
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-yellow-50 border-green-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{cycleData.currentCycleDay}</div>
                  <div className="text-sm text-green-700">Current Cycle Day</div>
                </div>
                <div className="text-center">
                  <div className={`text-xl font-semibold ${getPhaseColor(getCyclePhase())}`}>
                    {getCyclePhase()} Phase
                  </div>
                  <div className="text-sm text-green-700 mt-1">{getPhaseInsight()}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">
                    {cycleData.daysUntilPeriod > 0 ? `${cycleData.daysUntilPeriod} days` : 'Today!'}
                  </div>
                  <div className="text-sm text-green-700">Until Next Period</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-green-100">
            <TabsTrigger value="calendar" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Calendar</TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Notifications</TabsTrigger>
            <TabsTrigger value="symptoms" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Symptoms</TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Insights</TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enhanced Calendar */}
              <Card className="border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="flex items-center text-green-800">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    Interactive Cycle Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border border-green-200 pointer-events-auto"
                    modifiers={{
                      period: (date) => {
                        if (!lastPeriodDate) return false;
                        const periodDays = [];
                        for (let i = 0; i < periodLength; i++) {
                          periodDays.push(addDays(lastPeriodDate, i));
                        }
                        if (cycleData) {
                          for (let i = 0; i < periodLength; i++) {
                            periodDays.push(addDays(cycleData.nextPeriodDate, i));
                          }
                        }
                        return periodDays.some(day => isSameDay(day, date));
                      },
                      ovulation: (date) => {
                        return cycleData ? isSameDay(date, cycleData.ovulationDate) : false;
                      },
                      fertile: (date) => {
                        if (!cycleData) return false;
                        return date >= cycleData.fertileStart && date <= cycleData.fertileEnd;
                      }
                    }}
                    modifiersStyles={{
                      period: { 
                        backgroundColor: '#fecaca', 
                        color: '#991b1b',
                        fontWeight: 'bold',
                        border: '2px solid #f87171'
                      },
                      ovulation: { 
                        backgroundColor: '#fbcfe8', 
                        color: '#be185d',
                        fontWeight: 'bold',
                        border: '2px solid #f472b6',
                        boxShadow: '0 0 0 2px #f472b6'
                      },
                      fertile: { 
                        backgroundColor: '#bbf7d0', 
                        color: '#065f46',
                        fontWeight: '500',
                        border: '2px solid #34d399'
                      }
                    }}
                  />
                  
                  {/* Enhanced Legend */}
                  <div className="mt-6 space-y-3">
                    <h4 className="font-semibold text-green-800 mb-3">Cycle Phase Legend</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-red-200 border-2 border-red-300 rounded font-bold flex items-center justify-center text-xs text-red-800">P</div>
                        <span className="text-sm font-medium">Period Days (Menstrual Phase)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-green-200 border-2 border-green-300 rounded font-medium flex items-center justify-center text-xs text-green-800">F</div>
                        <span className="text-sm font-medium">Fertile Window (High Fertility)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-pink-200 border-2 border-pink-300 rounded font-bold flex items-center justify-center text-xs text-pink-800 shadow-sm">O</div>
                        <span className="text-sm font-medium">Ovulation Day (Peak Fertility)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Period Setup */}
              <Card className="border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-green-800">Period Setup & Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div>
                    <Label htmlFor="lastPeriod">Last Period Start Date</Label>
                    <Input
                      type="date"
                      value={lastPeriodDate ? format(lastPeriodDate, 'yyyy-MM-dd') : ''}
                      onChange={(e) => setLastPeriodDate(new Date(e.target.value))}
                      className="mt-1 border-green-200 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cycleLength">Cycle Length (days)</Label>
                    <Input
                      type="number"
                      value={cycleLength}
                      onChange={(e) => setCycleLength(Number(e.target.value))}
                      min="21"
                      max="35"
                      className="mt-1 border-green-200 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="periodLength">Period Length (days)</Label>
                    <Input
                      type="number"
                      value={periodLength}
                      onChange={(e) => setPeriodLength(Number(e.target.value))}
                      min="3"
                      max="8"
                      className="mt-1 border-green-200 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="currentDay" className="text-green-700">Current Day of Period (if on period)</Label>
                    <Input
                      type="number"
                      value={currentDay}
                      onChange={(e) => setCurrentDay(Number(e.target.value))}
                      min="1"
                      max="8"
                      className="mt-1 border-green-200 focus:border-green-500"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center text-green-800">
                  <Bell className="w-5 h-5 mr-2" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-green-800">Period Reminders</h4>
                      <p className="text-sm text-green-600">Get notified 3 days before your period</p>
                    </div>
                    <Switch
                      checked={notifications.periodReminder}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, periodReminder: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-green-800">Ovulation Alerts</h4>
                      <p className="text-sm text-green-600">Be notified about your ovulation day</p>
                    </div>
                    <Switch
                      checked={notifications.ovulationAlert}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, ovulationAlert: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-green-800">Fertile Window</h4>
                      <p className="text-sm text-green-600">Get alerted when your fertile window begins</p>
                    </div>
                    <Switch
                      checked={notifications.fertileWindow}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, fertileWindow: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-green-800">Symptom Reminders</h4>
                      <p className="text-sm text-green-600">Daily reminders to log symptoms</p>
                      <Badge className="mt-1 bg-yellow-100 text-yellow-800">
                        <Lock className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                    <Switch
                      checked={notifications.symptomReminder}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, symptomReminder: checked }))
                      }
                      disabled
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="symptoms">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Daily Symptoms
                  <Badge className="ml-2 bg-yellow-100 text-yellow-800">
                    <Lock className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Track detailed symptoms with premium access</p>
                  <Button onClick={() => setShowPremiumModal(true)} className="bg-gradient-to-r from-pink-500 to-purple-600">
                    Unlock Premium Features
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Cycle Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cycleData ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">Fertility Status</h3>
                      {cycleData.daysUntilOvulation <= 0 && cycleData.daysUntilOvulation >= -1 ? (
                        <Badge className="bg-pink-100 text-pink-800">High Fertility</Badge>
                      ) : cycleData.daysUntilOvulation > 0 && cycleData.daysUntilOvulation <= 5 ? (
                        <Badge className="bg-green-100 text-green-800">Fertile Window</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800">Low Fertility</Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Droplets className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                        <div className="font-semibold">Next Period</div>
                        <div className="text-sm text-gray-600">
                          {format(cycleData.nextPeriodDate, 'MMM dd, yyyy')}
                        </div>
                      </div>
                      
                      <div className="text-center p-4 bg-pink-50 rounded-lg">
                        <Sun className="w-8 h-8 mx-auto mb-2 text-pink-600" />
                        <div className="font-semibold">Ovulation</div>
                        <div className="text-sm text-gray-600">
                          {format(cycleData.ovulationDate, 'MMM dd, yyyy')}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-600">Set up your period data to see insights</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Moon className="w-8 h-8 text-purple-600 mr-3" />
                    <h3 className="text-lg font-semibold">Understanding Your Menstrual Cycle</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Learn about the four phases of your cycle and how hormones affect your body.
                  </p>
                  <Button variant="outline" onClick={() => window.location.href = '/education/menstrual-cycle'}>
                    Read More
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Heart className="w-8 h-8 text-red-600 mr-3" />
                    <h3 className="text-lg font-semibold">Nutrition During Your Period</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Discover foods that can help reduce cramps and boost your energy during menstruation.
                  </p>
                  <Button variant="outline" onClick={() => window.location.href = '/education/nutrition-during-period'}>
                    Read More
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Star className="w-8 h-8 text-yellow-600 mr-3" />
                    <h3 className="text-lg font-semibold">Fertility and Ovulation</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Understanding your fertile window and signs of ovulation for family planning.
                  </p>
                  <Button variant="outline" onClick={() => window.location.href = '/education/fertility-and-ovulation'}>
                    Read More
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                    <h3 className="text-lg font-semibold">Managing PMS Symptoms</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Natural ways to manage mood swings, bloating, and other PMS symptoms.
                  </p>
                  <Button variant="outline" onClick={() => window.location.href = '/education/managing-pms'}>
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Premium Modal */}
        <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-yellow-500 mr-2" />
                  Bloom Premium
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">KES 100/year</div>
                <p className="text-gray-600">Unlock advanced period tracking features</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">Advanced cycle calculations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">Comprehensive symptom tracking</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">Pregnancy mode with fetal development</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">Personalized insights and tips</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">Export cycle data</span>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600">
                Subscribe to Premium
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                Cancel anytime. 7-day free trial included.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BloomPeriodTracker;
