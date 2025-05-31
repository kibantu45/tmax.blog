
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";

const Terms = () => {
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
                <h1 className="text-3xl font-bold text-green-700">Terms of Use</h1>
                <p className="text-green-600 mt-2">Tmax Platform Terms and Conditions</p>
              </div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
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
              <h2 className="text-xl font-semibold text-green-800 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Tmax platform, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-green-800 mb-3">2. Service Description</h2>
              <p>
                Tmax is a platform that connects university students with various campus services including 
                but not limited to groceries, food delivery, laundry services, accommodation, and other student needs.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-green-800 mb-3">3. User Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and current information when creating an account</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use the platform in compliance with all applicable laws and regulations</li>
                <li>Respect other users and service providers on the platform</li>
                <li>Not engage in fraudulent or harmful activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-green-800 mb-3">4. Service Availability</h2>
              <p>
                While we strive to maintain continuous service availability, Tmax reserves the right to 
                modify, suspend, or discontinue services at any time without prior notice. We are not liable 
                for any interruption of services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-green-800 mb-3">5. Payment and Refunds</h2>
              <p>
                Payment terms are specific to each service provider. Refund policies may vary by service. 
                Tmax acts as a platform facilitator and is not directly responsible for payment disputes 
                between users and service providers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-green-800 mb-3">6. Limitation of Liability</h2>
              <p>
                Tmax shall not be liable for any indirect, incidental, special, consequential, or punitive 
                damages resulting from your use of the platform or any services obtained through the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-green-800 mb-3">7. Privacy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy to understand how we 
                collect, use, and protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-green-800 mb-3">8. Contact Information</h2>
              <p>
                For questions about these Terms of Use, please contact us at:
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

export default Terms;
