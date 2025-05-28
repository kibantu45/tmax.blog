
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Star, Heart, Moon, ArrowLeft } from "lucide-react";

const MenstrualCycle = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-red-50">
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
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Understanding Your Menstrual Cycle
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The Four Phases of Your Cycle</h2>
          <p className="text-lg text-gray-600">
            Your menstrual cycle isn't just about your period! It's a complex monthly journey with four distinct phases, 
            each governed by hormones that impact your energy, mood, and body. Understanding them helps you harness your natural rhythms.
          </p>
        </div>

        <div className="space-y-8">
          {/* Phase 1: Menstrual */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                  <Droplets className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-red-800">Phase 1: Menstrual Phase (Days 1-5)</CardTitle>
                  <p className="text-red-600">Your body's natural "reset" phase</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-red-800 mb-2">What happens:</h4>
                <p className="text-gray-700">
                  Your uterus sheds its lining, resulting in period flow (blood and tissue). Estrogen and progesterone are at their lowest.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-800 mb-2">Your body may feel:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Cramps or lower back pain</li>
                  <li>Fatigue or low energy</li>
                  <li>Possible headaches or breast tenderness</li>
                </ul>
              </div>
              <div className="bg-red-100 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Self-care tip:</h4>
                <p className="text-red-700">Rest, hydrate, and try gentle yoga. This is your body's natural "reset" phase.</p>
              </div>
            </CardContent>
          </Card>

          {/* Phase 2: Follicular */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-green-800">Phase 2: Follicular Phase (Days 6-14)</CardTitle>
                  <p className="text-green-600">Rising energy and motivation</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-800 mb-2">What happens:</h4>
                <p className="text-gray-700">
                  Your pituitary gland releases FSH (follicle-stimulating hormone), prompting follicles to mature an egg. Estrogen rises steadily.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Your body may feel:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Rising energy and motivation</li>
                  <li>Improved mood and mental clarity</li>
                  <li>Higher pain tolerance</li>
                </ul>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Self-care tip:</h4>
                <p className="text-green-700">Ideal for trying new workouts or tackling big projects!</p>
              </div>
            </CardContent>
          </Card>

          {/* Phase 3: Ovulation */}
          <Card className="border-pink-200 bg-pink-50">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-pink-800">Phase 3: Ovulation Phase (~Day 14)</CardTitle>
                  <p className="text-pink-600">Your fertile window</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-pink-800 mb-2">What happens:</h4>
                <p className="text-gray-700">
                  A surge in LH (luteinizing hormone) releases an egg from the ovary. Estrogen peaks.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-pink-800 mb-2">Your body may notice:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Clear, stretchy cervical mucus (like egg whites)</li>
                  <li>Increased libido</li>
                  <li>Mild ovulation pain ("mittelschmerz")</li>
                </ul>
              </div>
              <div className="bg-pink-100 p-4 rounded-lg">
                <h4 className="font-semibold text-pink-800 mb-2">Key fact:</h4>
                <p className="text-pink-700">This is your fertile window! Lasts 12-24 hours.</p>
              </div>
            </CardContent>
          </Card>

          {/* Phase 4: Luteal */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                  <Moon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-purple-800">Phase 4: Luteal Phase (Days 15-28)</CardTitle>
                  <p className="text-purple-600">Pre-menstrual phase</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-purple-800 mb-2">What happens:</h4>
                <p className="text-gray-700">
                  The ruptured follicle becomes the corpus luteum, releasing progesterone to thicken the uterine lining.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-800 mb-2">Your body may experience:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>PMS symptoms (bloating, mood swings)</li>
                  <li>Breast tenderness</li>
                  <li>Cravings or hunger spikes</li>
                </ul>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Science insight:</h4>
                <p className="text-purple-700">Progesterone rises → core body temperature increases slightly.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hormone Chart */}
        <Card className="mt-8 border-gray-200">
          <CardHeader>
            <CardTitle>Hormone Cheat Sheet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Hormone</th>
                    <th className="border border-gray-300 p-2 text-left">Role</th>
                    <th className="border border-gray-300 p-2 text-left">High-Phase</th>
                    <th className="border border-gray-300 p-2 text-left">Low-Phase</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold">Estrogen</td>
                    <td className="border border-gray-300 p-2">Builds uterine lining</td>
                    <td className="border border-gray-300 p-2">Ovulation</td>
                    <td className="border border-gray-300 p-2">Menstrual</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold">Progesterone</td>
                    <td className="border border-gray-300 p-2">Maintains lining</td>
                    <td className="border border-gray-300 p-2">Luteal</td>
                    <td className="border border-gray-300 p-2">Follicular</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold">LH/FSH</td>
                    <td className="border border-gray-300 p-2">Trigger ovulation</td>
                    <td className="border border-gray-300 p-2">Ovulation</td>
                    <td className="border border-gray-300 p-2">Luteal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Myth Buster */}
        <Card className="mt-8 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800">Myth Buster</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-yellow-700">
                <span className="text-red-600 font-semibold">❌ "Period blood is 'dirty' blood"</span> → 
                <span className="text-green-600 font-semibold"> ✅ It's nutrient-rich tissue, not waste!</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* When to see doctor */}
        <Card className="mt-8 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">When to consult a doctor:</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-red-700 space-y-1">
              <li>Cycles shorter than 21 days/longer than 35 days</li>
              <li>Severe pain preventing daily activities</li>
              <li>No period for 90+ days (non-pregnant)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MenstrualCycle;
