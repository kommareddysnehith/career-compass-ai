import { motion } from "framer-motion";
import { Bookmark, TrendingUp, GraduationCap, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "./ProgressRing";
import { cn } from "@/lib/utils";

interface CareerCardProps {
  title: string;
  matchPercentage: number;
  salary: string;
  growth: string;
  education: string;
  skills: { name: string; match: number }[];
  icon: React.ReactNode;
  isSaved?: boolean;
  onSave?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

export const CareerCard = ({
  title,
  matchPercentage,
  salary,
  growth,
  education,
  skills,
  icon,
  isSaved = false,
  onSave,
  onViewDetails,
  className,
}: CareerCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={cn(
        "relative bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      {/* Save Button */}
      <button
        onClick={onSave}
        className={cn(
          "absolute top-4 right-4 h-9 w-9 rounded-lg flex items-center justify-center transition-all",
          isSaved
            ? "bg-primary/10 text-primary"
            : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
        )}
      >
        <Bookmark className={cn("h-5 w-5", isSaved && "fill-current")} />
      </button>

      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="h-14 w-14 rounded-xl gradient-hero-bg flex items-center justify-center shadow-lg">
          {icon}
        </div>
        <div className="flex-1 pr-8">
          <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
              {matchPercentage}% Match
            </span>
          </div>
        </div>
      </div>

      {/* Match Progress */}
      <div className="flex items-center justify-center mb-6">
        <ProgressRing
          progress={matchPercentage}
          size={100}
          strokeWidth={8}
          variant={matchPercentage >= 90 ? "success" : matchPercentage >= 70 ? "primary" : "secondary"}
          label="Match"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <DollarSign className="h-4 w-4 text-success mx-auto mb-1" />
          <p className="text-xs text-muted-foreground">Salary</p>
          <p className="text-sm font-semibold text-foreground">{salary}</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <TrendingUp className="h-4 w-4 text-primary mx-auto mb-1" />
          <p className="text-xs text-muted-foreground">Growth</p>
          <p className="text-sm font-semibold text-foreground">{growth}</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <GraduationCap className="h-4 w-4 text-secondary mx-auto mb-1" />
          <p className="text-xs text-muted-foreground">Education</p>
          <p className="text-sm font-semibold text-foreground truncate">{education}</p>
        </div>
      </div>

      {/* Skills Match */}
      <div className="space-y-2 mb-6">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Top Skills Match
        </p>
        {skills.slice(0, 3).map((skill) => (
          <div key={skill.name} className="flex items-center gap-3">
            <span className="text-sm text-foreground flex-1 truncate">{skill.name}</span>
            <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full gradient-bg transition-all duration-500"
                style={{ width: `${skill.match}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground w-8">{skill.match}%</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <Button
        variant="gradient"
        className="w-full group"
        onClick={onViewDetails}
      >
        View Details
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
};
