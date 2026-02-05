 import { useState, useEffect } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { X, MapPin, Route, Download, Sparkles } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 interface OnboardingModalProps {
   onStartTour: () => void;
   onSkip: () => void;
 }
 
 const steps = [
   {
     icon: MapPin,
     title: "Add locations",
     description: "Enter the places you want to visit or import from a list",
   },
   {
     icon: Route,
     title: "Generate route",
     description: "Our AI optimizes the best path between your locations",
   },
   {
     icon: Download,
     title: "Export results",
     description: "Download your route or share it with your team",
   },
 ];
 
 export const OnboardingModal = ({ onStartTour, onSkip }: OnboardingModalProps) => {
   const [isVisible, setIsVisible] = useState(false);
 
   useEffect(() => {
     const hasSeenOnboarding = localStorage.getItem("voca_onboarding_seen");
     if (!hasSeenOnboarding) {
       setIsVisible(true);
     }
   }, []);
 
   const handleSkip = () => {
     localStorage.setItem("voca_onboarding_seen", "true");
     setIsVisible(false);
     onSkip();
   };
 
   const handleStartTour = () => {
     localStorage.setItem("voca_onboarding_seen", "true");
     setIsVisible(false);
     onStartTour();
   };
 
   return (
     <AnimatePresence>
       {isVisible && (
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
         >
           <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 20 }}
             transition={{ duration: 0.3 }}
             className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
           >
             {/* Header with gradient */}
             <div className="gradient-hero-bg p-8 text-center">
               <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm mb-4">
                 <Sparkles className="h-8 w-8 text-primary-foreground" />
               </div>
               <h2 className="text-2xl font-bold text-primary-foreground mb-2">
                 Welcome to Insight Route Maker
               </h2>
               <p className="text-primary-foreground/80">
                 Create and optimize routes in minutes.
               </p>
             </div>
 
             {/* Close button */}
             <button
               onClick={handleSkip}
               className="absolute top-4 right-4 h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
             >
               <X className="h-4 w-4" />
             </button>
 
             {/* Steps */}
             <div className="p-6 space-y-4">
               {steps.map((step, index) => (
                 <motion.div
                   key={step.title}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.1 * (index + 1) }}
                   className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                 >
                   <div className="flex-shrink-0 h-10 w-10 rounded-xl gradient-hero-bg flex items-center justify-center">
                     <step.icon className="h-5 w-5 text-primary-foreground" />
                   </div>
                   <div>
                     <div className="flex items-center gap-2">
                       <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                         Step {index + 1}
                       </span>
                       <h3 className="font-semibold text-foreground">{step.title}</h3>
                     </div>
                     <p className="text-sm text-muted-foreground mt-1">
                       {step.description}
                     </p>
                   </div>
                 </motion.div>
               ))}
             </div>
 
             {/* Actions */}
             <div className="p-6 pt-0 flex gap-3">
               <Button
                 variant="outline"
                 className="flex-1"
                 onClick={handleSkip}
               >
                 Skip
               </Button>
               <Button
                 variant="hero"
                 className="flex-1"
                 onClick={handleStartTour}
               >
                 Start Tour
               </Button>
             </div>
           </motion.div>
         </motion.div>
       )}
     </AnimatePresence>
   );
 };
 
 export const triggerOnboarding = () => {
   localStorage.removeItem("voca_onboarding_seen");
   window.location.reload();
 };