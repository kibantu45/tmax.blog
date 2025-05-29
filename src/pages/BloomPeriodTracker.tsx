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
import { ArrowLeft, Calendar as CalendarIcon, Heart, Star, Clock, Droplets, Moon, Sun, TrendingUp, User, Lock } from "lucide-react";
import { format, addDays, differenceInDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subDays } from "date-fns";
import { cn } from "@/lib/utils";

const BloomPeriodTracker = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | null>(null);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [currentDay, setCurrentDay] = useState<number>(1);
  
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

  // Calendar day styling
  const getDayStyle = (date: Date) => {
    if (!lastPeriodDate) return "";
    
    const cycleData = calculateCycleData();
    if (!cycleData) return "";
    
    // Period days
    const periodDays = [];
    for (let i = 0; i < periodLength; i++) {
      periodDays.push(addDays(lastPeriodDate, i));
    }
    
    // Next period days
    const nextPeriodDays = [];
    for (let i = 0; i < periodLength; i++) {
      nextPeriodDays.push(addDays(cycleData.nextPeriodDate, i));
    }
    
    // Check if date is a period day
    if (periodDays.some(day => isSameDay(day, date)) || nextPeriodDays.some(day => isSameDay(day, date))) {
      return "bg-red-100 border-red-300 text-red-800";
    }
    
    // Check if date is ovulation day
    if (isSameDay(date, cycleData.ovulationDate)) {
      return "bg-pink-100 border-pink-300 text-pink-800";
    }
    
    // Check if date is in fertile window
    if (date >= cycleData.fertileStart && date <= cycleData.fertileEnd) {
      return "bg-green-100 border-green-300 text-green-800";
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
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
              <h1 className="text-2xl font-bold text-gray-800">Bloom Period Tracker</h1>
            </div>
            <Button
              onClick={() => setShowPremiumModal(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white"
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
          <Card className="mb-8 bg-gradient-to-r from-pink-50 to-purple-50">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">{cycleData.currentCycleDay}</div>
                  <div className="text-sm text-gray-600">Current Cycle Day</div>
                </div>
                <div className="text-center">
                  <div className={`text-xl font-semibold ${getPhaseColor(getCyclePhase())}`}>
                    {getCyclePhase()} Phase
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{getPhaseInsight()}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600">
                    {cycleData.daysUntilPeriod > 0 ? `${cycleData.daysUntilPeriod} days` : 'Today!'}
                  </div>
                  <div className="text-sm text-gray-600">Until Next Period</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Calendar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    Cycle Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border pointer-events-auto"
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
                      period: { backgroundColor: '#fecaca', color: '#991b1b' },
                      ovulation: { backgroundColor: '#fbcfe8', color: '#be185d' },
                      fertile: { backgroundColor: '#bbf7d0', color: '#065f46' }
                    }}
                  />
                  
                  {/* Legend */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-200 rounded"></div>
                      <span className="text-sm">Period Days</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-200 rounded"></div>
                      <span className="text-sm">Fertile Window</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-pink-200 rounded"></div>
                      <span className="text-sm">Ovulation Day</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Setup */}
              <Card>
                <CardHeader>
                  <CardTitle>Period Setup</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="lastPeriod">Last Period Start Date</Label>
                    <Input
                      type="date"
                      value={lastPeriodDate ? format(lastPeriodDate, 'yyyy-MM-dd') : ''}
                      onChange={(e) => setLastPeriodDate(new Date(e.target.value))}
                      className="mt-1"
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
                      className="mt-1"
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
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="currentDay">Current Day of Period (if on period)</Label>
                    <Input
                      type="number"
                      value={currentDay}
                      onChange={(e) => setCurrentDay(Number(e.target.value))}
                      min="1"
                      max="8"
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
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
