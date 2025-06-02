
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, Baby, TrendingUp, Bell, CalendarDays } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { usePeriodTracking } from "@/hooks/usePeriodTracking";
import EnhancedPregnancyTracker from "@/components/EnhancedPregnancyTracker";
import BottomNavigation from "@/components/BottomNavigation";

const BloomPeriodTracker = () => {
  const { user } = useAuth();
  const { periodData, savePeriodData } = usePeriodTracking();
  const [isPregnancyMode, setIsPregnancyMode] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState({
    period_start_date: "",
    period_end_date: "",
    flow_intensity: "medium" as "light" | "medium" | "heavy",
    symptoms: [] as string[],
    mood: "",
    notes: "",
  });

  const handleSavePeriod = async () => {
    await savePeriodData(currentPeriod);
    setCurrentPeriod({
      period_start_date: "",
      period_end_date: "",
      flow_intensity: "medium",
      symptoms: [],
      mood: "",
      notes: "",
    });
  };

  // Calculate next period prediction
  const getNextPeriodPrediction = () => {
    if (periodData.length >= 2) {
      const lastPeriod = new Date(periodData[0].period_start_date);
      const avgCycle = 28; // Default cycle length
      const nextPeriod = new Date(lastPeriod);
      nextPeriod.setDate(lastPeriod.getDate() + avgCycle);
      return nextPeriod.toLocaleDateString();
    }
    return "Track more cycles for predictions";
  };

  // Get current cycle phase
  const getCurrentPhase = () => {
    if (periodData.length > 0) {
      const lastPeriod = new Date(periodData[0].period_start_date);
      const today = new Date();
      const daysSinceLastPeriod = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceLastPeriod <= 5) return { phase: "Menstrual", color: "bg-red-100 text-red-700" };
      if (daysSinceLastPeriod <= 13) return { phase: "Follicular", color: "bg-blue-100 text-blue-700" };
      if (daysSinceLastPeriod <= 16) return { phase: "Ovulation", color: "bg-green-100 text-green-700" };
      return { phase: "Luteal", color: "bg-yellow-100 text-yellow-700" };
    }
    return { phase: "Unknown", color: "bg-gray-100 text-gray-700" };
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center pb-20">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Please log in to track your period</p>
              <Button onClick={() => window.location.href = '/login'}>
                Go to Login
              </Button>
            </div>
          </CardContent>
        </Card>
        <BottomNavigation />
      </div>
    );
  }

  const currentPhase = getCurrentPhase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 pb-20">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-pink-700 flex items-center">
                <Heart className="w-8 h-8 mr-3" />
                Bloom Period Tracker
              </h1>
              <p className="text-gray-600 mt-2">Track your cycle, understand your body</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={isPregnancyMode ? "default" : "outline"}
                onClick={() => setIsPregnancyMode(!isPregnancyMode)}
              >
                <Baby className="w-4 h-4 mr-2" />
                {isPregnancyMode ? "Period Mode" : "Pregnancy Mode"}
              </Button>
              <Button onClick={() => window.history.back()} variant="outline">
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isPregnancyMode ? (
          <EnhancedPregnancyTracker />
        ) : (
          <div className="space-y-6">
            {/* Current Cycle Status */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-white/90">
                <CardContent className="p-4 text-center">
                  <CalendarDays className="w-8 h-8 mx-auto mb-2 text-pink-600" />
                  <h3 className="font-semibold">Current Phase</h3>
                  <Badge className={currentPhase.color}>{currentPhase.phase}</Badge>
                </CardContent>
              </Card>
              <Card className="bg-white/90">
                <CardContent className="p-4 text-center">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold">Next Period</h3>
                  <p className="text-sm text-gray-600">{getNextPeriodPrediction()}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/90">
                <CardContent className="p-4 text-center">
                  <Bell className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-semibold">Reminders</h3>
                  <p className="text-sm text-gray-600">Set notifications</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="track" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/80">
                <TabsTrigger value="track" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Track Period
                </TabsTrigger>
                <TabsTrigger value="calendar" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Calendar
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  History
                </TabsTrigger>
                <TabsTrigger value="insights" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  <Heart className="w-4 h-4 mr-2" />
                  Insights
                </TabsTrigger>
              </TabsList>

              <TabsContent value="track" className="space-y-6">
                <Card className="bg-white/90">
                  <CardHeader>
                    <CardTitle>Log Your Period</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start_date">Period Start Date</Label>
                        <Input
                          id="start_date"
                          type="date"
                          value={currentPeriod.period_start_date}
                          onChange={(e) => setCurrentPeriod({ ...currentPeriod, period_start_date: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="end_date">Period End Date (Optional)</Label>
                        <Input
                          id="end_date"
                          type="date"
                          value={currentPeriod.period_end_date}
                          onChange={(e) => setCurrentPeriod({ ...currentPeriod, period_end_date: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Flow Intensity</Label>
                      <div className="flex gap-2 mt-2">
                        {["light", "medium", "heavy"].map((intensity) => (
                          <Button
                            key={intensity}
                            variant={currentPeriod.flow_intensity === intensity ? "default" : "outline"}
                            onClick={() => setCurrentPeriod({ ...currentPeriod, flow_intensity: intensity as any })}
                            className="capitalize"
                          >
                            {intensity}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="mood">Mood</Label>
                      <Input
                        id="mood"
                        value={currentPeriod.mood}
                        onChange={(e) => setCurrentPeriod({ ...currentPeriod, mood: e.target.value })}
                        placeholder="How are you feeling?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Input
                        id="notes"
                        value={currentPeriod.notes}
                        onChange={(e) => setCurrentPeriod({ ...currentPeriod, notes: e.target.value })}
                        placeholder="Any additional notes..."
                      />
                    </div>

                    <Button onClick={handleSavePeriod} className="w-full bg-pink-600 hover:bg-pink-700">
                      Save Period Data
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="calendar" className="space-y-6">
                <Card className="bg-white/90">
                  <CardHeader>
                    <CardTitle>Cycle Calendar Visualization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <CalendarDays className="w-16 h-16 mx-auto mb-4 text-pink-400" />
                      <p className="text-gray-600">Interactive calendar with cycle phases visualization coming soon!</p>
                      <p className="text-sm text-gray-500 mt-2">Track your periods to see patterns and predictions.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <div className="space-y-4">
                  {periodData.length === 0 ? (
                    <Card className="bg-white/90">
                      <CardContent className="pt-6">
                        <p className="text-center text-gray-600">No period data recorded yet. Start tracking to see your history!</p>
                      </CardContent>
                    </Card>
                  ) : (
                    periodData.map((period) => (
                      <Card key={period.id} className="bg-white/90">
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">
                              {new Date(period.period_start_date).toLocaleDateString()}
                            </CardTitle>
                            <Badge variant="outline" className="capitalize">
                              {period.flow_intensity}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {period.period_end_date && (
                            <p className="text-sm text-gray-600">
                              Ended: {new Date(period.period_end_date).toLocaleDateString()}
                            </p>
                          )}
                          {period.mood && <p className="text-sm">Mood: {period.mood}</p>}
                          {period.notes && <p className="text-sm">Notes: {period.notes}</p>}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <Card className="bg-white/90">
                  <CardHeader>
                    <CardTitle>Cycle Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {periodData.length >= 2 ? (
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-pink-600">
                              {periodData.length}
                            </p>
                            <p className="text-sm text-gray-600">Cycles Tracked</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-pink-600">
                              ~28
                            </p>
                            <p className="text-sm text-gray-600">Avg Cycle Length</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-pink-600 capitalize">
                              {periodData[0]?.flow_intensity || "Medium"}
                            </p>
                            <p className="text-sm text-gray-600">Most Common Flow</p>
                          </div>
                        </div>
                        
                        {/* Notification Settings */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Bell className="w-4 h-4 mr-2" />
                            Period Reminders
                          </h4>
                          <p className="text-sm text-gray-600 mb-3">Get notified about your upcoming period</p>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-2" />
                              <span className="text-sm">Remind me 3 days before</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-2" />
                              <span className="text-sm">Remind me 1 day before</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-2" />
                              <span className="text-sm">Ovulation reminders</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-center text-gray-600">
                        Track at least 2 cycles to see insights and patterns.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default BloomPeriodTracker;
