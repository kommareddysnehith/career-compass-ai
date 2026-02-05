export type Skills = {
  python?: number;
  sql?: number;
  statistics?: number;
  machine_learning?: number;
  data_structures?: number;
  deep_learning?: number;
  cloud?: number;
  programming?: number;
  git?: number;
  databases?: number;
  testing?: number;
  mechanics?: number;
  cad_tools?: number;
  manufacturing?: number;
  automation?: number;
  structural_analysis?: number;
  maths?: number;
  project_management?: number;
  autocad?: number;
  site_management?: number;
  psychological_assessment?: number;
  therapy?: number;
  listening?: number;
  research?: number;
  documentation?: number;
  clinical_medicine?: number;
  diagnosis?: number;
  pharmacology?: number;
  psychotherapy?: number;
  accounting?: number;
  taxation?: number;
  law?: number;
  audit?: number;
  analytics?: number;
  data_analysis?: number;
  communication?: number;
  domain_knowledge?: number;
  writing?: number;
  digital_media?: number;
  editing?: number;
  user_research?: number;
  wireframing?: number;
  design_tools?: number;
  html_css?: number;
  usability_testing?: number;
  sketching?: number;
  fabric_knowledge?: number;
  creativity?: number;
  pattern_making?: number;
  branding?: number;
  problem_solving?: number;
};

export type UserInput = {
  user_type: "student" | "fresher" | "career_change";
  education_level: string;
  education_stream: string;
  current_role?: string | null;
  target_role?: string | null;
  interests: string[];
  skills: Skills;
  preferred_industries: string[];
};

export type Recommendation = {
  role_id: string;
  name: string;
  category: string;
  description: string;
  match_score: number;
  why_fit: string[];
  skill_gap: {
    have: { skill: string; user_level: number; req_level: number }[];
    improve: { skill: string; user_level: number; req_level: number }[];
    missing: { skill: string; req_level: number }[];
  };
};

const API_BASE = "http://127.0.0.1:8000";

export async function getRecommendations(input: UserInput): Promise<Recommendation[]> {
  console.log('Attempting to connect to:', `${API_BASE}/recommend-careers`);
  console.log('Sending data:', input);
  
  const res = await fetch(`${API_BASE}/recommend-careers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  console.log('Received data:', data);
  return data.recommendations as Recommendation[];
}

export async function checkHealth(): Promise<{ message: string }> {
  console.log('Testing connection to:', `${API_BASE}/`);
  
  const res = await fetch(`${API_BASE}/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  
  if (!res.ok) {
    throw new Error(`Health check failed: ${res.status} ${res.statusText}`);
  }
  
  const data = await res.json();
  console.log('Health check response:', data);
  return data;
}