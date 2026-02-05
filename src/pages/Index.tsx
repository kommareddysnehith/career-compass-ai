import { useState, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PreviewBanner } from "@/components/layout/PreviewBanner";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import { GuidedTour } from "@/components/onboarding/GuidedTour";
import { Link } from "react-router-dom";

const Index = () => {
  const [isTourActive, setIsTourActive] = useState(false);

  const handleStartTour = useCallback(() => {
    setIsTourActive(true);
  }, []);

  const handleSkipOnboarding = useCallback(() => {
    // User skipped, do nothing special
  }, []);

  const handleTourComplete = useCallback(() => {
    setIsTourActive(false);
  }, []);

  const handleRestartTour = useCallback(() => {
    localStorage.removeItem("voca_onboarding_seen");
    setIsTourActive(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <PreviewBanner />
      <Header isLoggedIn={false} onRestartTour={handleRestartTour} />
      <main className="flex-1">
        <HeroSection />
        <div data-tour="features">
          <FeaturesSection />
        </div>
        <TestimonialsSection />
        
        {/* CTA Section */}
        <section className="py-24 gradient-hero-bg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:24px_24px]" />
          <div className="container relative z-10 px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl mb-4">
              Ready to Find Your Dream Career?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join 50,000+ people who've discovered their ideal career path. Start your free assessment today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-xl bg-primary-foreground text-primary font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Start Free Assessment
              </Link>
              <Link
                to="#"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl border-2 border-primary-foreground/50 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-all"
              >
                Talk to an Advisor
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <div data-tour="chat-widget">
        <ChatWidget />
      </div>

      {/* Onboarding */}
      <OnboardingModal onStartTour={handleStartTour} onSkip={handleSkipOnboarding} />
      <GuidedTour isActive={isTourActive} onComplete={handleTourComplete} />
    </div>
  );
};

export default Index;
