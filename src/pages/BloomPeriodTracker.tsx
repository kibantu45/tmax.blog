
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, Baby, TrendingUp } from "lucide-react";
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
          <Tabs defaultValue="track" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white/80">
              <TabsTrigger value="track" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                <Calendar className="w-4 h-4 mr-2" />
                Track Period
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
                          <p className="text-2xl font-bold text-pink-600">
                            {periodData[0]?.flow_intensity || "Medium"}
                          </p>
                          <p className="text-sm text-gray-600">Most Common Flow</p>
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
        )}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default BloomPeriodTracker;
