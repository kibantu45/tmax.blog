
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface PeriodData {
  id?: string;
  period_start_date: string;
  period_end_date?: string;
  cycle_length?: number;
  flow_intensity?: 'light' | 'medium' | 'heavy';
  symptoms?: string[];
  mood?: string;
  notes?: string;
  is_pregnancy_mode?: boolean;
  pregnancy_week?: number;
  due_date?: string;
}

export const usePeriodTracking = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [periodData, setPeriodData] = useState<PeriodData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPeriodData = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('pregnancy_tracking')
      .select('*')
      .eq('user_id', user.id)
      .order('pregnancy_start_date', { ascending: false });

    if (error) {
      console.error('Error fetching period data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch period data',
        variant: 'destructive',
      });
    } else {
      // Transform the data to match our interface
      const transformedData = (data || []).map(item => ({
        id: item.id,
        period_start_date: item.pregnancy_start_date,
        period_end_date: '', // Not in pregnancy table
        cycle_length: 28, // Default value
        flow_intensity: 'medium' as 'light' | 'medium' | 'heavy',
        symptoms: Array.isArray(item.symptoms) ? item.symptoms.map(s => String(s)) : [],
        mood: '', // Not in pregnancy table
        notes: item.notes || '',
        is_pregnancy_mode: true,
        pregnancy_week: item.current_week,
        due_date: item.due_date,
      }));
      setPeriodData(transformedData);
    }
    setLoading(false);
  };

  const savePeriodData = async (data: PeriodData) => {
    if (!user) return;

    setLoading(true);
    const pregnancyEntry = {
      id: data.id,
      user_id: user.id,
      pregnancy_start_date: data.period_start_date,
      current_week: data.pregnancy_week || 1,
      due_date: data.due_date || new Date().toISOString().split('T')[0],
      notes: data.notes,
      symptoms: data.symptoms,
    };

    const { error } = await supabase
      .from('pregnancy_tracking')
      .upsert(pregnancyEntry);

    if (error) {
      console.error('Error saving period data:', error);
      toast({
        title: 'Error',
        description: 'Failed to save period data',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Period data saved successfully',
      });
      fetchPeriodData();
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPeriodData();
  }, [user]);

  return {
    periodData,
    loading,
    savePeriodData,
    fetchPeriodData,
  };
};
