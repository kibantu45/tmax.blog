import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Heart, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  Baby, 
  Crown, 
  LogIn,
  AlertCircle,
  Target,
  Clock,
  Bell
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BloomPeriodTracker = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [periodStartDate, setPeriodStartDate] = useState<Date | undefined>(new Date());
  const [currentDay, setCurrentDay] = useState(1);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [pregnancyMode, setPregnancyMode] = useState(false);
  const [pregnancyWeek, setPregnancyWeek] = useState(1);
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  // Calculate cycle predictions
  const calculatePredictions = () => {
    if (!periodStartDate) return null;
    
    const ovulationDay = Math.floor(cycleLength / 2);
    const fertileStart = ovulationDay - 5;
    const fertileEnd = ovulationDay + 1;
    const nextPeriod = new Date(periodStartDate);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);
    
    return {
      ovulationDay,
      fertileStart,
      fertileEnd,
      nextPeriod,
      daysUntilOvulation: Math.max(0, ovulationDay - currentDay),
      daysUntilPeriod: Math.max(0, cycleLength - currentDay),
      isInFertileWindow: currentDay >= fertileStart && currentDay <= fertileEnd,
      currentPhase: currentDay <= periodLength ? "Menstruation" : 
                   currentDay <= fertileStart ? "Follicular" :
                   currentDay <= fertileEnd ? "Ovulation" : "Luteal"
    };
  };

  const predictions = calculatePredictions();

  const handleLoginRedirect = () => {
    window.location.href = "/login";
  };

  const handleDayUpdate = (day: number) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    setCurrentDay(day);
    // Generate notifications based on the day
    if (predictions) {
      if (predictions.daysUntilOvulation === 2) {
        toast({
          title: "Fertility Alert",
          description: "Your fertile window is approaching in 2 days!",
        });
      } else if (predictions.daysUntilPeriod === 3) {
        toast({
          title: "Period Reminder",
          description: "Your next period is expected in 3 days.",
        });
      }
    }
  };

  const premiumFeatures = [
    "Advanced cycle predictions with AI",
    "Detailed fertility analysis",
    "Pregnancy planning tools",
    "Export cycle data",
    "Personalized health insights",
    "Premium symptom tracking",
    "Doctor consultation booking"
  ];

  const pregnancyStages = [
    { week: 1, title: "Conception", description: "Fertilization occurs" },
    { week: 4, title: "Implantation", description: "Embryo attaches to uterine wall" },
    { week: 8, title: "Fetal Development", description: "Major organs begin forming" },
    { week: 12, title: "First Trimester End", description: "Risk of miscarriage decreases" },
    { week: 20, title: "Anatomy Scan", description: "Detailed ultrasound examination" },
    { week: 28, title: "Third Trimester", description: "Rapid fetal growth period" },
    { week: 36, title: "Full Term Approaching", description: "Baby considered full-term soon" },
    { week: 40, title: "Due Date", description: "Expected delivery time" }
  ];

  // Mock login check
  useEffect(() => {
    // Check if user is logged in (this would typically check localStorage, cookies, or auth state)
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'true');
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Bloom Period Tracker</CardTitle>
            <p className="text-gray-600">Please log in to access your period tracking data</p>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={handleLoginRedirect}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login to Continue
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Your health data is private and secure
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-pink-500" />
                Bloom Period Tracker
              </h1>
            </div>
            <Button 
              onClick={() => setShowPremiumDialog(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500"
            >
              <Crown className="w-4 h-4 mr-2" />
              Go Premium
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Day Input */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Current Cycle Day
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Label htmlFor="currentDay">Enter your current cycle day</Label>
                <Input
                  id="currentDay"
                  type="number"
                  min="1"
                  max="50"
                  value={currentDay}
                  onChange={(e) => handleDayUpdate(parseInt(e.target.value) || 1)}
                  className="w-20"
                />
              </div>
              <div className="text-sm text-gray-600">
                <p>Day {currentDay} of your cycle</p>
                {predictions && (
                  <p className="font-medium text-pink-600">{predictions.currentPhase} Phase</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fertility Status */}
        {predictions && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Next Ovulation</h3>
                  <p className="text-2xl font-bold text-green-600">{predictions.daysUntilOvulation} days</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <CalendarIcon className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Next Period</h3>
                  <p className="text-2xl font-bold text-red-600">{predictions.daysUntilPeriod} days</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Bell className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Fertile Window</h3>
                  <Badge 
                    className={predictions.isInFertileWindow ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                  >
                    {predictions.isInFertileWindow ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="cycle" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="cycle">Cycle Tracking</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="pregnancy">Pregnancy</TabsTrigger>
          </TabsList>

          <TabsContent value="cycle" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Cycle Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="periodStartDate">Last Period Start Date</Label>
                    <div className="mt-2">
                      <Calendar
                        mode="single"
                        selected={periodStartDate}
                        onSelect={setPeriodStartDate}
                        className="border rounded-md"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cycleLength">Average Cycle Length (days)</Label>
                      <Input
                        id="cycleLength"
                        type="number"
                        min="21"
                        max="45"
                        value={cycleLength}
                        onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="periodLength">Average Period Length (days)</Label>
                      <Input
                        id="periodLength"
                        type="number"
                        min="1"
                        max="10"
                        value={periodLength}
                        onChange={(e) => setPeriodLength(parseInt(e.target.value) || 5)}
                      />
                    </div>
                    <Button className="w-full mt-4">Save Cycle Information</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Cycle Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {predictions ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-pink-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-pink-800 mb-2">Current Phase</h3>
                        <p className="text-lg font-medium text-pink-600">{predictions.currentPhase}</p>
                        <p className="text-sm text-gray-600 mt-1">Day {currentDay} of your cycle</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-purple-800 mb-2">Next Period</h3>
                        <p className="text-lg font-medium text-purple-600">
                          {predictions.nextPeriod.toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">In {predictions.daysUntilPeriod} days</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">Fertility Window</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Starts on day {predictions.fertileStart}</p>
                          <p className="text-sm text-gray-600">Ends on day {predictions.fertileEnd}</p>
                        </div>
                        <Badge className={predictions.isInFertileWindow ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                          {predictions.isInFertileWindow ? "Currently Fertile" : "Not in Fertile Window"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">Please enter your cycle information to see predictions.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="symptoms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Track Your Symptoms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Common Symptoms</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {["Cramps", "Headache", "Bloating", "Fatigue", "Acne", "Mood Swings", 
                        "Breast Tenderness", "Backache", "Nausea", "Cravings", "Insomnia", "Spotting"].map((symptom) => (
                        <Button
                          key={symptom}
                          variant={symptoms.includes(symptom) ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => {
                            if (symptoms.includes(symptom)) {
                              setSymptoms(symptoms.filter(s => s !== symptom));
                            } else {
                              setSymptoms([...symptoms, symptom]);
                            }
                          }}
                        >
                          {symptom}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="mood">Mood</Label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {["Happy", "Sad", "Anxious", "Irritable", "Calm", "Energetic", "Tired", "Emotional"].map((moodOption) => (
                        <Button
                          key={moodOption}
                          variant={mood === moodOption ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setMood(moodOption)}
                        >
                          {moodOption}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any additional notes about how you're feeling today..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <Button className="w-full">Save Today's Entry</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg p-4">
                  <Calendar
                    mode="single"
                    selected={new Date()}
                    className="border-0"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Period Days</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Fertile Window</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm">Ovulation Day</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">Logged Symptoms</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cycle Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Your Cycle Summary</h3>
                    <p className="text-gray-700">
                      Based on your data, your average cycle length is {cycleLength} days with periods lasting around {periodLength} days.
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">Health Tips</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Stay hydrated to help reduce bloating</li>
                      <li>Regular exercise can help alleviate cramps</li>
                      <li>Consider taking iron supplements during your period</li>
                      <li>Heat therapy can help with menstrual pain</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button className="w-full" variant="outline">
                      View Educational Resources
                    </Button>
                    <Button className="w-full" variant="outline">
                      Export Cycle Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Educational Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="/education/menstrual-cycle" className="block">
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-800">Understanding Your Menstrual Cycle</h3>
                        <p className="text-sm text-gray-600 mt-1">Learn about the four phases of your cycle</p>
                      </CardContent>
                    </Card>
                  </a>
                  <a href="/education/nutrition-during-period" className="block">
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-800">Nutrition During Your Period</h3>
                        <p className="text-sm text-gray-600 mt-1">Foods that help with period symptoms</p>
                      </CardContent>
                    </Card>
                  </a>
                  <a href="/education/fertility-and-ovulation" className="block">
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-800">Fertility and Ovulation</h3>
                        <p className="text-sm text-gray-600 mt-1">Understanding your fertile window</p>
                      </CardContent>
                    </Card>
                  </a>
                  <a href="/education/managing-pms" className="block">
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-800">Managing PMS</h3>
                        <p className="text-sm text-gray-600 mt-1">Tips for dealing with premenstrual symptoms</p>
                      </CardContent>
                    </Card>
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pregnancy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Baby className="w-5 h-5 mr-2" />
                  Pregnancy Mode
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!pregnancyMode ? (
                  <div className="text-center py-6">
                    <Baby className="w-12 h-12 mx-auto text-pink-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Pregnancy Tracking</h3>
                    <p className="text-gray-600 mb-6">
                      Switch to pregnancy mode to track your pregnancy journey week by week.
                    </p>
                    <Button 
                      onClick={() => setPregnancyMode(true)}
                      className="bg-pink-500 hover:bg-pink-600"
                    >
                      Enable Pregnancy Mode
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Week {pregnancyWeek}</h3>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setPregnancyWeek(Math.max(1, pregnancyWeek - 1))}
                          disabled={pregnancyWeek <= 1}
                        >
                          Previous
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setPregnancyWeek(Math.min(40, pregnancyWeek + 1))}
                          disabled={pregnancyWeek >= 40}
                        >
                          Next
                        </Button>
                      </div>
                    </div>

                    <div className="bg-pink-50 p-4 rounded-lg">
                      {pregnancyStages.find(stage => stage.week === pregnancyWeek) ? (
                        <div>
                          <h3 className="font-semibold text-pink-800 mb-2">
                            {pregnancyStages.find(stage => stage.week === pregnancyWeek)?.title}
                          </h3>
                          <p className="text-gray-700">
                            {pregnancyStages.find(stage => stage.week === pregnancyWeek)?.description}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-semibold text-pink-800 mb-2">Week {pregnancyWeek}</h3>
                          <p className="text-gray-700">
                            Your baby continues to grow and develop.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-10 gap-1">
                      {Array.from({ length: 40 }, (_, i) => i + 1).map((week) => (
                        <Button
                          key={week}
                          variant="outline"
                          size="sm"
                          className={`p-1 h-8 ${week === pregnancyWeek ? 'bg-pink-500 text-white' : ''}`}
                          onClick={() => setPregnancyWeek(week)}
                        >
                          {week}
                        </Button>
                      ))}
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setPregnancyMode(false)}
                    >
                      Exit Pregnancy Mode
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Login Prompt Dialog */}
      {showLoginPrompt && (
        <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
                Login Required
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-600">
                Please log in to save and track your cycle data securely.
              </p>
              <Button 
                onClick={handleLoginRedirect}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Go to Login
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Premium Dialog */}
      {showPremiumDialog && (
        <Dialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                Bloom Premium Features
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-2">Upgrade to Premium</h3>
                <p className="text-sm opacity-90">
                  Get access to advanced features and personalized insights
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Premium Features:</h4>
                <ul className="space-y-2">
                  {premiumFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Crown className="w-4 h-4 text-yellow-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 border rounded-lg">
                  <h4 className="font-semibold">Monthly</h4>
                  <p className="text-2xl font-bold">$4.99</p>
                  <p className="text-xs text-gray-500">per month</p>
                </div>
                <div className="text-center p-3 border rounded-lg bg-gray-50">
                  <h4 className="font-semibold">Yearly</h4>
                  <p className="text-2xl font-bold">$39.99</p>
                  <p className="text-xs text-gray-500">$3.33/month</p>
                  <Badge className="mt-1 bg-green-100 text-green-800">Save 33%</Badge>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade Now
              </Button>
              
              <p className="text-xs text-center text-gray-500">
                Cancel anytime. No commitment required.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default BloomPeriodTracker;
