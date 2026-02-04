import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    quote:
      "CareerCompass AI completely transformed my career trajectory. The personalized recommendations were spot-on, and I landed my dream job as a UX Designer within 6 months!",
    name: "Sarah Johnson",
    role: "UX Designer at Google",
    avatar: "/placeholder.svg",
    initials: "SJ",
  },
  {
    id: 2,
    quote:
      "The AI coach helped me identify skills I didn't even know I had. The roadmap feature kept me focused and motivated throughout my transition from teaching to product management.",
    name: "Michael Chen",
    role: "Product Manager at Stripe",
    avatar: "/placeholder.svg",
    initials: "MC",
  },
  {
    id: 3,
    quote:
      "As a recent graduate, I was overwhelmed with choices. CareerCompass AI gave me clarity and confidence. The career matching was incredibly accurate!",
    name: "Emily Rodriguez",
    role: "Data Analyst at Netflix",
    avatar: "/placeholder.svg",
    initials: "ER",
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Success Stories from{" "}
            <span className="gradient-text">Real People</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands who have found their dream careers with our help.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-3xl bg-card border border-border shadow-xl p-8 md:p-12">
            <Quote className="h-12 w-12 text-primary/20 mb-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-8">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-primary/20">
                    <AvatarImage src={testimonials[currentIndex].avatar} />
                    <AvatarFallback className="gradient-bg text-primary-foreground font-semibold">
                      {testimonials[currentIndex].initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoPlay(false);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 gradient-bg"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
