from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional, Any

from careers_data import careers

app = FastAPI()

origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Skills(BaseModel):
    python: Optional[int] = 0
    sql: Optional[int] = 0
    statistics: Optional[int] = 0
    machine_learning: Optional[int] = 0
    data_structures: Optional[int] = 0
    deep_learning: Optional[int] = 0
    cloud: Optional[int] = 0
    programming: Optional[int] = 0
    git: Optional[int] = 0
    databases: Optional[int] = 0
    testing: Optional[int] = 0

    mechanics: Optional[int] = 0
    cad_tools: Optional[int] = 0
    manufacturing: Optional[int] = 0
    automation: Optional[int] = 0
    structural_analysis: Optional[int] = 0
    maths: Optional[int] = 0
    project_management: Optional[int] = 0
    autocad: Optional[int] = 0
    site_management: Optional[int] = 0

    psychological_assessment: Optional[int] = 0
    therapy: Optional[int] = 0
    listening: Optional[int] = 0
    research: Optional[int] = 0
    documentation: Optional[int] = 0
    clinical_medicine: Optional[int] = 0
    diagnosis: Optional[int] = 0
    pharmacology: Optional[int] = 0
    psychotherapy: Optional[int] = 0

    accounting: Optional[int] = 0
    taxation: Optional[int] = 0
    law: Optional[int] = 0
    audit: Optional[int] = 0
    analytics: Optional[int] = 0
    data_analysis: Optional[int] = 0
    communication: Optional[int] = 0
    domain_knowledge: Optional[int] = 0

    writing: Optional[int] = 0
    digital_media: Optional[int] = 0
    editing: Optional[int] = 0
    user_research: Optional[int] = 0
    wireframing: Optional[int] = 0
    design_tools: Optional[int] = 0
    html_css: Optional[int] = 0
    usability_testing: Optional[int] = 0
    sketching: Optional[int] = 0
    fabric_knowledge: Optional[int] = 0
    creativity: Optional[int] = 0
    pattern_making: Optional[int] = 0
    branding: Optional[int] = 0

    problem_solving: Optional[int] = 0

class UserInput(BaseModel):
    user_type: str
    education_level: str
    education_stream: str
    current_role: Optional[str] = None
    target_role: Optional[str] = None
    interests: List[str]
    skills: Skills
    preferred_industries: List[str]

def analyze_skill_gap(user_skills: Dict[str, int], role: Dict):
    required = role.get("required_skills", {})
    have, improve, missing = [], [], []

    for skill, req_level in required.items():
        user_level = user_skills.get(skill, 0)
        if user_level >= req_level:
            have.append({"skill": skill, "user_level": user_level, "req_level": req_level})
        elif user_level > 0:
            improve.append({"skill": skill, "user_level": user_level, "req_level": req_level})
        else:
            missing.append({"skill": skill, "req_level": req_level})

    return have, improve, missing

def score_career(role: Dict, user: UserInput) -> Dict:
    score = 0.0
    reasons: List[str] = []
    user_skill_dict = user.skills.dict()

    interest_weight_total = 30
    skill_weight_total = 40
    education_weight_total = 20
    industry_weight_total = 10

    common_interests = set(user.interests) & set(role.get("good_for_interests", []))
    if common_interests:
        interest_score = min(len(common_interests), 3) / 3 * interest_weight_total
        score += interest_score
        reasons.append(f"Matches your interests in {', '.join(common_interests)}.")

    required_skills = role.get("required_skills", {})
    if required_skills:
        per_skill = skill_weight_total / len(required_skills)
        skill_score = 0.0
        for skill, req_level in required_skills.items():
            if user_skill_dict.get(skill, 0) >= req_level:
                skill_score += per_skill
        if skill_score > 0:
            score += skill_score
            reasons.append("Aligns with several of your existing skills.")

    if user.education_stream in role.get("preferred_streams", []):
        score += education_weight_total
        reasons.append("Fits well with your education stream.")
    elif user.education_level in ["masters", "phd"]:
        score += education_weight_total / 2
        reasons.append("Your advanced education gives flexibility into this role.")

    common_ind = set(user.preferred_industries) & set(role.get("industries", []))
    if common_ind:
        score += industry_weight_total
        reasons.append(f"Matches your preferred industries: {', '.join(common_ind)}.")

    have, improve, missing = analyze_skill_gap(user_skill_dict, role)

    return {
        "role_id": role["id"],
        "name": role["name"],
        "category": role.get("category"),
        "description": role["description"],
        "match_score": round(score, 1),
        "why_fit": reasons,
        "skill_gap": {
            "have": have,
            "improve": improve,
            "missing": missing,
        },
    }

@app.get("/")
def root():
    return {"message": "Career Recommendation API is running"}

@app.post("/recommend-careers")
def recommend_careers(user: UserInput) -> Dict[str, Any]:
    results = [score_career(role, user) for role in careers]
    results = sorted(results, key=lambda x: x["match_score"], reverse=True)
    strong = [r for r in results if r["match_score"] >= 30]
    if not strong:
        strong = results[:3]
    strong = strong[:5]
    return {"recommendations": strong}