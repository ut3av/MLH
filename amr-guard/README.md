# Antigravity AMR Stewardship Assistant

A patient-specific Antimicrobial Resistance (AMR) clinical decision-support tool.

## Features
- **Multimodal Document Processing:** Analyzes patient history, allergy records, cultures, and medication charts.
- **RAG Knowledge Base:** Retrieves context-aware guidance from WHO AWaRe, ICMR, and local policies.
- **Deterministic Rules Engine:** Flags high-priority stewardship issues like broad-spectrum usage with narrower susceptible options, missing allergy details, and outdated renal labs.
- **Offline Demo Mode:** Built-in demo packets for hackathon reliability.

## Getting Started

### Backend
1. `cd backend`
2. `python -m venv venv`
3. `source venv/bin/activate`
4. `pip install -r requirements.txt`
5. `uvicorn main:app --reload`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`
