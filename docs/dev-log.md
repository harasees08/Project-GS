# Dev Log

## Session 1 — [04/05/2026]

### What we built
- PPL Oral Exam Simulator (OralExamBot.jsx)
- React/Vite frontend scaffolded inside the repo

### Features
- 12 question categories covering all PPL oral exam topics
- 100+ questions in the bank
- AI evaluates answers: score /10, what you got right, what you missed, correct answer, improvement tips
- "I don't know" button gives a topic overview
- Running stats: questions asked, average score, best score

### Tech used
- React + Vite (frontend)
- Claude API (claude-sonnet-4) for answer evaluation

### How to run
npm run dev → http://localhost:5173

### Next steps
- Add progress dashboard showing weak categories
- Add question history saved to localStorage
- Add backend so API key is secure for deployment
- Add voice input/output for true oral exam feel
- Expand question bank from FAA ACS
