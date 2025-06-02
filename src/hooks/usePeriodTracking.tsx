
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
      .from('period_tracking')
      .select('*')
      .eq('user_id', user.id)
      .order('period_start_date', { ascending: false });

    if (error) {
      console.error('Error fetching period data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch period data',
        variant: 'destructive',
      });
    } else {
      setPeriodData(data || []);
    }
    setLoading(false);
  };

  const savePeriodData = async (data: PeriodData) => {
    if (!user) return;

    setLoading(true);
    const periodEntry = {
      ...data,
      user_id: user.id,
    };

    const { error } = await supabase
      .from('period_tracking')
      .upsert(periodEntry);

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
