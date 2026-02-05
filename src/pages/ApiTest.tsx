import { useState } from "react";
import { getRecommendations, checkHealth, UserInput, Recommendation } from "../api/careerApi";

const ApiTest = () => {
  const [loading, setLoading] = useState(false);
  const [recs, setRecs] = useState<Recommendation[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [healthStatus, setHealthStatus] = useState<string | null>(null);

  // Sample payload for testing (later replace with real form values)
  const sampleInput: UserInput = {
    user_type: "student",
    education_level: "bachelors",
    education_stream: "science_pcm",
    current_role: null,
    target_role: null,
    interests: ["technology", "data", "problem_solving"],
    skills: {
      python: 4,
      sql: 3,
      statistics: 2,
      machine_learning: 1,
      programming: 4,
      problem_solving: 4,
      git: 2,
      databases: 2,
      communication: 3,
    },
    preferred_industries: ["technology", "finance"],
  };

  const handleHealthCheck = async () => {
    try {
      setError(null);
      setHealthStatus("🔄 Connecting to backend...");
      console.log('Starting health check...');
      
      const result = await checkHealth();
      setHealthStatus(`✅ Backend is running: ${result.message}`);
      console.log('Health check successful:', result);
    } catch (e: any) {
      console.error('Health check failed:', e);
      setHealthStatus(`❌ Backend connection failed: ${e.message}`);
      setError(`Connection Details:
        - Trying to connect to: http://127.0.0.1:8000
        - Error: ${e.message}
        - Make sure FastAPI is running on port 8000
        - Check browser console for more details`);
    }
  };

  const handleGetRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getRecommendations(sampleInput);
      setRecs(result);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mesh-background">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 gradient-hero-text text-center">
          Career Recommendation API Test
        </h1>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Test Backend Connection</h2>
            <div className="space-y-4">
              <button
                onClick={handleHealthCheck}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Test Backend Health
              </button>

              <button
                onClick={handleGetRecommendations}
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity ml-4"
                disabled={loading}
              >
                {loading ? "Loading..." : "Get Sample Recommendations"}
              </button>
            </div>

            {healthStatus && (
              <div className="mt-4 p-4 glass-card rounded-lg">
                <p className="font-medium">{healthStatus}</p>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive font-medium">Error: {error}</p>
              </div>
            )}
          </div>

          {recs && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Career Recommendations</h2>
              {recs.map((rec) => (
                <div key={rec.role_id} className="glass-card p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{rec.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Match Score:</span>
                      <span className="text-lg font-bold text-primary">{rec.match_score}%</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{rec.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Why this fits you:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {rec.why_fit.map((reason, i) => (
                        <li key={i} className="text-muted-foreground">{reason}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium text-success mb-2">Your Strengths ({rec.skill_gap.have.length})</h5>
                      {rec.skill_gap.have.map((skill, i) => (
                        <div key={i} className="text-muted-foreground">
                          {skill.skill.replace(/_/g, ' ')} ({skill.user_level}/{skill.req_level})
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-warning mb-2">Can Improve ({rec.skill_gap.improve.length})</h5>
                      {rec.skill_gap.improve.map((skill, i) => (
                        <div key={i} className="text-muted-foreground">
                          {skill.skill.replace(/_/g, ' ')} ({skill.user_level} → {skill.req_level})
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-destructive mb-2">Need to Learn ({rec.skill_gap.missing.length})</h5>
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

          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Setup Instructions</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>1. Backend:</strong> Make sure your FastAPI server is running on port 8000</p>
              <p><strong>2. CORS:</strong> Backend should allow origins: http://localhost:8080</p>
              <p><strong>3. Endpoints:</strong> GET / and POST /recommend-careers should be available</p>
              <p><strong>4. Test:</strong> Visit http://127.0.0.1:8000/docs to see API documentation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTest;