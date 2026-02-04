import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Heart, Settings, ChevronRight, Plus, X, Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { cn } from "@/lib/utils";
interface SkillItem {
  name: string;
  level: number;
  interest: "low" | "medium" | "high";
}
const interestTags = ["Problem Solving", "Creativity", "Leadership", "Data Analysis", "Teaching", "Innovation", "Design", "Writing", "Public Speaking", "Research", "Technology", "Strategy"];
const industries = [{
  name: "Technology",
  icon: "💻"
}, {
  name: "Healthcare",
  icon: "🏥"
}, {
  name: "Finance",
  icon: "💰"
}, {
  name: "Education",
  icon: "📚"
}, {
  name: "Creative",
  icon: "🎨"
}, {
  name: "Business",
  icon: "📊"
}];
const Profile = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Problem Solving", "Creativity", "Technology", "Design"]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(["Technology", "Creative"]);
  const [workStyle, setWorkStyle] = useState<string>("hybrid");
  const [skills, setSkills] = useState<SkillItem[]>([{
    name: "JavaScript",
    level: 4,
    interest: "high"
  }, {
    name: "UI/UX Design",
    level: 3,
    interest: "high"
  }, {
    name: "Communication",
    level: 5,
    interest: "medium"
  }]);
  const [newSkill, setNewSkill] = useState("");
  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]);
  };
  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev => prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]);
  };
  const addSkill = () => {
    if (newSkill.trim() && !skills.find(s => s.name === newSkill)) {
      setSkills(prev => [...prev, {
        name: newSkill,
        level: 3,
        interest: "medium"
      }]);
      setNewSkill("");
    }
  };
  const updateSkillLevel = (name: string, level: number) => {
    setSkills(prev => prev.map(s => s.name === name ? {
      ...s,
      level
    } : s));
  };
  const removeSkill = (name: string) => {
    setSkills(prev => prev.filter(s => s.name !== name));
  };
  const sections = [{
    name: "Education",
    progress: 80,
    icon: GraduationCap
  }, {
    name: "Skills",
    progress: 60,
    icon: Briefcase
  }, {
    name: "Interests",
    progress: 90,
    icon: Heart
  }, {
    name: "Preferences",
    progress: 40,
    icon: Settings
  }];
  const overallProgress = Math.round(sections.reduce((acc, s) => acc + s.progress, 0) / sections.length);
  return <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn={true} />
      <main className="flex-1">
        {/* Header Section */}
        <section className="border-b border-border bg-gradient-to-r from-primary/5 via-secondary/5 to-success/5">
          <div className="container px-4 md:px-6 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-2xl gradient-hero-bg flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-xl">
                    JD
                  </div>
                  <button className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">John Doe</h1>
                  <p className="text-muted-foreground">Career Explorer</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ProgressRing progress={overallProgress} size={100} label="Complete" variant="success" />
              </div>
            </div>
          </div>
        </section>

        {/* Profile Content */}
        <section className="container px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar - Progress Overview */}
            <div className="lg:col-span-3">
              <div className="sticky top-24 space-y-4">
                <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
                  <h3 className="font-semibold text-foreground mb-4">Profile Sections</h3>
                  <div className="space-y-3">
                    {sections.map(section => <a key={section.name} href={`#${section.name.toLowerCase()}`} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <section.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{section.name}</p>
                            <p className="text-xs text-muted-foreground">{section.progress}% complete</p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>)}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-8">
              {/* Education Section */}
              <motion.div id="education" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} className="p-6 rounded-2xl bg-card border border-border shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl gradient-bg flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Education</h2>
                      <p className="text-sm text-muted-foreground">Your academic background</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                    80% Complete
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">Bachelor's in Computer Science</h4>
                        <p className="text-sm text-muted-foreground">University of Technology</p>
                        <p className="text-xs text-muted-foreground mt-1">Graduated 2023</p>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Education
                  </Button>
                </div>
              </motion.div>

              {/* Skills Section */}
              <motion.div id="skills" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.1
            }} className="p-6 rounded-2xl bg-card border border-border shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl gradient-bg flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Skills</h2>
                      <p className="text-sm text-muted-foreground">Your abilities and expertise</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning text-center">
                    60% Complete
                  </span>
                </div>

                {/* Add Skill */}
                <div className="flex gap-2 mb-6">
                  <input type="text" value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="Add a skill (e.g., Python, Leadership)" className="flex-1 px-4 py-2.5 rounded-xl bg-muted border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" onKeyDown={e => e.key === "Enter" && addSkill()} />
                  <Button onClick={addSkill} variant="gradient">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {skills.map(skill => <div key={skill.name} className="p-4 rounded-xl bg-muted/50 border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-foreground">{skill.name}</span>
                        <button onClick={() => removeSkill(skill.name)} className="h-6 w-6 rounded-full hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground w-20">Proficiency:</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(level => <button key={level} onClick={() => updateSkillLevel(skill.name, level)} className={cn("h-8 w-8 rounded-lg transition-all", skill.level >= level ? "gradient-bg" : "bg-muted hover:bg-muted/80")} />)}
                        </div>
                        <span className="text-xs text-muted-foreground ml-2">
                          {["", "Beginner", "Basic", "Intermediate", "Advanced", "Expert"][skill.level]}
                        </span>
                      </div>
                    </div>)}
                </div>
              </motion.div>

              {/* Interests Section */}
              <motion.div id="interests" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} className="p-6 rounded-2xl bg-card border border-border shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl gradient-bg flex items-center justify-center">
                      <Heart className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Interests</h2>
                      <p className="text-sm text-muted-foreground">What excites you</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                    90% Complete
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {interestTags.map(interest => <button key={interest} onClick={() => toggleInterest(interest)} className={cn("px-4 py-2 rounded-full text-sm font-medium transition-all", selectedInterests.includes(interest) ? "gradient-bg text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80")}>
                      {selectedInterests.includes(interest) && <Check className="h-3 w-3 inline mr-1" />}
                      {interest}
                    </button>)}
                </div>
              </motion.div>

              {/* Preferences Section */}
              <motion.div id="preferences" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }} className="p-6 rounded-2xl bg-card border border-border shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl gradient-bg flex items-center justify-center">
                      <Settings className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Preferences</h2>
                      <p className="text-sm text-muted-foreground">Your ideal work environment</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                    40% Complete
                  </span>
                </div>

                {/* Industry Preferences */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Preferred Industries</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {industries.map(industry => <button key={industry.name} onClick={() => toggleIndustry(industry.name)} className={cn("p-4 rounded-xl border-2 transition-all text-center", selectedIndustries.includes(industry.name) ? "border-primary bg-primary/5" : "border-border hover:border-primary/50")}>
                        <span className="text-2xl mb-2 block">{industry.icon}</span>
                        <span className="text-sm font-medium text-foreground">{industry.name}</span>
                      </button>)}
                  </div>
                </div>

                {/* Work Style */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Work Style</h4>
                  <div className="flex gap-3">
                    {["office", "remote", "hybrid"].map(style => <button key={style} onClick={() => setWorkStyle(style)} className={cn("flex-1 p-4 rounded-xl border-2 transition-all capitalize", workStyle === style ? "border-primary bg-primary/5" : "border-border hover:border-primary/50")}>
                        {style}
                      </button>)}
                  </div>
                </div>
              </motion.div>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button variant="hero" size="lg">
                  Save All Changes
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>;
};
export default Profile;