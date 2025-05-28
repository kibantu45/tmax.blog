
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Thermometer, Target, X } from "lucide-react";

const FertilityAndOvulation = () => {
  const ovulationSigns = [
    {
      sign: "Cervical Mucus Changes",
      description: "Clear, stretchy 'egg white' (EWCM)",
      science: "Optimal for sperm survival",
      icon: "💧"
    },
    {
      sign: "Basal Body Temperature (BBT) Spike",
      description: "Dips slightly before ovulation, then rises 0.5-1°F",
      science: "Measure orally/vaginally before getting out of bed",
      icon: "🌡️"
    },
    {
      sign: "Ovulation Pain (Mittelschmerz)",
      description: "Mild one-sided pelvic ache (lasts mins-hours)",
      science: "Occurs 14 days before next period",
      icon: "⚡"
    },
    {
      sign: "Breast Tenderness",
      description: "Post-ovulation progesterone surge",
      science: "Hormonal response to ovulation",
      icon: "🤱"
    },
    {
      sign: "Libido Increase",
      description: "Evolutionary drive during peak fertility",
      science: "Nature's way of encouraging conception",
      icon: "💕"
    },
    {
      sign: "Cervical Position Changes",
      description: "High & Soft = Fertile (like lips), Low & Firm = Non-fertile (like nose)",
      science: "Cervix opens to allow sperm passage",
      icon: "🔍"
    },
    {
      sign: "LH Surge Detection",
      description: "Ovulation predictor kits (OPKs)",
      science: "Test line darker than control = positive",
      icon: "🧪"
    }
  ];

  const trackingMethods = [
    { method: "BBT Charting", accuracy: "80-90%", ease: "Medium", cost: "Low", bestFor: "Natural cycles" },
    { method: "OPK Strips", accuracy: "95%+", ease: "High", cost: "Low-Med", bestFor: "Predict ovulation" },
    { method: "Cervical Mucus", accuracy: "70-80%", ease: "Medium", cost: "Free", bestFor: "Body literacy" },
    { method: "Fertility Monitors", accuracy: "95%", ease: "High", cost: "High", bestFor: "Tech lovers" },
    { method: "App Algorithms", accuracy: "60-70%", ease: "Easy", cost: "Free", bestFor: "Initial guidance" }
  ];

  const fertilityMyths = [
    {
      myth: "You ovulate on Day 14",
      truth: "Only if you have 28-day cycles! Ranges from Day 10-21."
    },
    {
      myth: "You can't get pregnant during your period",
      truth: "Possible with early ovulation + long-lived sperm."
    },
    {
      myth: "Standing up after sex prevents pregnancy",
      truth: "Gravity doesn't affect sperm motility."
    }
  ];

  const fertilityTips = [
    {
      phase: "Pre-Ovulation",
      tips: [
        "Take prenatal vitamins (folic acid!)",
        "Eat antioxidant-rich foods (berries, nuts)",
        "Avoid alcohol/tobacco"
      ]
    },
    {
      phase: "During Fertile Window",
      tips: [
        "Have sex every 1-2 days",
        "Use sperm-friendly lubricants (e.g., Pre-Seed)"
      ]
    },
    {
      phase: "Post-Ovulation",
      tips: [
        "Avoid intense exercise",
        "Reduce caffeine"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50">
      <header className="bg-white/90 backdrop-blur-sm border-b border-pink-200 sticky top-0 z-50">
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
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              🌱 Fertility & Ovulation Explained: Know Your Window
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Concept */}
        <Card className="mb-8 border-pink-200 bg-pink-50">
          <CardHeader>
            <CardTitle className="text-pink-800">Key Concept</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              <strong>Ovulation</strong> = When an egg is released from your ovary. Your <strong>fertile window</strong> is the 5 days 
              <em>before</em> ovulation + day of ovulation (sperm can live 5 days!).
            </p>
          </CardContent>
        </Card>

        {/* 7 Physical Signs */}
        <Card className="mb-8 border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800">🔍 7 Physical Signs of Ovulation</CardTitle>
            <p className="text-orange-600">Track these in your app:</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ovulationSigns.map((sign, index) => (
                <Card key={index} className="border-orange-100 bg-orange-50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{sign.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-orange-800 mb-1">{sign.sign}</h4>
                        <p className="text-sm text-gray-600 mb-1"><strong>Looks/Feels like:</strong> {sign.description}</p>
                        <p className="text-sm text-orange-700"><strong>Science:</strong> {sign.science}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tracking Methods Comparison */}
        <Card className="mb-8 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">📊 Ovulation Tracking Methods Compared</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-300 p-2 text-left">Method</th>
                    <th className="border border-gray-300 p-2 text-left">Accuracy</th>
                    <th className="border border-gray-300 p-2 text-left">Ease</th>
                    <th className="border border-gray-300 p-2 text-left">Cost</th>
                    <th className="border border-gray-300 p-2 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {trackingMethods.map((method, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2 font-semibold">{method.method}</td>
                      <td className="border border-gray-300 p-2">{method.accuracy}</td>
                      <td className="border border-gray-300 p-2">{method.ease}</td>
                      <td className="border border-gray-300 p-2">{method.cost}</td>
                      <td className="border border-gray-300 p-2">{method.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-semibold">Pro Tip: Combine 2+ methods for best results!</p>
            </div>
          </CardContent>
        </Card>

        {/* Fertility Myths */}
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center">
              <X className="w-5 h-5 mr-2" />
              ❌ Fertility Myths Debunked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fertilityMyths.map((item, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-red-200">
                  <p className="text-red-700 mb-2">
                    <strong>Myth:</strong> "{item.myth}"
                  </p>
                  <p className="text-green-700">
                    <strong>Truth:</strong> {item.truth}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Boost Fertility Naturally */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">🌟 Boost Fertility Naturally</CardTitle>
            <p className="text-green-600">For those TTC (Trying To Conceive):</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {fertilityTips.map((section, index) => (
                <Card key={index} className="border-green-100 bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-800">{section.phase}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {section.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-sm text-gray-700">• {tip}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* In-App Features */}
        <Card className="mb-8 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-purple-800">📱 In-App Fertility Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Predictive Algorithm</h4>
                <p className="text-sm text-purple-700">"Based on 3 cycles, your next fertile window: June 12-17"</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">LH Test Tracker</h4>
                <p className="text-sm text-purple-700">Scan OPK strips with phone camera & auto-log results</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">BBT Integration</h4>
                <p className="text-sm text-purple-700">Sync with Bluetooth thermometers & detect temp shifts instantly</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Conception Tips</h4>
                <p className="text-sm text-purple-700">"Today = High Fertility → Try positions for deeper sperm deposit"</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* When to Seek Help */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">🚨 When to Seek Help</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-3">Consult a doctor if:</p>
            <ul className="list-disc list-inside text-red-700 space-y-1">
              <li>Under 35: No pregnancy after 1 year of trying</li>
              <li>Over 35: No pregnancy after 6 months</li>
              <li>Irregular cycles (&gt;35 days or &lt;21 days)</li>
              <li>Known conditions: PCOS, endometriosis, etc.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FertilityAndOvulation;
