import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { getRecommendations, UserInput, Recommendation } from "../api/careerApi";
import {
  User,
  GraduationCap,
  Heart,
  Zap,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Star,
  TrendingUp,
  AlertCircle,
  XCircle,
} from "lucide-react";

const CareerAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<UserInput>>({
    user_type: undefined,
    education_level: "",
    education_stream: "",
    current_role: "",
    target_role: "",
    interests: [],
    skills: {},
    preferred_industries: [],
  });

  const steps = [
    { id: 1, title: "Profile", icon: User },
    { id: 2, title: "Interests", icon: Heart },
    { id: 3, title: "Skills", icon: Zap },
    { id: 4, title: "Results", icon: CheckCircle },
  ];

  const userTypes = [
    { value: "student", label: "Student", desc: "Currently studying" },
    { value: "fresher", label: "Fresh Graduate", desc: "Recently graduated" },
    { value: "career_change", label: "Career Change", desc: "Looking to switch careers" },
  ];

  const educationLevels = [
    { value: "high_school", label: "High School" },
    { value: "bachelors", label: "Bachelor's Degree" },
    { value: "masters", label: "Master's Degree" },
    { value: "phd", label: "PhD" },
    { value: "diploma", label: "Diploma" },
  ];

  const educationStreams = [
    { value: "science_pcm", label: "Science (Physics, Chemistry, Math)" },
    { value: "science_pcb", label: "Science (Physics, Chemistry, Biology)" },
    { value: "cs_it", label: "Computer Science / IT" },
    { value: "commerce", label: "Commerce" },
    { value: "arts", label: "Arts / Humanities" },
    { value: "maths", label: "Mathematics" },
    { value: "vocational", label: "Vocational / Technical" },
  ];

  const interests = [
    "technology", "data", "design", "analytics", "problem_solving",
    "writing", "creativity", "research", "teaching", "healthcare",
    "finance", "business", "engineering", "art", "music", "sports",
    "environment", "social_work", "law", "media", "photography"
  ];

  const industries = [
    "technology", "finance", "healthcare", "media", "fashion",
    "manufacturing", "startups", "ecommerce", "consulting", "education",
    "government", "entertainment", "automotive", "aerospace", "energy"
  ];

  const skillCategories = [
    {
      name: "Tech & Data",
      skills: [
        { key: "python", label: "Python" },
        { key: "sql", label: "SQL" },
        { key: "programming", label: "Programming" },
        { key: "data_analysis", label: "Data Analysis" },
        { key: "machine_learning", label: "Machine Learning" },
      ]
    },
    {
      name: "Business",
      skills: [
        { key: "communication", label: "Communication" },
        { key: "project_management", label: "Project Management" },
        { key: "analytics", label: "Analytics" },
        { key: "accounting", label: "Accounting" },
      ]
    },
    {
      name: "Creative",
      skills: [
        { key: "design_tools", label: "Design Tools" },
        { key: "writing", label: "Writing" },
        { key: "creativity", label: "Creativity" },
        { key: "user_research", label: "User Research" },
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const userInput: UserInput = {
        user_type: formData.user_type!,
        education_level: formData.education_level!,
        education_stream: formData.education_stream!,
        current_role: formData.current_role || null,
        target_role: formData.target_role || null,
        interests: formData.interests || [],
        skills: formData.skills || {},
        preferred_industries: formData.preferred_industries || [],
      };

      const results = await getRecommendations(userInput);
      setRecommendations(results);
      setCurrentStep(4);
    } catch (err: any) {
      setError(err.message || "Failed to get recommendations");
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    const current = formData.interests || [];
    const updated = current.includes(interest)
      ? current.filter(i => i !== interest)
      : [...current, interest];
    setFormData({ ...formData, interests: updated });
  };

  const toggleIndustry = (industry: string) => {
    const current = formData.preferred_industries || [];
    const updated = current.includes(industry)
      ? current.filter(i => i !== industry)
      : [...current, industry];
    setFormData({ ...formData, preferred_industries: updated });
  };

  const updateSkill = (skillKey: string, value: number) => {
    setFormData({
      ...formData,
      skills: { ...formData.skills, [skillKey]: value }
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold gradient-text mb-4">Tell Us About Yourself</h2>
              <p className="text-muted-foreground">Let's start with your background</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">I am a *</label>
                <div className="grid gap-3">
                  {userTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setFormData({ ...formData, user_type: type.value as any })}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        formData.user_type === type.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium">{type.label}</div>
                      <div className="text-sm text-muted-foreground">{type.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Education Level *</label>
                  <select
                    value={formData.education_level}
                    onChange={(e) => setFormData({ ...formData, education_level: e.target.value })}
                    className="w-full p-3 rounded-lg border border-border bg-background"
                  >
                    <option value="">Select level</option>
                    {educationLevels.map((level) => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Education Stream *</label>
                  <select
                    value={formData.education_stream}
                    onChange={(e) => setFormData({ ...formData, education_stream: e.target.value })}
                    className="w-full p-3 rounded-lg border border-border bg-background"
                  >
                    <option value="">Select stream</option>
                    {educationStreams.map((stream) => (
                      <option key={stream.value} value={stream.value}>{stream.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Current Role (Optional)</label>
                  <input
                    type="text"
                    value={formData.current_role}
                    onChange={(e) => setFormData({ ...formData, current_role: e.target.value })}
                    placeholder="e.g., Software Intern"
                    className="w-full p-3 rounded-lg border border-border bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Target Role (Optional)</label>
                  <input
                    type="text"
                    value={formData.target_role}
                    onChange={(e) => setFormData({ ...formData, target_role: e.target.value })}
                    placeholder="e.g., Data Scientist"
                    className="w-full p-3 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold gradient-text mb-4">What Drives You?</h2>
              <p className="text-muted-foreground">Select your interests and preferred industries</p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Your Interests ({formData.interests?.length || 0} selected)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`p-3 rounded-lg text-sm transition-all ${
                        formData.interests?.includes(interest)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {interest.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Preferred Industries ({formData.preferred_industries?.length || 0} selected)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {industries.map((industry) => (
                    <button
                      key={industry}
                      onClick={() => toggleIndustry(industry)}
                      className={`p-3 rounded-lg text-sm transition-all ${
                        formData.preferred_industries?.includes(industry)
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {industry.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold gradient-text mb-4">Skills Assessment</h2>
              <p className="text-muted-foreground">Rate your proficiency (0 = None, 5 = Expert)</p>
            </div>

            <div className="space-y-8">
              {skillCategories.map((category) => (
                <div key={category.name} className="glass-card p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.key} className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-medium">{skill.label}</label>
                          <span className="text-sm text-muted-foreground">
                            {formData.skills?.[skill.key] || 0}/5
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="5"
                          value={formData.skills?.[skill.key] || 0}
                          onChange={(e) => updateSkill(skill.key, parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold gradient-text mb-4">Your Career Recommendations</h2>
              <p className="text-muted-foreground">Based on your profile, here are your top matches</p>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p>Analyzing your profile...</p>
              </div>
            )}

            {error && (
              <div className="glass-card p-6 rounded-xl border-destructive/20 bg-destructive/5">
                <p className="text-destructive">{error}</p>
              </div>
            )}

            {recommendations.length > 0 && (
              <div className="space-y-6">
                {recommendations.map((rec) => (
                  <div key={rec.role_id} className="glass-card p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{rec.name}</h3>
                        <p className="text-muted-foreground">{rec.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{rec.match_score}%</div>
                        <div className="text-sm text-muted-foreground">Match</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Star className="w-4 h-4 text-primary" />
                        Why this fits you:
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {rec.why_fit.map((reason, i) => (
                          <li key={i}>• {reason}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-success mb-2 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Strengths ({rec.skill_gap.have.length})
                        </h5>
                        {rec.skill_gap.have.map((skill, i) => (
                          <div key={i} className="text-muted-foreground">
                            {skill.skill.replace(/_/g, ' ')} ({skill.user_level}/{skill.req_level})
                          </div>
                        ))}
                      </div>

                      <div>
                        <h5 className="font-medium text-warning mb-2 flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          Can Improve ({rec.skill_gap.improve.length})
                        </h5>
                        {rec.skill_gap.improve.map((skill, i) => (
                          <div key={i} className="text-muted-foreground">
                            {skill.skill.replace(/_/g, ' ')} ({skill.user_level} → {skill.req_level})
                          </div>
                        ))}
                      </div>

                      <div>
                        <h5 className="font-medium text-destructive mb-2 flex items-center gap-1">
                          <XCircle className="w-4 w-4" />
                          Need to Learn ({rec.skill_gap.missing.length})
                        </h5>
                        {rec.skill_gap.missing.map((skill, i) => (
                          <div key={i} className="text-muted-foreground">
                            {skill.skill.replace(/_/g, ' ')} (Level {skill.req_level})
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.user_type && formData.education_level && formData.education_stream;
      case 2:
        return (formData.interests?.length || 0) > 0 && (formData.preferred_industries?.length || 0) > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn={true} />
      
      <main className="flex-1 mesh-background">
        <div className="container mx-auto px-4 py-8">
          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                      isActive ? 'border-primary bg-primary text-primary-foreground' :
                      isCompleted ? 'border-success bg-success text-success-foreground' :
                      'border-muted bg-background text-muted-foreground'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="ml-3">
                      <div className={`text-sm font-medium ${isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'}`}>
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 ${isCompleted ? 'bg-success' : 'bg-muted'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 rounded-2xl">
              {renderStepContent()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : currentStep === 3 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Get Recommendations
                    </>
                  )}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CareerAssessment;