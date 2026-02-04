import { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, Filter, ArrowUpDown, Trash2, GitCompare, BarChart3, Briefcase, Palette } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Button } from "@/components/ui/button";
import { CareerCard } from "@/components/ui/CareerCard";

const savedCareers = [
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
    savedAt: "2024-01-15",
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
    savedAt: "2024-01-14",
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
    savedAt: "2024-01-10",
  },
];

const SavedCareers = () => {
  const [careers, setCareers] = useState(savedCareers);
  const [selectedCareers, setSelectedCareers] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<"match" | "salary" | "recent">("recent");

  const toggleSelect = (id: number) => {
    setSelectedCareers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const removeSaved = (id: number) => {
    setCareers((prev) => prev.filter((c) => c.id !== id));
    setSelectedCareers((prev) => prev.filter((i) => i !== id));
  };

  const sortedCareers = [...careers].sort((a, b) => {
    switch (sortBy) {
      case "match":
        return b.matchPercentage - a.matchPercentage;
      case "salary":
        return parseInt(b.salary.replace(/\D/g, "")) - parseInt(a.salary.replace(/\D/g, ""));
      case "recent":
      default:
        return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn={true} />
      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border bg-gradient-to-r from-primary/5 via-secondary/5 to-success/5">
          <div className="container px-4 md:px-6 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                  <Bookmark className="h-8 w-8 text-primary" />
                  Saved Careers
                </h1>
                <p className="text-muted-foreground">
                  {careers.length} careers saved • {selectedCareers.length} selected
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  disabled={selectedCareers.length < 2}
                  className="flex items-center gap-2"
                >
                  <GitCompare className="h-4 w-4" />
                  Compare ({selectedCareers.length})
                </Button>
                <Button
                  variant="outline"
                  disabled={selectedCareers.length === 0}
                  onClick={() => selectedCareers.forEach(removeSaved)}
                  className="flex items-center gap-2 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Sort */}
        <section className="border-b border-border bg-background">
          <div className="container px-4 md:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <div className="flex rounded-lg border border-border overflow-hidden">
                  {[
                    { value: "recent", label: "Recently Added" },
                    { value: "match", label: "Match %" },
                    { value: "salary", label: "Salary" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value as typeof sortBy)}
                      className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                        sortBy === option.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Careers Grid */}
        <section className="container px-4 md:px-6 py-8">
          {careers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedCareers.map((career, index) => (
                <motion.div
                  key={career.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Selection Checkbox */}
                  <button
                    onClick={() => toggleSelect(career.id)}
                    className={`absolute top-4 left-4 z-10 h-6 w-6 rounded-md border-2 flex items-center justify-center transition-all ${
                      selectedCareers.includes(career.id)
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/30 bg-background hover:border-primary"
                    }`}
                  >
                    {selectedCareers.includes(career.id) && (
                      <svg
                        className="h-4 w-4 text-primary-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>

                  <CareerCard
                    {...career}
                    isSaved={true}
                    onSave={() => removeSaved(career.id)}
                    onViewDetails={() => {}}
                    className="pl-12"
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto h-20 w-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <Bookmark className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No saved careers yet</h3>
              <p className="text-muted-foreground mb-6">
                Explore career recommendations and save the ones you're interested in.
              </p>
              <Button variant="gradient" asChild>
                <a href="/dashboard">Explore Careers</a>
              </Button>
            </div>
          )}
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default SavedCareers;
