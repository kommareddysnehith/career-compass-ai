import { useState } from "react";
import { getRecommendations, UserInput, Recommendation } from "./api/careerApi";

function App() {
  const [form, setForm] = useState({
    user_type: "student" as UserInput["user_type"],
    education_level: "bachelors",
    education_stream: "science_pcm",
    interests: [] as string[],
    preferred_industries: [] as string[],
  });

  const [skills, setSkills] = useState({
    python: 0,
    sql: 0,
    programming: 0,
    statistics: 0,
    machine_learning: 0,
    communication: 0,
    problem_solving: 0,
  });

  const [loading, setLoading] = useState(false);
  const [recs, setRecs] = useState<Recommendation[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxArray = (name: "interests" | "preferred_industries", value: string) => {
    setForm((prev) => {
      const arr = prev[name];
      if (arr.includes(value)) {
        return { ...prev, [name]: arr.filter((v) => v !== value) };
      }
      return { ...prev, [name]: [...arr, value] };
    });
  };

  const handleSkillChange = (name: keyof typeof skills, value: number) => {
    setSkills((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload: UserInput = {
      user_type: form.user_type,
      education_level: form.education_level,
      education_stream: form.education_stream,
      current_role: null,
      target_role: null,
      interests: form.interests,
      skills,
      preferred_industries: form.preferred_industries,
    };

    try {
      const recommendations = await getRecommendations(payload);
      setRecs(recommendations);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Career Compass AI</h1>
      </header>

      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left: Input Form */}
        <section className="w-full md:w-1/2 border-r border-slate-800 p-6 space-y-6">
          <h2 className="text-lg font-semibold mb-2">Your Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">You are a</label>
              <select
                name="user_type"
                value={form.user_type}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm"
              >
                <option value="student">Student</option>
                <option value="fresher">Fresher</option>
                <option value="career_change">Career change</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Education Level</label>
                <select
                  name="education_level"
                  value={form.education_level}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm"
                >
                  <option value="high_school">High School</option>
                  <option value="diploma">Diploma</option>
                  <option value="bachelors">Bachelors</option>
                  <option value="masters">Masters</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Stream</label>
                <select
                  name="education_stream"
                  value={form.education_stream}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm"
                >
                  <option value="science_pcm">Science (PCM)</option>
                  <option value="science_pcb">Science (PCB)</option>
                  <option value="cs_it">Computer Science / IT</option>
                  <option value="commerce">Commerce</option>
                  <option value="arts">Arts</option>
                  <option value="vocational">Vocational</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Interests</label>
              <div className="flex flex-wrap gap-2 text-sm">
                {[
                  "technology",
                  "data",
                  "problem_solving",
                  "design",
                  "creativity",
                  "business",
                  "finance",
                  "fashion",
                  "mental_health",
                ].map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleCheckboxArray("interests", interest)}
                    className={`px-2 py-1 rounded border ${
                      form.interests.includes(interest)
                        ? "bg-blue-600 border-blue-500"
                        : "bg-slate-900 border-slate-700"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Preferred industries</label>
              <div className="flex flex-wrap gap-2 text-sm">
                {[
                  "technology",
                  "finance",
                  "healthcare",
                  "manufacturing",
                  "media",
                  "fashion",
                  "consulting",
                  "corporate",
                ].map((ind) => (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => handleCheckboxArray("preferred_industries", ind)}
                    className={`px-2 py-1 rounded border ${
                      form.preferred_industries.includes(ind)
                        ? "bg-emerald-600 border-emerald-500"
                        : "bg-slate-900 border-slate-700"
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Rate your skills (1–5)</label>
              <div className="space-y-3 text-sm">
                {(
                  [
                    "programming",
                    "python",
                    "sql",
                    "statistics",
                    "machine_learning",
                    "communication",
                    "problem_solving",
                  ] as (keyof typeof skills)[]
                ).map((skillKey) => (
                  <div key={skillKey} className="flex items-center gap-3">
                    <span className="w-40 capitalize">
                      {skillKey.replace(/_/g, " ")}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={5}
                      value={skills[skillKey]}
                      onChange={(e) => handleSkillChange(skillKey, Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-6 text-right">{skills[skillKey]}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded text-sm"
            >
              {loading ? "Analyzing..." : "Generate Career Paths"}
            </button>
          </form>
        </section>

        <section className="w-full md:w-1/2 p-6">
          <h2 className="text-lg font-semibold mb-4">Recommendations Dashboard</h2>

          {error && <p className="text-red-400 mb-4">{error}</p>}

          {!recs && !loading && (
            <p className="text-sm text-slate-400">
              Fill in your profile on the left and click "Generate Career Paths" to see personalized recommendations here.
            </p>
          )}

          {loading && <p className="text-sm text-slate-400">Crunching your profile…</p>}

          {recs && !loading && (
            <div className="space-y-4">
              {recs.map((rec) => (
                <div key={rec.role_id} className="border border-slate-800 rounded-lg p-4 bg-slate-900/40">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-base">
                      {rec.name}{" "}
                      <span className="text-xs text-slate-400">
                        ({rec.category})
                      </span>
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-600/20 text-blue-300">
                      {rec.match_score}% match
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">{rec.description}</p>

                  <p className="text-xs font-medium mb-1">Why this fits you</p>
                  <ul className="list-disc list-inside text-xs text-slate-300 mb-2">
                    {rec.why_fit.map((reason, idx) => (
                      <li key={idx}>{reason}</li>
                    ))}
                  </ul>

                  <p className="text-xs font-medium mb-1">Skill gap</p>
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-300">
                    <div>
                      <p className="font-semibold mb-1 text-emerald-300">You already have</p>
                      <p>{rec.skill_gap.have.map((s) => s.skill).join(", ") || "None yet"}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1 text-amber-300">Improve</p>
                      <p>
                        {rec.skill_gap.improve
                          .map((s) => `${s.skill} (${s.user_level}→${s.req_level})`)
                          .join(", ") || "None"}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1 text-red-300">Missing</p>
                      <p>{rec.skill_gap.missing.map((s) => s.skill).join(", ") || "None"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
