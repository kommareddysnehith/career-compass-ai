import { Target, Map, Bot, Lightbulb, Users, TrendingUp } from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";

const features = [
  {
    icon: <Target className="h-6 w-6 text-primary-foreground" />,
    title: "Personalized Recommendations",
    description:
      "Get 3-5 career matches based on your unique skills, interests, and preferences. Our AI analyzes your profile to find the perfect fit.",
  },
  {
    icon: <Map className="h-6 w-6 text-primary-foreground" />,
    title: "Interactive Roadmaps",
    description:
      "Step-by-step guidance with milestones, resources, and timelines. Track your progress and stay motivated on your journey.",
  },
  {
    icon: <Bot className="h-6 w-6 text-primary-foreground" />,
    title: "AI Career Coach",
    description:
      "24/7 chatbot support for all your career questions. Get instant answers, personalized advice, and encouragement whenever you need it.",
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-primary-foreground" />,
    title: "Skill Assessment",
    description:
      "Discover your strengths and areas for growth with our comprehensive skill evaluation. Know exactly what to focus on.",
  },
  {
    icon: <Users className="h-6 w-6 text-primary-foreground" />,
    title: "Mentor Network",
    description:
      "Connect with industry professionals who've walked the path before. Get real insights and valuable connections.",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-primary-foreground" />,
    title: "Market Insights",
    description:
      "Stay informed with real-time salary data, job trends, and industry forecasts. Make decisions backed by data.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Navigate Your Career</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our comprehensive platform combines AI technology with human insights
            to guide you every step of the way.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
