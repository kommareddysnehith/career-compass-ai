import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  ChevronRight,
  CheckCircle2,
  Circle,
  Calendar,
  BookOpen,
  Briefcase,
  Users,
  FileText,
  Download,
  Share2,
  Bell,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { cn } from "@/lib/utils";

interface Milestone {
  id: number;
  title: string;
  description: string;
  month: string;
  tasks: { id: number; text: string; completed: boolean }[];
  resources: string[];
  icon: React.ElementType;
}

const milestones: Milestone[] = [
  {
    id: 1,
    title: "Foundation Building",
    description: "Complete foundational courses and build core skills",
    month: "Month 1-2",
    icon: BookOpen,
    tasks: [
      { id: 1, text: "Complete UX Design Fundamentals course", completed: true },
      { id: 2, text: "Learn Figma basics", completed: true },
      { id: 3, text: "Study user research methods", completed: false },
    ],
    resources: ["Coursera UX Design Course", "Figma Academy", "Nielsen Norman Group Articles"],
  },
  {
    id: 2,
    title: "Portfolio Projects",
    description: "Build real-world projects to showcase your skills",
    month: "Month 3-4",
    icon: FileText,
    tasks: [
      { id: 4, text: "Create mobile app redesign project", completed: false },
      { id: 5, text: "Complete case study write-up", completed: false },
      { id: 6, text: "Build responsive web design", completed: false },
    ],
    resources: ["Dribbble for inspiration", "Case Study Templates", "Portfolio Website Guide"],
  },
  {
    id: 3,
    title: "Network & Learn",
    description: "Connect with industry professionals",
    month: "Month 5-6",
    icon: Users,
    tasks: [
      { id: 7, text: "Attend UX meetup events", completed: false },
      { id: 8, text: "Connect with 10 designers on LinkedIn", completed: false },
      { id: 9, text: "Join design community", completed: false },
    ],
    resources: ["Meetup.com", "LinkedIn UX Groups", "ADPList for mentorship"],
  },
  {
    id: 4,
    title: "Job Preparation",
    description: "Apply for internships and entry-level positions",
    month: "Month 7-9",
    icon: Briefcase,
    tasks: [
      { id: 10, text: "Update resume with UX focus", completed: false },
      { id: 11, text: "Practice design challenges", completed: false },
      { id: 12, text: "Apply to 20+ positions", completed: false },
    ],
    resources: ["Resume Templates", "Prep for UX Interviews", "Job Boards"],
  },
];

const Roadmap = () => {
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(1);
  const [tasks, setTasks] = useState(milestones);

  const toggleTask = (milestoneId: number, taskId: number) => {
    setTasks((prev) =>
      prev.map((m) =>
        m.id === milestoneId
          ? {
              ...m,
              tasks: m.tasks.map((t) =>
                t.id === taskId ? { ...t, completed: !t.completed } : t
              ),
            }
          : m
      )
    );
  };

  const completedTasks = tasks.flatMap((m) => m.tasks).filter((t) => t.completed).length;
  const totalTasks = tasks.flatMap((m) => m.tasks).length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn={true} />
      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border bg-gradient-to-r from-primary/5 via-secondary/5 to-success/5">
          <div className="container px-4 md:px-6 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Your Career Roadmap
                </h1>
                <p className="text-muted-foreground">
                  UX Designer • 9-Month Plan
                </p>
              </div>
              <div className="flex items-center gap-4">
                <ProgressRing progress={progress} size={80} variant="success" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">{completedTasks}/{totalTasks} Tasks</p>
                  <p className="text-muted-foreground">Completed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Content */}
        <section className="container px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Timeline */}
            <div className="lg:col-span-8">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

                {/* Milestones */}
                <div className="space-y-6">
                  {tasks.map((milestone, index) => {
                    const isExpanded = expandedMilestone === milestone.id;
                    const milestoneCompleted = milestone.tasks.every((t) => t.completed);
                    const milestoneTasks = milestone.tasks.filter((t) => t.completed).length;

                    return (
                      <motion.div
                        key={milestone.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                      >
                        {/* Timeline Dot */}
                        <div
                          className={cn(
                            "absolute left-0 md:left-4 top-6 h-4 w-4 rounded-full border-4 z-10 hidden md:block",
                            milestoneCompleted
                              ? "bg-success border-success/30"
                              : "bg-primary border-primary/30"
                          )}
                        />

                        {/* Milestone Card */}
                        <div
                          className={cn(
                            "md:ml-12 rounded-2xl border shadow-card transition-all",
                            isExpanded ? "bg-card" : "bg-card/50",
                            milestoneCompleted ? "border-success/30" : "border-border"
                          )}
                        >
                          {/* Header */}
                          <button
                            onClick={() => setExpandedMilestone(isExpanded ? null : milestone.id)}
                            className="w-full p-6 flex items-center justify-between text-left"
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={cn(
                                  "h-12 w-12 rounded-xl flex items-center justify-center",
                                  milestoneCompleted ? "bg-success/10" : "gradient-bg"
                                )}
                              >
                                {milestoneCompleted ? (
                                  <CheckCircle2 className="h-6 w-6 text-success" />
                                ) : (
                                  <milestone.icon className="h-6 w-6 text-primary-foreground" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-bold text-foreground">{milestone.title}</h3>
                                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                                    {milestone.month}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {milestoneTasks}/{milestone.tasks.length} tasks complete
                                </p>
                              </div>
                            </div>
                            <ChevronRight
                              className={cn(
                                "h-5 w-5 text-muted-foreground transition-transform",
                                isExpanded && "rotate-90"
                              )}
                            />
                          </button>

                          {/* Expanded Content */}
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-6 pb-6"
                            >
                              <p className="text-sm text-muted-foreground mb-4">
                                {milestone.description}
                              </p>

                              {/* Tasks */}
                              <div className="space-y-2 mb-6">
                                {milestone.tasks.map((task) => (
                                  <button
                                    key={task.id}
                                    onClick={() => toggleTask(milestone.id, task.id)}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left"
                                  >
                                    {task.completed ? (
                                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                                    ) : (
                                      <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                    )}
                                    <span
                                      className={cn(
                                        "text-sm",
                                        task.completed
                                          ? "text-muted-foreground line-through"
                                          : "text-foreground"
                                      )}
                                    >
                                      {task.text}
                                    </span>
                                  </button>
                                ))}
                              </div>

                              {/* Resources */}
                              <div>
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                                  Resources
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {milestone.resources.map((resource) => (
                                    <a
                                      key={resource}
                                      href="#"
                                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                    >
                                      {resource}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Actions */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download as PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share with Mentor
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Set Reminders
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Add to Calendar
                  </Button>
                </div>
              </div>

              {/* Add Custom Milestone */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Customize Your Path</h3>
                <Button variant="gradient" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Milestone
                </Button>
              </div>

              {/* Tips */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                <h3 className="font-semibold text-foreground mb-2">💡 Pro Tip</h3>
                <p className="text-sm text-muted-foreground">
                  Consistency beats intensity. Aim for 30-60 minutes of daily learning rather than
                  long occasional sessions. Small steps lead to big changes!
                </p>
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

export default Roadmap;
