from typing import List, Dict, Optional

# WHO AWaRe Classification Data for common Indian ICU antibiotics
AWARE_DATABASE = {
    # Tier 1: Access (Lowest resistance potential, Lowest Cost, Narrowest Spectrum)
    "Amoxicillin": {"tier": 1, "category": "Access", "default_route": "Oral", "avg_daily_cost_inr": 40, "spectrum_level": "Narrow"},
    "Amoxicillin-Clavulanate": {"tier": 1, "category": "Access", "default_route": "Oral/IV", "avg_daily_cost_inr": 150, "spectrum_level": "Narrow"},
    "Ampicillin": {"tier": 1, "category": "Access", "default_route": "IV", "avg_daily_cost_inr": 60, "spectrum_level": "Narrow"},
    "Cefazolin": {"tier": 1, "category": "Access", "default_route": "IV", "avg_daily_cost_inr": 90, "spectrum_level": "Narrow"},
    "Cefalexin": {"tier": 1, "category": "Access", "default_route": "Oral", "avg_daily_cost_inr": 50, "spectrum_level": "Narrow"},
    "Co-trimoxazole": {"tier": 1, "category": "Access", "default_route": "Oral/IV", "avg_daily_cost_inr": 20, "spectrum_level": "Narrow"},
    "Nitrofurantoin": {"tier": 1, "category": "Access", "default_route": "Oral", "avg_daily_cost_inr": 60, "spectrum_level": "Narrow"},
    "Gentamicin": {"tier": 1, "category": "Access", "default_route": "IV", "avg_daily_cost_inr": 30, "spectrum_level": "Narrow"},
    "Doxycycline": {"tier": 1, "category": "Access", "default_route": "Oral", "avg_daily_cost_inr": 40, "spectrum_level": "Narrow"},
    
    # Tier 2: Watch (Higher resistance potential, Moderate/High Cost, Broader Spectrum)
    "Ciprofloxacin": {"tier": 2, "category": "Watch", "default_route": "Oral/IV", "avg_daily_cost_inr": 80, "spectrum_level": "Broad"},
    "Levofloxacin": {"tier": 2, "category": "Watch", "default_route": "Oral/IV", "avg_daily_cost_inr": 120, "spectrum_level": "Broad"},
    "Ceftriaxone": {"tier": 2, "category": "Watch", "default_route": "IV", "avg_daily_cost_inr": 250, "spectrum_level": "Broad"},
    "Cefotaxime": {"tier": 2, "category": "Watch", "default_route": "IV", "avg_daily_cost_inr": 200, "spectrum_level": "Broad"},
    "Piperacillin-Tazobactam": {"tier": 2, "category": "Watch", "default_route": "IV", "avg_daily_cost_inr": 1500, "spectrum_level": "Broad"},
    "Cefepime": {"tier": 2, "category": "Watch", "default_route": "IV", "avg_daily_cost_inr": 800, "spectrum_level": "Broad"},
    "Meropenem": {"tier": 2, "category": "Watch", "default_route": "IV", "avg_daily_cost_inr": 3200, "spectrum_level": "Ultra-Broad"},
    "Imipenem": {"tier": 2, "category": "Watch", "default_route": "IV", "avg_daily_cost_inr": 3500, "spectrum_level": "Ultra-Broad"},
    "Azithromycin": {"tier": 2, "category": "Watch", "default_route": "Oral/IV", "avg_daily_cost_inr": 100, "spectrum_level": "Broad"},
    "Vancomycin": {"tier": 2, "category": "Watch", "default_route": "IV", "avg_daily_cost_inr": 1200, "spectrum_level": "Broad"},
    
    # Tier 3: Reserve (Last resort / Superbugs, Highest Cost / High Toxicity)
    "Colistin": {"tier": 3, "category": "Reserve", "default_route": "IV", "avg_daily_cost_inr": 5500, "spectrum_level": "Ultra-Broad"},
    "Polymyxin B": {"tier": 3, "category": "Reserve", "default_route": "IV", "avg_daily_cost_inr": 6000, "spectrum_level": "Ultra-Broad"},
    "Linezolid": {"tier": 3, "category": "Reserve", "default_route": "Oral/IV", "avg_daily_cost_inr": 900, "spectrum_level": "Broad"},
    "Tigecycline": {"tier": 3, "category": "Reserve", "default_route": "IV", "avg_daily_cost_inr": 4500, "spectrum_level": "Ultra-Broad"},
    "Ceftazidime-Avibactam": {"tier": 3, "category": "Reserve", "default_route": "IV", "avg_daily_cost_inr": 18000, "spectrum_level": "Ultra-Broad"},
    "Fosfomycin": {"tier": 3, "category": "Reserve", "default_route": "IV", "avg_daily_cost_inr": 2000, "spectrum_level": "Broad"},
}

def get_drug_details(drug_name: str) -> Optional[Dict]:
    """Helper to do case-insensitive lookup of drug details."""
    for key, data in AWARE_DATABASE.items():
        if key.lower() == drug_name.lower():
            return {"generic_name": key, **data}
    return None

def evaluate_deescalation(current_empirical_drug: str, susceptible_drugs: List[str]) -> Dict:
    """
    Evaluates if de-escalation is possible based on AWaRe tiers.
    """
    current_drug_info = get_drug_details(current_empirical_drug)
    
    if not current_drug_info:
         return {
            "deescalation_possible": False,
            "message": f"Current drug '{current_empirical_drug}' not found in AWaRe database.",
            "candidates": []
         }

    current_tier = current_drug_info['tier']
    current_cost = current_drug_info['avg_daily_cost_inr']
    
    candidates = []
    
    for drug in susceptible_drugs:
        drug_info = get_drug_details(drug)
        if drug_info:
            if drug_info['tier'] < current_tier or (drug_info['tier'] == current_tier and drug_info['avg_daily_cost_inr'] < current_cost and "Oral" in drug_info['default_route']):
                 candidates.append(drug_info)
                 
    # Sort candidates by tier (lower is better), then by route (Oral preferred), then by cost (lower is better)
    candidates.sort(key=lambda x: (x['tier'], 0 if "Oral" in x['default_route'] else 1, x['avg_daily_cost_inr']))
    
    if candidates:
        best_candidate = candidates[0]
        savings = current_cost - best_candidate['avg_daily_cost_inr']
        return {
            "deescalation_possible": True,
            "current_drug": current_drug_info,
            "recommended_candidate": best_candidate,
            "daily_savings_inr": savings,
            "all_candidates": candidates
        }
    else:
        return {
            "deescalation_possible": False,
            "current_drug": current_drug_info,
            "message": "No safer or cheaper susceptible alternatives found.",
            "candidates": []
        }
