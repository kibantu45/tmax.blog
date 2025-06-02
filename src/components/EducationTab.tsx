
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Brain, Apple, Dumbbell } from "lucide-react";

const EducationTab = () => {
  const educationTopics = [
    {
      id: 1,
      title: "Understanding Your Menstrual Cycle",
      description: "Learn about the phases of your cycle and what's normal",
      icon: Heart,
      link: "/education/menstrual-cycle",
      color: "bg-pink-100 text-pink-700"
    },
    {
      id: 2,
      title: "Nutrition During Your Period",
      description: "Foods that help reduce cramps and boost energy",
      icon: Apple,
      link: "/education/nutrition-during-period",
      color: "bg-green-100 text-green-700"
    },
    {
      id: 3,
      title: "Fertility and Ovulation",
      description: "Understanding your fertile window and ovulation signs",
      icon: Brain,
      link: "/education/fertility-and-ovulation",
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: 4,
      title: "Managing PMS Symptoms",
      description: "Natural ways to cope with PMS symptoms",
      icon: Heart,
      link: "/education/managing-pms",
      color: "bg-purple-100 text-purple-700"
    },
    {
      id: 5,
      title: "Exercise During Your Cycle",
      description: "Best workouts for each phase of your cycle",
      icon: Dumbbell,
      link: "/education/exercise-during-cycle",
      color: "bg-orange-100 text-orange-700"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {educationTopics.map((topic) => (
        <Card key={topic.id} className="hover:shadow-lg transition-shadow cursor-pointer bg-white/90" onClick={() => window.location.href = topic.link}>
          <CardHeader className="pb-3">
            <div className={`w-12 h-12 rounded-lg ${topic.color} flex items-center justify-center mb-3`}>
              <topic.icon className="w-6 h-6" />
            </div>
            <CardTitle className="text-lg">{topic.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <BookOpen className="w-4 h-4 mr-2" />
              Learn More
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EducationTab;
