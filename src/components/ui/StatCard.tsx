import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export const StatCard = ({
  icon: Icon,
  label,
  value,
  change,
  trend = "neutral",
  className,
}: StatCardProps) => {
  const trendColors = {
    up: "text-success",
    down: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <div
      className={cn(
        "p-4 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {change && (
          <span className={cn("text-sm font-medium", trendColors[trend])}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
};
