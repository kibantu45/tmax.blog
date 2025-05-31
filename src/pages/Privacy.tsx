
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-green-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button onClick={() => window.location.href = "/"} variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5 text-green-700" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-green-700">Privacy Policy</h1>
                <p className="text-green-600 mt-2">How we protect and handle your information</p>
              </div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="bg-white/90 border-green-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-green-800 text-xl">Last Updated: December 2024</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-green-700">
            <section>
              <h2 className="text-xl font-semibold text-green-800 mb-3">1. Information We Collect</h2>
              <div className="space-y-2">
                <h3 className="font-semibold">Personal Information:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name, email address, and phone number</li>
                  <li>University student ID and academic information</li>
                  <li>Delivery addresses and location data</li>
                  <li>Payment information (processed securely through third parties)</li>
                </ul>
                <h3 className="font-semibold mt-4">Usage Information:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>App usage patterns and preferences</li>
                  <li>Device information and IP address</li>
                  <li>Service interaction history</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-green-800 mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve our platform services</li>
                <li>Process orders and facilitate service delivery</li>
                <li>Send notifications about orders, offers, and platform updates</li>
                <li>Ensure platform security and prevent fraud</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Communicate with you about our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-green-800 mb-3">3. Information Sharing</h2>
              <p className="mb-3">We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> To fulfill your orders and requests</li>
                <li><strong>Payment Processors:</strong> To handle financial transactions securely</li>
                <li><strong>Analytics Partners:</strong> To improve our services (anonymized data only)</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
              </ul>
              <p className="mt-3">We do not sell your personal information to third parties.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-green-800 mb-3">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. However, 
                no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-green-800 mb-3">5. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and review your personal information</li>
                <li>Correct inaccurate or outdated information</li>
                <li>Request deletion of your account and data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability where applicable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-green-800 mb-3">6. Push Notifications</h2>
              <p>
                We may send push notifications about orders, special offers, campus updates, and trending 
                content. You can disable these notifications in your device settings or app preferences at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-green-800 mb-3">7. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your experience, analyze platform usage, 
                and provide personalized content. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-green-800 mb-3">8. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services and 
                comply with legal obligations. Inactive accounts may be deleted after a reasonable period.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-green-800 mb-3">9. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact us:
                <br />
                Email: tmax@gmail.com
                <br />
                Phone: +254741297209
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
