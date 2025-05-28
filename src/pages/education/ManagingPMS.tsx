
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Moon, Droplets, Zap, Brain } from "lucide-react";

const ManagingPMS = () => {
  const symptoms = [
    {
      category: "Mood Swings & Irritability",
      icon: Brain,
      why: "Serotonin drops as estrogen fluctuates",
      solutions: [
        "Food Rx: Dark chocolate (70%+), salmon, flaxseeds → Boost serotonin",
        "Supplement: 50mg Vitamin B6 daily (regulates neurotransmitters)",
        "Movement: 30-min brisk walk → Releases endorphins",
        "Mind Hack: '5-4-3-2-1' grounding technique during meltdowns"
      ],
      color: "purple"
    },
    {
      category: "Bloating & Water Retention",
      icon: Droplets,
      why: "Progesterone slows digestion + aldosterone spikes",
      solutions: [
        "Food Rx: Dandelion tea, cucumber, asparagus → Natural diuretics",
        "Avoid: Salt, processed foods, carbonated drinks",
        "Massage: Gentle clockwise abdominal circles with ginger oil",
        "Pose: Legs-up-the-wall (10 mins daily) → Drains fluid"
      ],
      color: "blue"
    },
    {
      category: "Cramps (Dysmenorrhea)",
      icon: Heart,
      why: "Prostaglandins trigger uterine contractions",
      solutions: [
        "Heat Therapy: Heating pad at 104°F (40°C) for 20 mins → 47% pain reduction",
        "Food Rx: Ginger tea (1 tbsp grated ginger) → Anti-prostaglandin",
        "Pressure Point: Massage SP6 point (4 finger-widths above inner ankle)",
        "Supplement: 300mg Magnesium glycinate at bedtime"
      ],
      color: "red"
    },
    {
      category: "Fatigue & Low Energy",
      icon: Moon,
      why: "Progesterone surge → Core temp ↑ → Disrupted sleep",
      solutions: [
        "Sleep Hack: Cool room (65°F/18°C) + weighted blanket",
        "Food Rx: Iron-rich spinach + vitamin C bell peppers → Combat blood-loss anemia",
        "Power Nap: 20 mins max (prevents sleep inertia)",
        "Adaptogen: Rhodiola rosea (200mg) → Fights fatigue"
      ],
      color: "gray"
    }
  ];

  const supplements = [
    { name: "Magnesium", dose: "300-400mg", benefit: "Relieves cramps, anxiety", timing: "Nightly" },
    { name: "Vitamin B6", dose: "50-100mg", benefit: "Reduces mood swings", timing: "Morning" },
    { name: "Chasteberry (Vitex)", dose: "400mg", benefit: "Balances hormones", timing: "3+ months" },
    { name: "Omega-3s", dose: "1000mg EPA/DHA", benefit: "Lowers inflammation", timing: "With food" },
    { name: "Calcium", dose: "1200mg", benefit: "Decreases bloating/cravings", timing: "Split doses" }
  ];

  const whenToSeeDoctor = [
    "PMDD: Severe depression/suicidal thoughts",
    "Debilitating pain (can't leave bed)",
    "Migraines with aura",
    "Symptoms lasting greater than 2 weeks/month"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="bg-white/90 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-50">
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
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🌿 Managing PMS Naturally: Your Symptom Relief Guide
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Science Insight */}
        <Card className="mb-8 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-800">Did You Know?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              85% of menstruators experience PMS symptoms. Blame hormonal shifts (estrogen/progesterone rollercoasters!), 
              but know this: <strong>Natural solutions can reduce symptoms by 40-60%.</strong>
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-green-100 rounded-lg">
                <div className="text-2xl mb-1">📈</div>
                <div className="text-sm font-semibold text-green-800">Boost Performance</div>
                <div className="text-xs text-green-600">by 15-30%</div>
              </div>
              <div className="text-center p-3 bg-blue-100 rounded-lg">
                <div className="text-2xl mb-1">🛡️</div>
                <div className="text-sm font-semibold text-blue-800">Reduce Symptoms</div>
                <div className="text-xs text-blue-600">natural remedies</div>
              </div>
              <div className="text-center p-3 bg-purple-100 rounded-lg">
                <div className="text-2xl mb-1">😊</div>
                <div className="text-sm font-semibold text-purple-800">Enhance Mood</div>
                <div className="text-xs text-purple-600">hormone balance</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Symptom-Specific Relief */}
        <div className="space-y-8">
          {symptoms.map((symptom, index) => (
            <Card key={index} className={`border-${symptom.color}-200 bg-${symptom.color}-50 border-2`}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-${symptom.color}-500 rounded-full flex items-center justify-center`}>
                    <symptom.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{symptom.category}</CardTitle>
                    <p className="text-sm text-gray-600"><strong>Why:</strong> {symptom.why}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Solutions:</h4>
                  <ul className="space-y-1">
                    {symptom.solutions.map((solution, sIndex) => (
                      <li key={sIndex} className="text-sm text-gray-700">• {solution}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Supplements Table */}
        <Card className="mt-8 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">🌟 Top 5 Science-Backed Supplements</CardTitle>
            <p className="text-green-600">Caution: Consult your doctor before starting supplements!</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border border-gray-300 p-2 text-left">Supplement</th>
                    <th className="border border-gray-300 p-2 text-left">Dose</th>
                    <th className="border border-gray-300 p-2 text-left">Benefit</th>
                    <th className="border border-gray-300 p-2 text-left">Timing</th>
                  </tr>
                </thead>
                <tbody>
                  {supplements.map((supplement, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2 font-semibold">{supplement.name}</td>
                      <td className="border border-gray-300 p-2">{supplement.dose}</td>
                      <td className="border border-gray-300 p-2">{supplement.benefit}</td>
                      <td className="border border-gray-300 p-2">{supplement.timing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* App Integration */}
        <Card className="mt-8 border-indigo-200 bg-indigo-50">
          <CardHeader>
            <CardTitle className="text-indigo-800">📱 App Integration Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-2">Symptom Forecast</h4>
                <p className="text-sm text-indigo-700">"Based on your cycle, high bloating risk in 3 days → Start dandelion tea today!"</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-2">Custom Relief Plans</h4>
                <p className="text-sm text-indigo-700">Generate supplement checklists, set reminders for hydration/yoga</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-2">Community Support</h4>
                <p className="text-sm text-indigo-700">"Join our 'PMS Warriors' group for recipe swaps!"</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-2">Progress Tracking</h4>
                <p className="text-sm text-indigo-700">"Your PMS severity dropped 30% last cycle! Keep up the magnesium."</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lifestyle Checklist */}
        <Card className="mt-8 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              🌱 Lifestyle Overhaul Checklist
            </CardTitle>
            <p className="text-yellow-600">Do This 7 Days Before Period:</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="text-sm text-yellow-700">□ Reduce caffeine to 1 cup/day</li>
              <li className="text-sm text-yellow-700">□ Add 20-min daily walks</li>
              <li className="text-sm text-yellow-700">□ Start magnesium supplements</li>
              <li className="text-sm text-yellow-700">□ Prep healthy snacks (see recipes)</li>
              <li className="text-sm text-yellow-700">□ Schedule "me-time" for stress relief</li>
            </ul>
          </CardContent>
        </Card>

        {/* When to See Doctor */}
        <Card className="mt-8 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">🚨 When to See a Doctor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-3">Seek help if you experience:</p>
            <ul className="list-disc list-inside text-red-700 space-y-1">
              {whenToSeeDoctor.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagingPMS;
