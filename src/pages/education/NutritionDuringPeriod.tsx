
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Ban } from "lucide-react";

const NutritionDuringPeriod = () => {
  const superfoods = [
    {
      name: "Dark Chocolate (70%+ cocoa)",
      emoji: "🍫",
      benefit: "Magnesium relaxes uterine muscles + boosts serotonin",
      serving: "1-2 squares daily",
      color: "border-yellow-500 bg-yellow-50"
    },
    {
      name: "Salmon",
      emoji: "🐟",
      benefit: "Omega-3s reduce prostaglandins (cramp-causing compounds)",
      serving: "Baked with lemon/herbs 3x/week",
      color: "border-blue-500 bg-blue-50"
    },
    {
      name: "Spinach",
      emoji: "🥬",
      benefit: "Replenishes iron lost in blood + vitamin C for absorption",
      serving: "Sautéed with garlic or in smoothies",
      color: "border-green-500 bg-green-50"
    },
    {
      name: "Ginger Tea",
      emoji: "🫖",
      benefit: "75% as effective as ibuprofen for pain relief (NIH study)",
      serving: "Fresh grated ginger + honey 2x/day",
      color: "border-orange-500 bg-orange-50"
    },
    {
      name: "Pumpkin Seeds",
      emoji: "🎃",
      benefit: "Zinc reduces period acne + magnesium prevents bloating",
      serving: "Handful as snack or on oatmeal",
      color: "border-yellow-600 bg-yellow-50"
    },
    {
      name: "Bananas",
      emoji: "🍌",
      benefit: "Potassium counters salt-induced bloating + B6 lifts mood",
      serving: "With almond butter or in frozen 'nice cream'",
      color: "border-yellow-400 bg-yellow-50"
    },
    {
      name: "Turmeric Golden Milk",
      emoji: "🥛",
      benefit: "Curcumin is a potent anti-inflammatory",
      serving: "Almond milk + 1 tsp turmeric + pinch black pepper",
      color: "border-orange-400 bg-orange-50"
    }
  ];

  const avoidFoods = [
    { name: "Salty snacks", effect: "Increase water retention → bloating", emoji: "🍟" },
    { name: "Caffeine", effect: "Worsens breast tenderness & anxiety", emoji: "☕" },
    { name: "Sugary treats", effect: "Causes energy crashes → mood swings", emoji: "🍩" },
    { name: "Red meat", effect: "High in prostaglandins → stronger cramps", emoji: "🥩" }
  ];

  const mealPlan = [
    {
      day: "Day 1 (Heavy Flow)",
      meals: {
        breakfast: "Oatmeal with pumpkin seeds + banana",
        lunch: "Spinach salad with salmon + olive oil dressing",
        snack: "Dark chocolate + orange slices (vitamin C boosts iron!)",
        dinner: "Lentil soup + turmeric roasted sweet potatoes"
      }
    },
    {
      day: "Day 2 (Cramp Relief Focus)",
      meals: {
        breakfast: "Ginger-spiced smoothie (kale, pineapple, almond milk)",
        lunch: "Quinoa bowl with chickpeas + avocado",
        snack: "Magnesium-rich trail mix (almonds, cashews, dark choc chips)",
        dinner: "Tofu stir-fry with broccoli + sesame seeds"
      }
    },
    {
      day: "Day 3 (Energy Replenishment)",
      meals: {
        breakfast: "Scrambled eggs with spinach + whole-grain toast",
        lunch: "Leftover stir-fry + side of kimchi (probiotics)",
        snack: "Banana with peanut butter",
        dinner: "Baked chicken + roasted beets (iron-rich)"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <header className="bg-white/90 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
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
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              🥗 Nutrition During Your Period: Foods That Heal
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <Card className="mb-8 border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800">Introduction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              What you eat during menstruation can significantly reduce cramps, fatigue, and mood swings. 
              Focus on these science-backed nutrients:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-green-100 rounded-lg">
                <div className="text-2xl mb-1">Mg</div>
                <div className="text-sm font-semibold text-green-800">Magnesium</div>
                <div className="text-xs text-green-600">muscle relaxant</div>
              </div>
              <div className="text-center p-3 bg-blue-100 rounded-lg">
                <div className="text-2xl mb-1">🐟</div>
                <div className="text-sm font-semibold text-blue-800">Omega-3s</div>
                <div className="text-xs text-blue-600">inflammation fighter</div>
              </div>
              <div className="text-center p-3 bg-red-100 rounded-lg">
                <div className="text-2xl mb-1">Fe</div>
                <div className="text-sm font-semibold text-red-800">Iron</div>
                <div className="text-xs text-red-600">energy booster</div>
              </div>
              <div className="text-center p-3 bg-yellow-100 rounded-lg">
                <div className="text-2xl mb-1">B6</div>
                <div className="text-sm font-semibold text-yellow-800">Vitamin B6</div>
                <div className="text-xs text-yellow-600">mood regulator</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top 7 Period Superfoods */}
        <Card className="mb-8 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">🌟 Top 7 Period-Superfoods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {superfoods.map((food, index) => (
                <Card key={index} className={`${food.color} border-2`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-3xl">{food.emoji}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">{food.name}</h4>
                        <p className="text-sm text-gray-600 mb-2"><strong>Why:</strong> {food.benefit}</p>
                        <p className="text-sm text-gray-700"><strong>How:</strong> {food.serving}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Foods to Avoid */}
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center">
              <Ban className="w-5 h-5 mr-2" />
              🚫 Foods to Avoid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {avoidFoods.map((food, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-red-200">
                  <div className="text-2xl opacity-50">{food.emoji}</div>
                  <div>
                    <h4 className="font-semibold text-red-800">{food.name}</h4>
                    <p className="text-sm text-red-600">{food.effect}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 3-Day Sample Meal Plan */}
        <Card className="mb-8 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800">📅 3-Day Sample Meal Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mealPlan.map((day, index) => (
                <Card key={index} className="border-purple-100 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-800">{day.day}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm"><strong>Breakfast:</strong> {day.meals.breakfast}</p>
                        <p className="text-sm mt-2"><strong>Lunch:</strong> {day.meals.lunch}</p>
                      </div>
                      <div>
                        <p className="text-sm"><strong>Snack:</strong> {day.meals.snack}</p>
                        <p className="text-sm mt-2"><strong>Dinner:</strong> {day.meals.dinner}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* In-App Features */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">📱 In-App Feature Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg">
                <h4 className="font-semibold text-blue-800">Symptom Tracker Link:</h4>
                <p className="text-blue-700">"Log cramps → get instant food recommendations!"</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <h4 className="font-semibold text-blue-800">Grocery List Generator:</h4>
                <p className="text-blue-700">"Tap to add period superfoods to your shopping list"</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <h4 className="font-semibold text-blue-800">Reminder Setting:</h4>
                <p className="text-blue-700">"Notify me 3 days before period to meal prep"</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <Card className="border-gray-200 bg-gray-50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600 italic">
              "Always consult your doctor about dietary changes. These tips don't replace medical advice."
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NutritionDuringPeriod;
