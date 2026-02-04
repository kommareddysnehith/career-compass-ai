import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

export const FeatureCard = ({
  icon,
  title,
  description,
  className,
  delay = 0,
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className={cn(
        "group p-8 rounded-2xl bg-card border border-border shadow-card hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      <div className="mb-5 h-14 w-14 rounded-xl gradient-hero-bg flex items-center justify-center shadow-lg group-hover:shadow-glow transition-shadow duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
};
