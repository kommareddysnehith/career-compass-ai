 import { useState, useEffect } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { X, ArrowRight, ArrowLeft } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 interface TourStep {
   target: string;
   title: string;
   content: string;
   position: "top" | "bottom" | "left" | "right";
 }
 
 const tourSteps: TourStep[] = [
   {
     target: "[data-tour='nav-home']",
     title: "Navigation",
     content: "Use the navigation menu to explore different sections of the app.",
     position: "bottom",
   },
   {
     target: "[data-tour='hero-cta']",
     title: "Get Started",
     content: "Click here to start your free career assessment and discover your ideal path.",
     position: "bottom",
   },
   {
     target: "[data-tour='features']",
     title: "Key Features",
     content: "Explore our AI-powered features for personalized career recommendations.",
     position: "top",
   },
   {
     target: "[data-tour='chat-widget']",
     title: "Career Coach",
     content: "Chat with our AI career coach anytime for personalized guidance.",
     position: "left",
   },
 ];
 
 interface GuidedTourProps {
   isActive: boolean;
   onComplete: () => void;
 }
 
 export const GuidedTour = ({ isActive, onComplete }: GuidedTourProps) => {
   const [currentStep, setCurrentStep] = useState(0);
   const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
   const [isVisible, setIsVisible] = useState(false);
 
   useEffect(() => {
     if (!isActive) {
       setIsVisible(false);
       return;
     }
 
     const timer = setTimeout(() => {
       updateTooltipPosition();
       setIsVisible(true);
     }, 300);
 
     return () => clearTimeout(timer);
   }, [isActive, currentStep]);
 
   useEffect(() => {
     const handleResize = () => {
       if (isActive) {
         updateTooltipPosition();
       }
     };
 
     window.addEventListener("resize", handleResize);
     return () => window.removeEventListener("resize", handleResize);
   }, [isActive, currentStep]);
 
   const updateTooltipPosition = () => {
     const step = tourSteps[currentStep];
     const element = document.querySelector(step.target);
 
     if (element) {
       const rect = element.getBoundingClientRect();
       const scrollTop = window.scrollY;
       const scrollLeft = window.scrollX;
 
       let top = 0;
       let left = 0;
 
       switch (step.position) {
         case "bottom":
           top = rect.bottom + scrollTop + 12;
           left = rect.left + scrollLeft + rect.width / 2;
           break;
         case "top":
           top = rect.top + scrollTop - 12;
           left = rect.left + scrollLeft + rect.width / 2;
           break;
         case "left":
           top = rect.top + scrollTop + rect.height / 2;
           left = rect.left + scrollLeft - 12;
           break;
         case "right":
           top = rect.top + scrollTop + rect.height / 2;
           left = rect.right + scrollLeft + 12;
           break;
       }
 
       setTooltipPosition({ top, left });
 
       // Scroll element into view
       element.scrollIntoView({ behavior: "smooth", block: "center" });
     }
   };
 
   const handleNext = () => {
     if (currentStep < tourSteps.length - 1) {
       setCurrentStep(currentStep + 1);
     } else {
       handleComplete();
     }
   };
 
   const handlePrev = () => {
     if (currentStep > 0) {
       setCurrentStep(currentStep - 1);
     }
   };
 
   const handleComplete = () => {
     setIsVisible(false);
     setCurrentStep(0);
     onComplete();
   };
 
   const step = tourSteps[currentStep];
 
   const getTooltipStyles = () => {
     const base: React.CSSProperties = {
       position: "absolute",
       zIndex: 110,
     };
 
     switch (step.position) {
       case "bottom":
         return { ...base, top: tooltipPosition.top, left: tooltipPosition.left, transform: "translateX(-50%)" };
       case "top":
         return { ...base, top: tooltipPosition.top, left: tooltipPosition.left, transform: "translate(-50%, -100%)" };
       case "left":
         return { ...base, top: tooltipPosition.top, left: tooltipPosition.left, transform: "translate(-100%, -50%)" };
       case "right":
         return { ...base, top: tooltipPosition.top, left: tooltipPosition.left, transform: "translateY(-50%)" };
     }
   };
 
   return (
     <AnimatePresence>
       {isActive && isVisible && (
         <>
           {/* Overlay */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[100]"
             onClick={handleComplete}
           />
 
           {/* Spotlight on target element */}
           <TargetHighlight target={step.target} />
 
           {/* Tooltip */}
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.9 }}
             style={getTooltipStyles()}
             className="w-72 bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
           >
             {/* Header */}
             <div className="gradient-hero-bg px-4 py-3 flex items-center justify-between">
               <h3 className="font-semibold text-primary-foreground">{step.title}</h3>
               <button
                 onClick={handleComplete}
                 className="h-6 w-6 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
               >
                 <X className="h-3 w-3" />
               </button>
             </div>
 
             {/* Content */}
             <div className="p-4">
               <p className="text-sm text-muted-foreground">{step.content}</p>
             </div>
 
             {/* Footer */}
             <div className="px-4 pb-4 flex items-center justify-between">
               <span className="text-xs text-muted-foreground">
                 {currentStep + 1} of {tourSteps.length}
               </span>
               <div className="flex gap-2">
                 {currentStep > 0 && (
                   <Button size="sm" variant="ghost" onClick={handlePrev}>
                     <ArrowLeft className="h-4 w-4" />
                   </Button>
                 )}
                 <Button size="sm" variant="hero" onClick={handleNext}>
                   {currentStep < tourSteps.length - 1 ? (
                     <>
                       Next
                       <ArrowRight className="h-4 w-4 ml-1" />
                     </>
                   ) : (
                     "Finish"
                   )}
                 </Button>
               </div>
             </div>
           </motion.div>
         </>
       )}
     </AnimatePresence>
   );
 };
 
 const TargetHighlight = ({ target }: { target: string }) => {
   const [rect, setRect] = useState<DOMRect | null>(null);
 
   useEffect(() => {
     const element = document.querySelector(target);
     if (element) {
       const updateRect = () => {
         setRect(element.getBoundingClientRect());
       };
       updateRect();
 
       window.addEventListener("resize", updateRect);
       window.addEventListener("scroll", updateRect);
 
       return () => {
         window.removeEventListener("resize", updateRect);
         window.removeEventListener("scroll", updateRect);
       };
     }
   }, [target]);
 
   if (!rect) return null;
 
   return (
     <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       className="fixed z-[105] pointer-events-none"
       style={{
         top: rect.top - 4,
         left: rect.left - 4,
         width: rect.width + 8,
         height: rect.height + 8,
         boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
         borderRadius: "8px",
       }}
     />
   );
 };