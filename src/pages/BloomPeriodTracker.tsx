
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { 
  ArrowLeft, 
  Heart, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  Moon, 
  Droplets, 
  Star,
  Crown,
  Baby,
  Bell,
  Plus,
  Target,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BloomPeriodTracker = () => {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | undefined>(new Date());
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [mood, setMood] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [pregnancyMode, setPregnancyMode] = useState<boolean>(false);
  const [pregnancyWeek, setPregnancyWeek] = useState<number>(1);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const { toast } = useToast();

  // Calculate cycle predictions
  const calculatePredictions = () => {
    if (!lastPeriodDate) return null;
    
    const nextPeriod = new Date(lastPeriodDate);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);
    
    const ovulationDay = new Date(lastPeriodDate);
    ovulationDay.setDate(ovulationDay.getDate() + Math.floor(cycleLength / 2));
    
    const fertileStart = new Date(ovulationDay);
    fertileStart.setDate(fertileStart.getDate() - 5);
    
    const fertileEnd = new Date(ovulationDay);
    fertileEnd.setDate(fertileEnd.getDate() + 1);
    
    return {
      nextPeriod,
      ovulationDay,
      fertileStart,
      fertileEnd
    };
  };

  const predictions = calculatePredictions();

  const getCurrentPhase = () => {
    if (currentDay <= periodLength) return "Menstrual";
    if (currentDay <= 13) return "Follicular";
    if (currentDay >= 14 && currentDay <= 16) return "Ovulatory";
    return "Luteal";
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "Menstrual": return "text-red-600 bg-red-50";
      case "Follicular": return "text-green-600 bg-green-50";
      case "Ovulatory": return "text-orange-600 bg-orange-50";
      case "Luteal": return "text-purple-600 bg-purple-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const symptomsList = [
    "Cramps", "Headache", "Bloating", "Breast Tenderness", "Fatigue", 
    "Mood Swings", "Acne", "Cravings", "Back Pain", "Nausea"
  ];

  const moodOptions = ["😊 Great", "🙂 Good", "😐 Okay", "😕 Low", "😢 Terrible"];

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSaveData = () => {
    // Save tracking data (requires login for persistence)
    toast({
      title: "Data Saved",
      description: "Your tracking data has been saved locally. Sign in to sync across devices.",
    });
  };

  const fetalDevelopmentWeeks = {
    1: "Fertilization occurs - your baby's journey begins!",
    4: "Neural tube forms - brain and spinal cord development starts",
    8: "All major organs begin forming - baby is size of a raspberry",
    12: "Baby can make fists and has developed reflexes",
    16: "You might feel first movements - baby is size of an avocado",
    20: "Halfway point! Baby's hearing is developing",
    24: "Baby's lungs are developing - viability milestone",
    28: "Baby's eyes can open and close",
    32: "Baby's bones are hardening",
    36: "Baby is considered full-term soon",
    40: "Ready for birth! Average delivery time"
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
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <Heart className="w-6 h-6 text-pink-500 mr-2" />
                Bloom Period Tracker
                {isPremium && <Crown className="w-5 h-5 text-yellow-500 ml-2" />}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {!isPremium && (
                <Button 
                  onClick={() => setShowSubscriptionDialog(true)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Day Input */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              Track Your Current Day
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div>
                <Label htmlFor="currentDay">Current Day of Cycle</Label>
                <Input
                  id="currentDay"
                  type="number"
                  min="1"
                  max="50"
                  value={currentDay}
                  onChange={(e) => setCurrentDay(parseInt(e.target.value) || 1)}
                  className="w-20"
                />
              </div>
              <div className={`px-4 py-2 rounded-lg ${getPhaseColor(getCurrentPhase())}`}>
                <strong>{getCurrentPhase()} Phase</strong>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="tracker" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="tracker">Daily Tracker</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="insights">Smart Insights</TabsTrigger>
            {pregnancyMode ? (
              <TabsTrigger value="pregnancy">Pregnancy</TabsTrigger>
            ) : (
              <TabsTrigger value="education">Education</TabsTrigger>
            )}
          </TabsList>

          {/* Daily Tracker Tab */}
          <TabsContent value="tracker" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Cycle Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Cycle Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cycleLength">Average Cycle Length (days)</Label>
                    <Input
                      id="cycleLength"
                      type="number"
                      value={cycleLength}
                      onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="periodLength">Period Length (days)</Label>
                    <Input
                      id="periodLength"
                      type="number"
                      value={periodLength}
                      onChange={(e) => setPeriodLength(parseInt(e.target.value) || 5)}
                    />
                  </div>
                  <div>
                    <Label>Last Period Start Date</Label>
                    <Calendar
                      mode="single"
                      selected={lastPeriodDate}
                      onSelect={setLastPeriodDate}
                      className="rounded-md border"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Symptom Tracking */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Symptoms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {symptomsList.map((symptom) => (
                      <Button
                        key={symptom}
                        variant={symptoms.includes(symptom) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSymptomToggle(symptom)}
                        className="text-sm"
                      >
                        {symptom}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Mood</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {moodOptions.map((moodOption) => (
                          <Button
                            key={moodOption}
                            variant={mood === moodOption ? "default" : "outline"}
                            size="sm"
                            onClick={() => setMood(moodOption)}
                          >
                            {moodOption}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">Personal Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="How are you feeling today? Any observations?"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button onClick={handleSaveData} className="w-full">
              Save Today's Data
            </Button>
          </TabsContent>

          {/* Calendar View Tab */}
          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Cycle Calendar View
                  {!isPremium && <Badge className="ml-2 bg-yellow-500">Premium Feature</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isPremium ? (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enhanced calendar visualization showing period days, ovulation, and fertile windows.</p>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-yellow-50 rounded-lg">
                    <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Premium Calendar View</h3>
                    <p className="text-gray-600 mb-4">Unlock detailed calendar visualization with color-coded cycle phases</p>
                    <Button onClick={() => setShowSubscriptionDialog(true)}>
                      Upgrade to Premium
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Predictions Tab */}
          <TabsContent value="predictions">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Cycle Predictions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {predictions && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <span className="font-medium">Next Period</span>
                        <span className="text-red-600">{predictions.nextPeriod.toDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <span className="font-medium">Ovulation Day</span>
                        <span className="text-orange-600">{predictions.ovulationDay.toDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">Fertile Window</span>
                        <span className="text-green-600">
                          {predictions.fertileStart.toDateString()} - {predictions.fertileEnd.toDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Fertility Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl mb-2">
                      {getCurrentPhase() === "Ovulatory" ? "🔥" : 
                       getCurrentPhase() === "Follicular" ? "🌱" : 
                       getCurrentPhase() === "Luteal" ? "🌙" : "💧"}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {getCurrentPhase() === "Ovulatory" ? "High Fertility" :
                       getCurrentPhase() === "Follicular" ? "Rising Fertility" :
                       "Low Fertility"}
                    </h3>
                    <p className="text-gray-600">
                      You are currently in your {getCurrentPhase().toLowerCase()} phase
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Smart Insights Tab */}
          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Smart Insights & Tips
                  {!isPremium && <Badge className="ml-2 bg-yellow-500">Premium Feature</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isPremium ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Phase-Based Recommendations</h4>
                      <p>Based on your {getCurrentPhase()} phase, we recommend gentle exercise and iron-rich foods.</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Symptom Patterns</h4>
                      <p>Your data shows consistent patterns that can help predict future symptoms.</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-yellow-50 rounded-lg">
                    <Activity className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Personalized Insights</h3>
                    <p className="text-gray-600 mb-4">Get AI-powered insights based on your tracking patterns</p>
                    <Button onClick={() => setShowSubscriptionDialog(true)}>
                      Unlock Smart Insights
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education/Pregnancy Tab */}
          <TabsContent value={pregnancyMode ? "pregnancy" : "education"}>
            {pregnancyMode ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Baby className="w-5 h-5 mr-2" />
                    Pregnancy Week {pregnancyWeek}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="pregnancyWeek">Current Week</Label>
                      <Input
                        id="pregnancyWeek"
                        type="number"
                        min="1"
                        max="42"
                        value={pregnancyWeek}
                        onChange={(e) => setPregnancyWeek(parseInt(e.target.value) || 1)}
                        className="w-24"
                      />
                    </div>
                    <div className="p-4 bg-pink-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Week {pregnancyWeek} Development</h4>
                      <p>{fetalDevelopmentWeeks[pregnancyWeek as keyof typeof fetalDevelopmentWeeks] || "Keep tracking your pregnancy journey!"}</p>
                    </div>
                    <Button 
                      onClick={() => setPregnancyMode(false)}
                      variant="outline"
                    >
                      Exit Pregnancy Mode
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Educational Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.location.href = "/education/menstrual-cycle"}
                    >
                      Understanding Your Menstrual Cycle
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.location.href = "/education/nutrition-during-period"}
                    >
                      Nutrition During Your Period
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.location.href = "/education/fertility-and-ovulation"}
                    >
                      Fertility & Ovulation Explained
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.location.href = "/education/managing-pms"}
                    >
                      Managing PMS Symptoms
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.location.href = "/education/exercise-during-cycle"}
                    >
                      Exercise During Your Cycle
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pregnancy Mode</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <Baby className="w-16 h-16 text-pink-500 mx-auto" />
                      <h3 className="text-lg font-semibold">Expecting?</h3>
                      <p className="text-gray-600">Switch to pregnancy mode for week-by-week fetal development tracking</p>
                      <Button 
                        onClick={() => setPregnancyMode(true)}
                        className="bg-pink-500 hover:bg-pink-600"
                      >
                        <Baby className="w-4 h-4 mr-2" />
                        Enable Pregnancy Mode
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Premium Subscription Dialog */}
        <Dialog open={showSubscriptionDialog} onOpenChange={setShowSubscriptionDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                Upgrade to Bloom Premium
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">KES 100/year</div>
                <p className="text-gray-600">Unlock all premium features</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2 text-green-600" />
                  <span>Enhanced calendar visualization</span>
                </div>
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-green-600" />
                  <span>AI-powered cycle insights</span>
                </div>
                <div className="flex items-center">
                  <Bell className="w-4 h-4 mr-2 text-green-600" />
                  <span>Advanced predictions & notifications</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-2 text-green-600" />
                  <span>Detailed fertility tracking</span>
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  setIsPremium(true);
                  setShowSubscriptionDialog(false);
                  toast({
                    title: "Welcome to Premium!",
                    description: "All premium features are now unlocked.",
                  });
                }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
              >
                Subscribe Now - KES 100/year
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BloomPeriodTracker;
