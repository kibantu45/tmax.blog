import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Heart, Droplets, Moon, Star, TrendingUp, Crown, Lock, Plus, ChevronLeft, ChevronRight, Baby, Activity, Brain, Apple } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const PeriodTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isPremium, setIsPremium] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [pregnancyMode, setPregnancyMode] = useState(false);
  const [pregnancyWeek, setPregnancyWeek] = useState(12);
  const [cycleData, setCycleData] = useState({
    lastPeriodDate: new Date(2024, 10, 15), // Nov 15, 2024
    cycleLength: 28,
    periodLength: 5
  });
  const [todaySymptoms, setTodaySymptoms] = useState<string[]>([]);
  const [todayMood, setTodayMood] = useState<string>('');
  const [todayNotes, setTodayNotes] = useState('');
  const [flowIntensity, setFlowIntensity] = useState<string>('');

  // Enhanced symptom categories
  const symptomOptions = [
    { id: 'cramps', name: 'Cramps', icon: '🤕', category: 'physical' },
    { id: 'headache', name: 'Headache', icon: '🤯', category: 'physical' },
    { id: 'bloating', name: 'Bloating', icon: '🎈', category: 'physical' },
    { id: 'tender_breasts', name: 'Tender Breasts', icon: '💔', category: 'physical' },
    { id: 'fatigue', name: 'Fatigue', icon: '😴', category: 'physical' },
    { id: 'acne', name: 'Acne', icon: '🔴', category: 'physical' },
    { id: 'nausea', name: 'Nausea', icon: '🤢', category: 'physical' },
    { id: 'back_pain', name: 'Back Pain', icon: '🦴', category: 'physical' },
    { id: 'joint_pain', name: 'Joint Pain', icon: '🦵', category: 'physical' },
    { id: 'hot_flashes', name: 'Hot Flashes', icon: '🔥', category: 'physical' },
    { id: 'mood_swings', name: 'Mood Swings', icon: '🎭', category: 'emotional' },
    { id: 'anxiety', name: 'Anxiety', icon: '😰', category: 'emotional' },
    { id: 'irritability', name: 'Irritability', icon: '😤', category: 'emotional' },
    { id: 'depression', name: 'Low Mood', icon: '😔', category: 'emotional' },
    { id: 'emotional', name: 'Emotional', icon: '😢', category: 'emotional' },
    { id: 'cravings', name: 'Food Cravings', icon: '🍫', category: 'other' },
    { id: 'insomnia', name: 'Sleep Issues', icon: '🌙', category: 'other' },
    { id: 'constipation', name: 'Constipation', icon: '💩', category: 'other' },
    { id: 'diarrhea', name: 'Diarrhea', icon: '💧', category: 'other' }
  ];

  const moodOptions = [
    { id: 'happy', name: 'Happy', icon: '😊' },
    { id: 'calm', name: 'Calm', icon: '😌' },
    { id: 'energetic', name: 'Energetic', icon: '⚡' },
    { id: 'excited', name: 'Excited', icon: '🤩' },
    { id: 'confident', name: 'Confident', icon: '💪' },
    { id: 'sad', name: 'Sad', icon: '😢' },
    { id: 'anxious', name: 'Anxious', icon: '😰' },
    { id: 'irritated', name: 'Irritated', icon: '😠' },
    { id: 'tired', name: 'Tired', icon: '😴' },
    { id: 'moody', name: 'Moody', icon: '🙄' }
  ];

  // Enhanced fetal development data
  const fetalDevelopment = {
    8: { stage: "Early Development", development: "Baby is about the size of a raspberry. Major organs begin to form.", size: "0.6 inches", weight: "0.04 oz" },
    12: { stage: "First Trimester", development: "Baby is about the size of a lime. Major organs are forming and functioning.", size: "2 inches", weight: "0.5 oz" },
    16: { stage: "Second Trimester", development: "Baby can hear sounds and move around. Sex can be determined.", size: "4.5 inches", weight: "3.5 oz" },
    20: { stage: "Mid-Pregnancy", development: "Baby's movements can be felt. Anatomy scan typically done.", size: "6.5 inches", weight: "10 oz" },
    24: { stage: "Viability", development: "Baby's lungs are developing. Can survive outside womb with medical care.", size: "12 inches", weight: "1.3 lbs" },
    28: { stage: "Third Trimester", development: "Baby's brain is rapidly developing. Eyes can open and close.", size: "14 inches", weight: "2.2 lbs" },
    32: { stage: "Growth Phase", development: "Baby is gaining weight rapidly. Bones are hardening.", size: "16 inches", weight: "3.7 lbs" },
    36: { stage: "Near Term", development: "Baby is considered full-term soon. Lungs are maturing.", size: "18 inches", weight: "5.8 lbs" },
    40: { stage: "Full Term", development: "Baby is ready for birth. Average weight is 7-8 pounds.", size: "20 inches", weight: "7.5 lbs" }
  };

  // Advanced cycle calculations
  const getCurrentCycleDay = () => {
    const today = new Date();
    const timeDiff = today.getTime() - cycleData.lastPeriodDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    return (daysDiff % cycleData.cycleLength) + 1;
  };

  const getCurrentPhase = () => {
    const cycleDay = getCurrentCycleDay();
    if (cycleDay <= cycleData.periodLength) {
      return { 
        phase: 'Menstrual', 
        color: 'bg-red-500', 
        icon: Droplets, 
        description: 'Shedding of uterine lining',
        tips: 'Rest, stay hydrated, use heat for cramps'
      };
    }
    if (cycleDay <= 13) {
      return { 
        phase: 'Follicular', 
        color: 'bg-green-500', 
        icon: Star, 
        description: 'Preparing for ovulation',
        tips: 'Great time for new activities and planning'
      };
    }
    if (cycleDay <= 16) {
      return { 
        phase: 'Ovulation', 
        color: 'bg-pink-500', 
        icon: Heart, 
        description: 'Most fertile time',
        tips: 'Peak fertility - perfect for conception'
      };
    }
    return { 
      phase: 'Luteal', 
      color: 'bg-purple-500', 
      icon: Moon, 
      description: 'Preparing for next cycle',
      tips: 'Focus on self-care and stress management'
    };
  };

  const getNextPeriodDate = () => {
    const cycleDay = getCurrentCycleDay();
    const daysUntilNext = cycleData.cycleLength - cycleDay;
    return daysUntilNext;
  };

  // Enhanced fertile window calculations
  const getFertileWindow = () => {
    const ovulationDay = Math.round(cycleData.cycleLength - 14); // More accurate ovulation prediction
    const cycleDay = getCurrentCycleDay();
    const fertileStart = ovulationDay - 5;
    const fertileEnd = ovulationDay + 2;
    
    if (cycleDay >= fertileStart && cycleDay <= fertileEnd) {
      const daysLeft = fertileEnd - cycleDay;
      const fertilityLevel = cycleDay === ovulationDay ? 'Peak' : 
                           (cycleDay === ovulationDay - 1 || cycleDay === ovulationDay + 1) ? 'High' : 'Medium';
      return { 
        isFertile: true, 
        daysLeft, 
        fertilityLevel,
        ovulationDay: ovulationDay,
        isOvulationDay: cycleDay === ovulationDay
      };
    }
    
    let nextFertileStart;
    if (cycleDay < fertileStart) {
      nextFertileStart = fertileStart - cycleDay;
    } else {
      nextFertileStart = cycleData.cycleLength + fertileStart - cycleDay;
    }
    
    return { 
      isFertile: false, 
      daysUntil: nextFertileStart,
      fertilityLevel: 'Low',
      ovulationDay: ovulationDay,
      isOvulationDay: false
    };
  };

  // Enhanced calendar rendering with better visualization
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-14"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === new Date().toDateString();
      
      // Enhanced cycle day calculations
      const daysDiff = Math.floor((date.getTime() - cycleData.lastPeriodDate.getTime()) / (1000 * 3600 * 24));
      const cycleDay = ((daysDiff % cycleData.cycleLength) + cycleData.cycleLength) % cycleData.cycleLength + 1;
      
      const isPeriodDay = cycleDay <= cycleData.periodLength;
      const ovulationDay = Math.round(cycleData.cycleLength - 14);
      const isOvulationDay = cycleDay === ovulationDay;
      const isFertileDay = cycleDay >= (ovulationDay - 5) && cycleDay <= (ovulationDay + 2);
      const isPreOvulation = cycleDay >= (ovulationDay - 2) && cycleDay < ovulationDay;
      const isPostOvulation = cycleDay > ovulationDay && cycleDay <= (ovulationDay + 2);
      
      let dayClass = "h-14 w-14 flex items-center justify-center rounded-full cursor-pointer transition-all hover:bg-gray-100 relative text-sm font-medium";
      
      if (isToday) {
        dayClass += " bg-pink-500 text-white font-bold ring-2 ring-pink-300";
      } else if (isPeriodDay) {
        dayClass += " bg-red-100 border-2 border-red-400 text-red-800";
      } else if (isOvulationDay) {
        dayClass += " bg-pink-200 border-2 border-pink-500 text-pink-800";
      } else if (isPreOvulation) {
        dayClass += " bg-green-100 border border-green-400 text-green-800";
      } else if (isPostOvulation) {
        dayClass += " bg-purple-100 border border-purple-400 text-purple-800";
      } else if (isFertileDay) {
        dayClass += " bg-yellow-100 border border-yellow-400 text-yellow-800";
      }
      
      days.push(
        <div
          key={day}
          className={dayClass}
          onClick={() => setSelectedDate(date)}
        >
          <span>{day}</span>
          {isPeriodDay && !isToday && <div className="absolute w-2 h-2 bg-red-500 rounded-full bottom-1"></div>}
          {isOvulationDay && !isToday && <div className="absolute w-2 h-2 bg-pink-500 rounded-full bottom-1"></div>}
          {isFertileDay && !isPeriodDay && !isOvulationDay && !isToday && 
            <div className="absolute w-1.5 h-1.5 bg-green-400 rounded-full bottom-1"></div>}
        </div>
      );
    }

    return days;
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const handleSymptomToggle = (symptomId: string) => {
    setTodaySymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const saveTodayData = () => {
    const todayData = {
      date: new Date().toISOString(),
      symptoms: todaySymptoms,
      mood: todayMood,
      notes: todayNotes,
      flowIntensity
    };
    
    const existingData = localStorage.getItem('cycleData') || '[]';
    const allData = JSON.parse(existingData);
    allData.push(todayData);
    localStorage.setItem('cycleData', JSON.stringify(allData));
    
    alert('Today\'s data saved successfully!');
  };

  const currentPhase = getCurrentPhase();
  const PhaseIcon = currentPhase.icon;
  const nextPeriod = getNextPeriodDate();
  const fertileWindow = getFertileWindow();
  const cycleDay = getCurrentCycleDay();

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
                FloTracker Pro
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant={pregnancyMode ? "default" : "outline"}
                onClick={() => setPregnancyMode(!pregnancyMode)}
                className={pregnancyMode ? "bg-pink-500 text-white" : ""}
              >
                <Baby className="w-4 h-4 mr-2" />
                {pregnancyMode ? "Pregnancy Mode" : "Enable Pregnancy Mode"}
              </Button>
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
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>Advanced cycle predictions with 95% accuracy</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4 text-yellow-500" />
                            <span>Comprehensive symptom analytics & trends</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Brain className="w-4 h-4 text-yellow-500" />
                            <span>AI-powered health insights & recommendations</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Baby className="w-4 h-4 text-yellow-500" />
                            <span>Detailed pregnancy tracking & weekly tips</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Apple className="w-4 h-4 text-yellow-500" />
                            <span>Personalized nutrition & exercise advice</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Heart className="w-4 h-4 text-yellow-500" />
                            <span>Fertility optimization recommendations</span>
                          </div>
                        </div>
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
        {/* Enhanced Status Display */}
        {pregnancyMode ? (
          <Card className="mb-8 border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center">
                    <Baby className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Week {pregnancyWeek} of Pregnancy</h2>
                    <p className="text-gray-600">{fetalDevelopment[pregnancyWeek as keyof typeof fetalDevelopment]?.stage}</p>
                    <div className="flex space-x-4 mt-2">
                      <span className="text-sm text-pink-600">Size: {fetalDevelopment[pregnancyWeek as keyof typeof fetalDevelopment]?.size}</span>
                      <span className="text-sm text-purple-600">Weight: {fetalDevelopment[pregnancyWeek as keyof typeof fetalDevelopment]?.weight}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Input
                    type="number"
                    value={pregnancyWeek}
                    onChange={(e) => setPregnancyWeek(parseInt(e.target.value))}
                    min="1"
                    max="42"
                    className="w-20 text-center"
                  />
                  <Label className="text-xs text-gray-500">Week</Label>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg">
                <p className="text-gray-700">{fetalDevelopment[pregnancyWeek as keyof typeof fetalDevelopment]?.development}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8 border-pink-200">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 ${currentPhase.color} rounded-full flex items-center justify-center`}>
                    <PhaseIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{currentPhase.phase}</h2>
                    <p className="text-gray-600">Day {cycleDay} of {cycleData.cycleLength}</p>
                    <p className="text-sm text-gray-500">{currentPhase.description}</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-pink-600">Next Period</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {nextPeriod === 0 ? "Today" : `${nextPeriod} days`}
                  </div>
                  <p className="text-sm text-gray-500">Expected arrival</p>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">Fertility Status</div>
                  <div className="text-lg font-bold text-gray-900">
                    {fertileWindow.isFertile ? (
                      <div>
                        <span className={`px-2 py-1 rounded text-sm ${
                          fertileWindow.fertilityLevel === 'Peak' ? 'bg-red-100 text-red-800' :
                          fertileWindow.fertilityLevel === 'High' ? 'bg-orange-100 text-orange-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {fertileWindow.fertilityLevel} Fertility
                        </span>
                        <div className="text-sm text-gray-600 mt-1">
                          {fertileWindow.daysLeft} days left
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span className="text-gray-600">Low Fertility</span>
                        <div className="text-sm text-gray-500">
                          {fertileWindow.daysUntil} days until fertile window
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600">Today's Tip</div>
                  <div className="text-sm text-gray-700 italic">
                    {currentPhase.tips}
                  </div>
                  {fertileWindow.isOvulationDay && (
                    <div className="mt-2 px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs">
                      🌟 Ovulation Day!
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhanced Calendar */}
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
                    <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                      Today
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
                <div className="flex items-center justify-center space-x-4 mt-6 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-300 rounded-full"></div>
                    <span>Period</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-pink-300 rounded-full"></div>
                    <span>Ovulation</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-300 rounded-full"></div>
                    <span>Pre-Ovulation</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-purple-300 rounded-full"></div>
                    <span>Post-Ovulation</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
                    <span>Fertile Window</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Enhanced Today's Log */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Today's Log</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="symptoms" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                    <TabsTrigger value="mood">Mood</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="symptoms" className="space-y-4">
                    {!pregnancyMode && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Flow Intensity
                        </Label>
                        <div className="flex space-x-2">
                          {['Light', 'Medium', 'Heavy', 'Spotting'].map(intensity => (
                            <Button
                              key={intensity}
                              variant={flowIntensity === intensity ? "default" : "outline"}
                              size="sm"
                              className="flex-1 text-xs"
                              onClick={() => setFlowIntensity(intensity)}
                            >
                              {intensity}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Physical Symptoms
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {symptomOptions.filter(s => s.category === 'physical').slice(0, isPremium ? 10 : 6).map(symptom => (
                          <Button
                            key={symptom.id}
                            variant={todaySymptoms.includes(symptom.id) ? "default" : "outline"}
                            size="sm"
                            className="text-xs justify-start h-8"
                            onClick={() => handleSymptomToggle(symptom.id)}
                          >
                            {symptom.icon} {symptom.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Emotional Symptoms
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {symptomOptions.filter(s => s.category === 'emotional').slice(0, isPremium ? 5 : 3).map(symptom => (
                          <Button
                            key={symptom.id}
                            variant={todaySymptoms.includes(symptom.id) ? "default" : "outline"}
                            size="sm"
                            className="text-xs justify-start h-8"
                            onClick={() => handleSymptomToggle(symptom.id)}
                          >
                            {symptom.icon} {symptom.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {!isPremium && (
                      <div className="mt-2 p-2 bg-gray-100 rounded-lg flex items-center space-x-2">
                        <Lock className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-600">More symptoms & categories in Premium</span>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="mood" className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        How are you feeling today?
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {moodOptions.slice(0, isPremium ? 10 : 6).map(mood => (
                          <Button
                            key={mood.id}
                            variant={todayMood === mood.id ? "default" : "outline"}
                            size="sm"
                            className="text-xs justify-start h-8"
                            onClick={() => setTodayMood(mood.id)}
                          >
                            {mood.icon} {mood.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notes" className="space-y-4">
                    <div>
                      <Label htmlFor="notes" className="text-sm font-medium text-gray-700 mb-2 block">
                        Personal Notes
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="How are you feeling today? Any observations about your cycle, symptoms, or general wellbeing?"
                        value={todayNotes}
                        onChange={(e) => setTodayNotes(e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
                
                <Button 
                  onClick={saveTodayData}
                  className="w-full mt-4 bg-pink-600 hover:bg-pink-700"
                >
                  Save Today's Data
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Insights */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Smart Insights
                  {!isPremium && <Lock className="w-4 h-4 ml-2 text-gray-400" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isPremium ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-pink-50 rounded-lg">
                      <p className="text-sm font-medium text-pink-800">
                        🔄 Your cycle is 2 days longer than average (26-32 days is normal)
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">
                        📊 PMS symptoms typically start 3 days before your period
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-800">
                        🌱 Your most fertile days are typically days 12-16 of your cycle
                      </p>
                    </div>
                    {fertileWindow.isFertile && (
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <p className="text-sm font-medium text-yellow-800">
                          🌟 You're in your fertile window! {fertileWindow.fertilityLevel.toLowerCase()} fertility today.
                        </p>
                      </div>
                    )}
                    {fertileWindow.isOvulationDay && (
                      <div className="p-3 bg-red-50 rounded-lg">
                        <p className="text-sm font-medium text-red-800">
                          🎯 Ovulation day! Peak fertility for conception.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm mb-2">
                      Unlock AI-powered insights with Premium
                    </p>
                    <p className="text-xs text-gray-500">
                      Get personalized predictions, cycle analysis, and health recommendations
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Cycle Stats */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Cycle Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Cycle Day</span>
                  <span className="font-semibold">{cycleDay} of {cycleData.cycleLength}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Period</span>
                  <span className="font-semibold text-red-600">{nextPeriod} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Ovulation</span>
                  <span className="font-semibold text-pink-600">
                    {fertileWindow.isFertile && fertileWindow.isOvulationDay ? 'Today' : 
                     fertileWindow.isFertile ? `${fertileWindow.ovulationDay - cycleDay} days` :
                     `${fertileWindow.daysUntil + 5} days`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Cycle</span>
                  <span className="font-semibold">{cycleData.cycleLength} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Period Length</span>
                  <span className="font-semibold">{cycleData.periodLength} days</span>
                </div>
                {isPremium && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cycle Regularity</span>
                      <span className="font-semibold text-green-600">94% Regular</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Prediction Accuracy</span>
                      <span className="font-semibold text-blue-600">96% Accurate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Symptom Patterns</span>
                      <span className="font-semibold text-purple-600">Tracked</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Content */}
        <Card className="mt-8 border-pink-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Educational Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border-pink-200 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-pink-800 mb-2">🌸 Understanding Your Cycle</h3>
                  <p className="text-sm text-gray-600">Learn about the four phases of your menstrual cycle and hormonal changes</p>
                </CardContent>
              </Card>
              <Card className="border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-orange-800 mb-2">🥗 Nutrition & Periods</h3>
                  <p className="text-sm text-gray-600">Foods that help reduce cramps and boost energy during your cycle</p>
                </CardContent>
              </Card>
              <Card className="border-green-200 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-green-800 mb-2">🌱 Fertility Awareness</h3>
                  <p className="text-sm text-gray-600">Understanding ovulation, fertile windows, and conception timing</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PeriodTracker;
