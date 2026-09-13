# Graph Report - MLH  (2026-09-13)

## Corpus Check
- Corpus is ~6,425 words - fits in a single context window. You may not need a graph.

## Summary
- 101 nodes · 132 edges · 11 communities (10 shown, 1 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Backend Engine & Clinical Guidelines
- Frontend Core Dependencies
- Frontend Build Tooling
- Clinical UI Components
- AWaRe & De-escalation Clinical Rationale
- Oxlint Linter Configuration
- Mock Sample Reports

## God Nodes (most connected - your core abstractions)
1. `analyze_case()` - 11 edges
2. `react` - 9 edges
3. `retrieve_guidelines()` - 6 edges
4. `run_deterministic_rules()` - 5 edges
5. `PatientProfile` - 5 edges
6. `KnowledgeChunk` - 5 edges
7. `scripts` - 5 edges
8. `evaluate_deescalation()` - 4 edges
9. `PatientFact` - 4 edges
10. `MissingInformation` - 4 edges

## Surprising Connections (you probably didn't know these)
- `WHO AWaRe Framework (Access, Watch, Reserve)` --conceptually_related_to--> `evaluate_deescalation()`  [INFERRED]
  README.md → amr-guard/backend/aware_data.py
- `Deterministic Stewardship Rules Engine` --implements--> `run_deterministic_rules()`  [INFERRED]
  amr-guard/README.md → amr-guard/backend/main.py
- `Multimodal Clinical Document Processing` --conceptually_related_to--> `analyze_case()`  [INFERRED]
  amr-guard/README.md → amr-guard/backend/main.py
- `Offline Demo Packet System` --implements--> `analyze_case()`  [INFERRED]
  amr-guard/README.md → amr-guard/backend/main.py
- `RAG Knowledge Base Engine` --implements--> `retrieve_guidelines()`  [INFERRED]
  amr-guard/README.md → amr-guard/backend/rag_knowledge_base.py

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **AMR Clinical Stewardship Intervention Loop** — readme_hour0_empirical_therapy, readme_hour72_ast_culture, readme_deescalation_bottleneck, readme_who_aware_framework, amr_guard_readme_deterministic_rules [INFERRED 0.95]

## Communities (11 total, 1 thin omitted)

### Community 0 - "Backend Engine & Clinical Guidelines"
Cohesion: 0.21
Nodes (18): analyze_case(), run_deterministic_rules(), Simple keyword-based retrieval for the MVP. Matches any keyword in the chunk's…, retrieve_guidelines(), AnalyzeResponse, Conflict, KnowledgeChunk, MissingInformation (+10 more)

### Community 1 - "Frontend Core Dependencies"
Cohesion: 0.11
Nodes (18): dependencies, canvas-confetti, lucide-react, react, react-dom, name, private, scripts (+10 more)

### Community 2 - "Frontend Build Tooling"
Cohesion: 0.12
Nodes (17): devDependencies, autoprefixer, oxlint, postcss, tailwindcss, @types/react, @types/react-dom, vite (+9 more)

### Community 3 - "Clinical UI Components"
Cohesion: 0.21
Nodes (7): App(), ExportReviewCard(), MultiDocumentUpload(), Navbar(), PatientSummaryPanel(), ReviewFlagsDashboard(), react

### Community 4 - "AWaRe & De-escalation Clinical Rationale"
Cohesion: 0.18
Nodes (12): evaluate_deescalation(), get_drug_details(), Helper to do case-insensitive lookup of drug details., Evaluates if de-escalation is possible based on AWaRe tiers., Antimicrobial Resistance (AMR) Crisis, AMR-Guard Clinical Cognitive Copilot, De-escalation Bottleneck in ICUs, Hour 0 Empirical Therapy (Broad-Spectrum IV) (+4 more)

### Community 5 - "Oxlint Linter Configuration"
Cohesion: 0.25
Nodes (7): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema, oxc, warn

## Knowledge Gaps
- **33 isolated node(s):** `$schema`, `oxc`, `react/rules-of-hooks`, `warn`, `name` (+28 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Frontend Build Tooling` to `Frontend Core Dependencies`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `ICMR AMRSN Stewardship Guidelines` connect `AWaRe & De-escalation Clinical Rationale` to `Backend Engine & Clinical Guidelines`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `analyze_case()` (e.g. with `AnalyzeResponse` and `MissingInformation`) actually correct?**
  _`analyze_case()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `retrieve_guidelines()` (e.g. with `KnowledgeChunk` and `RAG Knowledge Base Engine`) actually correct?**
  _`retrieve_guidelines()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `oxc`, `react/rules-of-hooks` to the rest of the system?**
  _33 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Frontend Core Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `Frontend Build Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._