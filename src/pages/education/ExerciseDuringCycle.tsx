
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Droplets, Star, Heart, Moon, Zap } from "lucide-react";

const ExerciseDuringCycle = () => {
  const phases = [
    {
      title: "Phase 1: Menstrual (Days 1-5)",
      icon: Droplets,
      color: "border-blue-500 bg-blue-50",
      iconColor: "bg-blue-500",
      hormones: "Estrogen/progesterone at lowest",
      energy: "⚡️ Low (Focus on restoration)",
      workouts: [
        "Gentle Yoga: Hip-openers for cramp relief (e.g., child's pose, supine twist)",
        "Walking: 20-30 min nature walks",
        "Tai Chi/Qigong: Fluid movements for energy flow"
      ],
      avoid: "HIIT, heavy lifting, inversions",
      why: "Preserves energy for uterine lining shedding",
      emoji: "🌊"
    },
    {
      title: "Phase 2: Follicular (Days 6-14)",
      icon: Star,
      color: "border-green-500 bg-green-50",
      iconColor: "bg-green-500",
      hormones: "Estrogen rising steadily",
      energy: "⚡️⚡️⚡️⚡️ High (Peak for new challenges!)",
      workouts: [
        "Strength Training: Heavy lifting (5-8 reps/set) → Maximizes muscle growth",
        "HIIT: Sprint intervals, kickboxing → Capitalizes on endurance",
        "Dance/Zumba: Fun cardio for estrogen-fueled confidence",
        "Try New Sports: Rock climbing, trail running"
      ],
      avoid: "None - go for it!",
      why: "Estrogen boosts muscle repair and glycogen storage",
      emoji: "🌱"
    },
    {
      title: "Phase 3: Ovulatory (Days 13-17)",
      icon: Heart,
      color: "border-orange-500 bg-orange-50",
      iconColor: "bg-orange-500",
      hormones: "Estrogen peaks, testosterone rises",
      energy: "⚡️⚡️⚡️⚡️⚡️ Peak (Social & powerful!)",
      workouts: [
        "Social Fitness: Group classes, tennis, partner workouts",
        "Plyometrics: Box jumps, burpees → Leverage explosive power",
        "High-Intensity Sports: Spin classes, circuit training",
        "Performance PRs: Ideal for speed/strength tests"
      ],
      avoid: "None, but focus on form!",
      why: "Peak energy and coordination",
      caution: "Higher ACL injury risk → Focus on form!",
      emoji: "🔥"
    },
    {
      title: "Phase 4: Luteal (Days 18-28)",
      icon: Moon,
      color: "border-purple-500 bg-purple-50",
      iconColor: "bg-purple-500",
      hormones: "Progesterone dominates, estrogen dips",
      energy: "⚡️⚡️ Declining (Focus on maintenance)",
      workouts: [
        "Moderate Cardio: Jogging, swimming, elliptical → Balances mood",
        "Strength Maintenance: Lighter weights (12-15 reps/set)",
        "Mind-Body: Pilates, barre, power yoga → Combats bloating",
        "Outdoor Activities: Hiking, cycling → Reduces PMS anxiety"
      ],
      avoid: "Overexertion",
      why: "Body temperature ↑ → Exercise in cool environments",
      emoji: "🌙"
    }
  ];

  const proTips = [
    "Hydration: Increase electrolytes during luteal phase",
    "Recovery: 10-min extra stretching during menstruation",
    "Timing: Schedule competitions during follicular/ovulatory phases",
    "Listen to Your Body: 'Low energy days' ≠ laziness!"
  ];

  const restSignals = [
    "Dizziness or severe fatigue",
    "Pelvic pain during movement",
    "Bleeding heavier than normal",
    "Migraines or nausea"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🚴‍♀️ Cycle-Synced Exercise: Optimize Your Workouts
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Science Insight */}
        <Card className="mb-8 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-800">Science Insight</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Your hormones dramatically impact energy, strength, and recovery. Aligning workouts with your cycle phases can:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-green-100 rounded-lg">
                <div className="text-2xl mb-1">📈</div>
                <div className="text-sm font-semibold text-green-800">Boost Performance</div>
                <div className="text-xs text-green-600">by 15-30%</div>
              </div>
              <div className="text-center p-3 bg-blue-100 rounded-lg">
                <div className="text-2xl mb-1">🛡️</div>
                <div className="text-sm font-semibold text-blue-800">Reduce Injury Risk</div>
                <div className="text-xs text-blue-600">better form awareness</div>
              </div>
              <div className="text-center p-3 bg-purple-100 rounded-lg">
                <div className="text-2xl mb-1">😊</div>
                <div className="text-sm font-semibold text-purple-800">Enhance Mood</div>
                <div className="text-xs text-purple-600">natural endorphins</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phase-Specific Workouts */}
        <div className="space-y-8">
          {phases.map((phase, index) => (
            <Card key={index} className={`${phase.color} border-2`}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 ${phase.iconColor} rounded-full flex items-center justify-center`}>
                    <phase.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{phase.title}</CardTitle>
                    <p className="text-sm text-gray-600"><strong>Hormones:</strong> {phase.hormones}</p>
                    <p className="text-sm text-gray-600"><strong>Energy Level:</strong> {phase.energy}</p>
                  </div>
                  <div className="text-4xl">{phase.emoji}</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Recommended Workouts:</h4>
                  <ul className="space-y-1">
                    {phase.workouts.map((workout, wIndex) => (
                      <li key={wIndex} className="text-sm text-gray-700">• {workout}</li>
                    ))}
                  </ul>
                </div>
                
                {phase.avoid && (
                  <div className="p-3 bg-red-100 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-1">Avoid:</h4>
                    <p className="text-sm text-red-700">{phase.avoid}</p>
                  </div>
                )}

                {phase.caution && (
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-1">Caution:</h4>
                    <p className="text-sm text-yellow-700">{phase.caution}</p>
                  </div>
                )}

                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-1">Why:</h4>
                  <p className="text-sm text-gray-700">{phase.why}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* App Integration */}
        <Card className="mt-8 border-indigo-200 bg-indigo-50">
          <CardHeader>
            <CardTitle className="text-indigo-800">📱 App Integration Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-2">Auto-Sync Workouts</h4>
                <p className="text-sm text-indigo-700">"Your follicular phase starts tomorrow → Strength program unlocked!"</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-2">Symptom-Adjusted Plans</h4>
                <p className="text-sm text-indigo-700">Log "low energy" → Suggests yoga instead of HIIT</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-2">Progress Tracking</h4>
                <p className="text-sm text-indigo-700">"You lifted 20% heavier during ovulation vs. luteal!"</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-2">Community Challenges</h4>
                <p className="text-sm text-indigo-700">"Join July's Cycle-Synced Fitness Challenge"</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pro Tips */}
        <Card className="mt-8 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              🌟 Pro Tips for All Phases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {proTips.map((tip, index) => (
                <li key={index} className="text-sm text-green-700">• {tip}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* When to Rest */}
        <Card className="mt-8 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">🚨 When to Rest</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-3">Skip intense exercise if you experience:</p>
            <ul className="list-disc list-inside text-red-700 space-y-1">
              {restSignals.map((signal, index) => (
                <li key={index}>{signal}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExerciseDuringCycle;
