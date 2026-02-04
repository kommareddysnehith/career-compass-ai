import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Palette,
  Code,
  TrendingUp,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  MessageSquare,
  Clock,
  Target,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CareerCard } from "@/components/ui/CareerCard";
import { StatCard } from "@/components/ui/StatCard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Button } from "@/components/ui/button";

const careerMatches = [
  {
    id: 1,
    title: "UX Designer",
    matchPercentage: 92,
    salary: "$95K",
    growth: "+22%",
    education: "Bachelor's",
    icon: <Palette className="h-6 w-6 text-primary-foreground" />,
    skills: [
      { name: "User Research", match: 95 },
      { name: "Prototyping", match: 88 },
      { name: "Visual Design", match: 85 },
    ],
  },
  {
    id: 2,
    title: "Product Manager",
    matchPercentage: 87,
    salary: "$115K",
    growth: "+18%",
    education: "Bachelor's",
    icon: <Briefcase className="h-6 w-6 text-primary-foreground" />,
    skills: [
      { name: "Strategy", match: 92 },
      { name: "Communication", match: 90 },
      { name: "Analytics", match: 82 },
    ],
  },
  {
    id: 3,
    title: "Data Analyst",
    matchPercentage: 85,
    salary: "$85K",
    growth: "+25%",
    education: "Bachelor's",
    icon: <BarChart3 className="h-6 w-6 text-primary-foreground" />,
    skills: [
      { name: "SQL", match: 88 },
      { name: "Data Viz", match: 85 },
      { name: "Python", match: 75 },
    ],
  },
];

const recentActivity = [
  { text: "Updated your education details", time: "Yesterday" },
  { text: "Saved Software Engineer career", time: "2 days ago" },
  { text: "Completed interest assessment", time: "1 week ago" },
];

const nextSteps = [
  { text: "Complete detailed skill assessment", completed: false },
  { text: "Explore certification requirements", completed: false },
  { text: "Connect with industry mentors", completed: false },
];

const Dashboard = () => {
  const [savedCareers, setSavedCareers] = useState<number[]>([1]);

  const toggleSave = (id: number) => {
    setSavedCareers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn={true} />
      <main className="flex-1">
        {/* Welcome Banner */}
        <section className="border-b border-border bg-gradient-to-r from-primary/5 via-secondary/5 to-success/5">
          <div className="container px-4 md:px-6 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Welcome back, <span className="gradient-text">John!</span>
                </h1>
                <p className="text-muted-foreground">
                  "The only way to do great work is to love what you do." – Steve Jobs
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center px-4 py-2 rounded-xl bg-card border border-border">
                  <p className="text-2xl font-bold text-primary">65%</p>
                  <p className="text-xs text-muted-foreground">Profile Complete</p>
                </div>
                <div className="text-center px-4 py-2 rounded-xl bg-card border border-border">
                  <p className="text-2xl font-bold text-secondary">5</p>
                  <p className="text-xs text-muted-foreground">Career Matches</p>
                </div>
                <div className="text-center px-4 py-2 rounded-xl bg-card border border-border">
                  <p className="text-2xl font-bold text-success">3</p>
                  <p className="text-xs text-muted-foreground">Roadmaps</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Dashboard Content */}
        <section className="container px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Stats */}
            <div className="lg:col-span-3 space-y-6">
              <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <StatCard icon={Users} label="Profile Views" value="24" change="+12%" trend="up" />
                  <StatCard icon={Target} label="Career Matches" value="5" />
                  <StatCard icon={MessageSquare} label="Questions Asked" value="12" />
                  <StatCard icon={Sparkles} label="Skills to Develop" value="3" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Profile Progress</h3>
                <div className="flex justify-center mb-4">
                  <ProgressRing progress={65} size={140} label="Complete" variant="primary" />
                </div>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Complete your profile to get better career matches
                </p>
                <Button variant="gradient" className="w-full" asChild>
                  <Link to="/profile">Complete Profile</Link>
                </Button>
              </div>
            </div>

            {/* Middle Column - Career Matches */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Your Top Career Matches</h2>
                <Button variant="ghost" asChild>
                  <Link to="/careers" className="flex items-center gap-2">
                    View All <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {careerMatches.map((career) => (
                  <CareerCard
                    key={career.id}
                    {...career}
                    isSaved={savedCareers.includes(career.id)}
                    onSave={() => toggleSave(career.id)}
                    onViewDetails={() => {}}
                  />
                ))}
              </div>

              {/* Recommended Next Steps */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Recommended Next Steps</h3>
                <div className="space-y-3">
                  {nextSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    >
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${step.completed ? "bg-success/10" : "bg-primary/10"}`}>
                        {step.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : (
                          <span className="text-sm font-semibold text-primary">{index + 1}</span>
                        )}
                      </div>
                      <span className={`text-sm ${step.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
                        {step.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Activity & Actions */}
            <div className="lg:col-span-3 space-y-6">
              <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-foreground">{activity.text}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/profile">
                      <Users className="h-4 w-4 mr-2" />
                      Update Profile
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Sparkles className="h-4 w-4 mr-2" />
                    New Recommendations
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/roadmap">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Build Roadmap
                    </Link>
                  </Button>
                  <Button variant="gradient" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat with AI Coach
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Dashboard;
