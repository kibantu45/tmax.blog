
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, Droplets, Heart, Coffee, Pill, Lightbulb } from "lucide-react";

const ManagingPMS = () => {
  const symptoms = [
    {
      title: "Mood Swings & Irritability",
      icon: "😤",
      cause: "Serotonin drops as estrogen fluctuates",
      solutions: [
        "Food Rx: Dark chocolate (70%+), salmon, flaxseeds → Boost serotonin",
        "Supplement: 50mg Vitamin B6 daily (regulates neurotransmitters)",
        "Movement: 30-min brisk walk → Releases endorphins",
        "Mind Hack: '5-4-3-2-1' grounding technique during meltdowns"
      ],
      color: "border-red-200 bg-red-50"
    },
    {
      title: "Bloating & Water Retention",
      icon: "🎈",
      cause: "Progesterone slows digestion + aldosterone spikes",
      solutions: [
        "Food Rx: Dandelion tea, cucumber, asparagus → Natural diuretics",
        "Avoid: Salt, processed foods, carbonated drinks",
        "Massage: Gentle clockwise abdominal circles with ginger oil",
        "Pose: Legs-up-the-wall (10 mins daily) → Drains fluid"
      ],
      color: "border-blue-200 bg-blue-50"
    },
    {
      title: "Cramps (Dysmenorrhea)",
      icon: "⚡",
      cause: "Prostaglandins trigger uterine contractions",
      solutions: [
        "Heat Therapy: Heating pad at 104°F (40°C) for 20 mins → 47% pain reduction",
        "Food Rx: Ginger tea (1 tbsp grated ginger) → Anti-prostaglandin",
        "Pressure Point: Massage SP6 point (4 finger-widths above inner ankle)",
        "Supplement: 300mg Magnesium glycinate at bedtime"
      ],
      color: "border-orange-200 bg-orange-50"
    },
    {
      title: "Fatigue & Low Energy",
      icon: "😴",
      cause: "Progesterone surge → Core temp ↑ → Disrupted sleep",
      solutions: [
        "Sleep Hack: Cool room (65°F/18°C) + weighted blanket",
        "Food Rx: Iron-rich spinach + vitamin C bell peppers → Combat anemia",
        "Power Nap: 20 mins max (prevents sleep inertia)",
        "Adaptogen: Rhodiola rosea (200mg) → Fights fatigue"
      ],
      color: "border-purple-200 bg-purple-50"
    },
    {
      title: "Food Cravings",
      icon: "🍫",
      cause: "Serotonin drop → Body seeks quick sugar high",
      solutions: [
        "Chocolate Fix: Swap milk chocolate for 85% dark + almond butter",
        "Salty Craving: Roasted seaweed snacks instead of chips",
        "Sweet Tooth: Frozen blueberries with coconut cream",
        "Preventative: Protein-rich breakfast (eggs, Greek yogurt) → Stabilizes blood sugar"
      ],
      color: "border-yellow-200 bg-yellow-50"
    },
    {
      title: "Breakouts & Skin Changes",
      icon: "🔴",
      cause: "Progesterone → Sebum overproduction",
      solutions: [
        "Topical: Tea tree oil spot treatment (diluted!)",
        "Food Rx: Zinc-rich pumpkin seeds → Reduces inflammation",
        "Hygiene: Change pillowcases 2x/week",
        "Mask: Honey + turmeric clay (anti-bacterial)"
      ],
      color: "border-green-200 bg-green-50"
    }
  ];

  const supplements = [
    { name: "Magnesium", dose: "300-400mg", benefit: "Relieves cramps, anxiety", timing: "Nightly" },
    { name: "Vitamin B6", dose: "50-100mg", benefit: "Reduces mood swings", timing: "Morning" },
    { name: "Chasteberry (Vitex)", dose: "400mg", benefit: "Balances hormones", timing: "3+ months" },
    { name: "Omega-3s", dose: "1000mg EPA/DHA", benefit: "Lowers inflammation", timing: "With food" },
    { name: "Calcium", dose: "1200mg", benefit: "Decreases bloating/cravings", timing: "Split doses" }
  ];

  const lifestyleChecklist = [
    "Reduce caffeine to 1 cup/day",
    "Add 20-min daily walks",
    "Start magnesium supplements",
    "Prep healthy snacks (see recipes)",
    "Schedule 'me-time' for stress relief"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
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
        {/* Introduction */}
        <Card className="mb-8 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-purple-800">Did You Know?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              85% of menstruators experience PMS symptoms. Blame hormonal shifts (estrogen/progesterone rollercoasters!), 
              but know this: <strong className="text-purple-800">Natural solutions can reduce symptoms by 40-60%.</strong>
            </p>
          </CardContent>
        </Card>

        {/* Symptom-Specific Relief */}
        <Card className="mb-8 border-pink-200">
          <CardHeader>
            <CardTitle className="text-pink-800">🎯 Symptom-Specific Relief Strategies</CardTitle>
            <p className="text-pink-600">Log symptoms in-app → Get personalized tips!</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {symptoms.map((symptom, index) => (
                <Card key={index} className={`${symptom.color} border-2`}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{symptom.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{symptom.title}</CardTitle>
                        <p className="text-sm text-gray-600"><strong>Why:</strong> {symptom.cause}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Solutions:</h4>
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
          </CardContent>
        </Card>

        {/* Science-Backed Supplements */}
        <Card className="mb-8 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Pill className="w-5 h-5 mr-2" />
              🌟 Top 5 Science-Backed Supplements
            </CardTitle>
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
            <div className="mt-4 p-3 bg-yellow-100 rounded-lg border border-yellow-300">
              <p className="text-yellow-800 font-semibold">⚠️ Caution: Consult your doctor before starting supplements!</p>
            </div>
          </CardContent>
        </Card>

        {/* In-App PMS Manager */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">📱 In-App PMS Manager Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Symptom Forecast</h4>
                <p className="text-sm text-blue-700">"Based on your cycle, high bloating risk in 3 days → Start dandelion tea today!"</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Custom Relief Plans</h4>
                <p className="text-sm text-blue-700">Generate supplement checklists & set reminders for hydration/yoga</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Community Support</h4>
                <p className="text-sm text-blue-700">"Join our 'PMS Warriors' group for recipe swaps!"</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lifestyle Overhaul */}
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2" />
              🌱 Lifestyle Overhaul Checklist
            </CardTitle>
            <p className="text-orange-600">Do This 7 Days Before Period:</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lifestyleChecklist.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input type="checkbox" className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* When to See Doctor */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">🚨 When to See a Doctor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-3">Seek help if you experience:</p>
            <ul className="list-disc list-inside text-red-700 space-y-1">
              <li><strong>PMDD:</strong> Severe depression/suicidal thoughts</li>
              <li>Debilitating pain (can't leave bed)</li>
              <li>Migraines with aura</li>
              <li>Symptoms lasting >2 weeks/month</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagingPMS;
