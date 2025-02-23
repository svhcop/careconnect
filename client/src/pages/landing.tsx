import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { FaUserMd, FaCalendarAlt, FaLock } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { BRAND } from "@/lib/constants";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const features = [
  {
    icon: <FaUserMd className="w-8 h-8 text-blue-600" />,
    title: "Expert Healthcare Providers",
    description: "Connect with qualified doctors and specialists in various medical fields"
  },
  {
    icon: <FaCalendarAlt className="w-8 h-8 text-blue-600" />,
    title: "Easy Scheduling",
    description: "Book and manage appointments with just a few clicks"
  },
  {
    icon: <FaLock className="w-8 h-8 text-blue-600" />,
    title: "Secure & Private",
    description: "Your health data is protected with enterprise-grade security"
  },
  {
    icon: <MdHealthAndSafety className="w-8 h-8 text-blue-600" />,
    title: "Comprehensive Care",
    description: "Access a full range of healthcare services in one platform"
  }
];

export function LandingPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="flex justify-end container mx-auto px-4 py-6">
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => setLocation("/signin")}>
            Sign In
          </Button>
          <Button onClick={() => setLocation("/signup")}>
            Get Started
          </Button>
        </div>
      </div>

      <main className="pt-24">
        {/* Hero Section */}
        <motion.section 
          className="container mx-auto px-4 py-16 text-center"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
            Healthcare Made <span className="text-blue-600">Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with healthcare providers, manage appointments, and take control 
            of your health journey - all in one secure platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setLocation("/signup")}
            >
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setLocation("/learn-more")}
            >
              Learn More
            </Button>
          </div>
        </motion.section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section 
          className="container mx-auto px-4 py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-blue-600 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Join thousands of users who trust CareConnect for their healthcare needs
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setLocation("/signup")}
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Create Free Account
            </Button>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-50 py-12 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <div className="flex items-center space-x-2 text-center">
              <MdHealthAndSafety className="w-6 h-6 text-blue-600" />
              <span className="text-sm text-gray-600">© 2025 CareConnect. All rights reserved.</span>
            </div>
            <div className="flex gap-2">
              <Button variant="link" onClick={() => setLocation("/privacy-policy")}>
                Privacy Policy
              </Button>
              <Button variant="link" onClick={() => setLocation("/terms-of-service")}>
                Terms of Service
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}