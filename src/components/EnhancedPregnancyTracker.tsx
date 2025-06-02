
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Baby, Heart, Weight, Clock, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface PregnancyData {
  id?: string;
  pregnancy_start_date: string;
  due_date: string;
  current_week: number;
  baby_name?: string;
  notes?: string;
  appointments?: any[];
  symptoms?: any[];
  weight_tracking?: any[];
}

const EnhancedPregnancyTracker = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [pregnancyData, setPregnancyData] = useState<PregnancyData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const weeklyDevelopment = {
    1: { title: "Fertilization", description: "The journey begins! Sperm meets egg." },
    4: { title: "Implantation", description: "Embryo attaches to uterine wall. You might miss your period." },
    8: { title: "Embryonic Stage", description: "Major organs begin forming. Baby is size of a raspberry." },
    12: { title: "End of First Trimester", description: "Risk of miscarriage decreases. Baby is size of a plum." },
    16: { title: "Second Trimester Begins", description: "You might feel baby's first movements. Baby is size of an avocado." },
    20: { title: "Anatomy Scan", description: "Major organ systems developed. Baby is size of a banana." },
    24: { title: "Viability Milestone", description: "Baby could survive outside womb with medical help." },
    28: { title: "Third Trimester", description: "Brain development accelerates. Baby is size of an eggplant." },
    32: { title: "Rapid Growth", description: "Baby gains weight quickly. Lungs continue maturing." },
    36: { title: "Full Term Approaching", description: "Baby's organs are nearly mature. Head engages in pelvis." },
    40: { title: "Due Date", description: "Baby is full term and ready to meet you!" },
  };

  useEffect(() => {
    if (user) {
      fetchPregnancyData();
    }
  }, [user]);

  const fetchPregnancyData = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('pregnancy_tracking')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching pregnancy data:', error);
    } else if (data) {
      // Transform the data to match our interface
      const transformedData: PregnancyData = {
        id: data.id,
        pregnancy_start_date: data.pregnancy_start_date,
        due_date: data.due_date,
        current_week: data.current_week,
        baby_name: data.baby_name,
        notes: data.notes,
        appointments: Array.isArray(data.appointments) ? data.appointments : [],
        symptoms: Array.isArray(data.symptoms) ? data.symptoms : [],
        weight_tracking: Array.isArray(data.weight_tracking) ? data.weight_tracking : [],
      };
      setPregnancyData(transformedData);
    }
  };

  const savePregnancyData = async () => {
    if (!user || !pregnancyData) return;

    setLoading(true);
    const { error } = await supabase
      .from('pregnancy_tracking')
      .upsert({
        ...pregnancyData,
        user_id: user.id,
      });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to save pregnancy data',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Pregnancy data saved successfully',
      });
      setIsEditing(false);
    }
    setLoading(false);
  };

  const calculateWeek = (startDate: string) => {
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return Math.min(diffWeeks, 42);
  };

  const getCurrentDevelopmentInfo = (week: number) => {
    const milestones = Object.keys(weeklyDevelopment).map(Number).sort((a, b) => a - b);
    const currentMilestone = milestones.reverse().find(milestone => week >= milestone);
    return currentMilestone ? weeklyDevelopment[currentMilestone] : weeklyDevelopment[1];
  };

  if (!pregnancyData) {
    return (
      <Card className="bg-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Baby className="w-6 h-6 mr-2 text-pink-600" />
            Start Pregnancy Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="start_date">Pregnancy Start Date</Label>
              <Input
                id="start_date"
                type="date"
                onChange={(e) => {
                  const startDate = e.target.value;
                  const dueDate = new Date(startDate);
                  dueDate.setDate(dueDate.getDate() + 280); // 40 weeks
                  
                  setPregnancyData({
                    pregnancy_start_date: startDate,
                    due_date: dueDate.toISOString().split('T')[0],
                    current_week: calculateWeek(startDate),
                  });
                }}
              />
            </div>
            <Button 
              onClick={savePregnancyData} 
              disabled={!pregnancyData?.pregnancy_start_date || loading}
              className="w-full"
            >
              Start Tracking
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentWeek = calculateWeek(pregnancyData.pregnancy_start_date);
  const developmentInfo = getCurrentDevelopmentInfo(currentWeek);

  return (
    <div className="space-y-6">
      {/* Current Week Overview */}
      <Card className="bg-gradient-to-r from-pink-100 to-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-pink-600" />
            Week {currentWeek} of Pregnancy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">{developmentInfo.title}</h3>
              <p className="text-gray-700">{developmentInfo.description}</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Due Date:</span>
                  <Badge variant="outline">{new Date(pregnancyData.due_date).toLocaleDateString()}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Days Remaining:</span>
                  <Badge variant="outline">
                    {Math.max(0, Math.ceil((new Date(pregnancyData.due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Baby className="w-24 h-24 text-pink-400 mb-2" />
              <p className="text-center text-sm text-gray-600">
                Your baby is growing beautifully!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Baby Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Heart className="w-6 h-6 mr-2 text-red-500" />
              Baby Information
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="baby_name">Baby Name</Label>
            <Input
              id="baby_name"
              value={pregnancyData.baby_name || ''}
              onChange={(e) => setPregnancyData({ ...pregnancyData, baby_name: e.target.value })}
              disabled={!isEditing}
              placeholder="Choose a name or nickname"
            />
          </div>
          <div>
            <Label htmlFor="notes">Notes & Thoughts</Label>
            <Textarea
              id="notes"
              value={pregnancyData.notes || ''}
              onChange={(e) => setPregnancyData({ ...pregnancyData, notes: e.target.value })}
              disabled={!isEditing}
              placeholder="Write your thoughts, feelings, or memories..."
              rows={4}
            />
          </div>
          {isEditing && (
            <Button onClick={savePregnancyData} disabled={loading} className="w-full">
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Weekly Development Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
            Development Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(weeklyDevelopment).map(([week, info]) => (
              <div
                key={week}
                className={`p-4 rounded-lg border ${
                  currentWeek >= parseInt(week)
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Week {week}: {info.title}</h4>
                    <p className="text-sm text-gray-600">{info.description}</p>
                  </div>
                  {currentWeek >= parseInt(week) && (
                    <Badge variant="default" className="bg-green-500">
                      <Clock className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedPregnancyTracker;
