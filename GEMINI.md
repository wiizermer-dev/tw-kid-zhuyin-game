# 台灣注音大冒險 (Taiwanese Zhuyin Adventure) - Project Context

## Project Overview
**台灣注音大冒險** is an interactive educational web application designed to help children in Taiwan learn and practice **Zhuyin (Bopomofo)**. The project features a gamified experience with a "Taiwan Round-the-Island" (環島) theme, offering a modern "Adventure Mode" alongside a "Classic Mode".

### Core Technologies
- **Frontend Framework:** [Svelte 5](https://svelte.dev/) (utilizing runes like `$state`, `$derived`, `$effect`)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Database:** [Supabase](https://supabase.com/) (for leaderboards and user data)
- **Styling:** Vanilla CSS with a comprehensive custom design system (`theme.css`)
- **State Management:** Svelte's native reactivity and `LocalStorage` for progress persistence.

---

## Directory Structure
- `src/components/`: Modern UI components for Adventure Mode.
    - `MainMenu.svelte`: The entry point for adventure mode.
    - `GameMap.svelte`: Interactive map of Taiwan with 10 chapters.
    - `ReadingGameNew.svelte`: The primary gameplay component.
    - `original/`: Backup of the legacy "Classic Mode" components.
- `src/data/`: Massive question bank and game configuration.
    - `chapters.js`: Definition of the 100 levels across 10 Taiwan-themed chapters.
    - `wordBank.js`: Core vocabulary list (450+ items).
    - `questionBankIndex.js`: Central index for specialized question categories (Idioms, Poetry, Classical Literature, etc.).
- `src/lib/`: Logic and utility functions.
    - `questionGenerator.js`: Logic for selecting and formatting questions.
    - `questionTracker.js`: Logic to prevent question repetition using `LocalStorage`.
    - `supabase.js`: Supabase client initialization.
- `src/styles/`:
    - `theme.css`: Custom CSS variables (Taiwan-themed colors: `--tw-blue`, `--tw-tea`, etc.) and utility classes.
    - `animations.css`: Library of 30+ animations for feedback and transitions.

---

## Building and Running

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## Development Conventions

### 1. Svelte 5 Usage
The project has been migrated to **Svelte 5**. When adding new components or features:
- Use **Runes** (`$state`, `$derived`, `$props`) instead of the legacy `let` or `export let` syntax where applicable (though some files might still be in transition).
- Prefer snippets for reusable UI fragments within components.

### 2. Styling System
Always use the established design tokens in `src/styles/theme.css`:
- **Colors:** Use `--tw-blue` (Taiwan Blue), `--tw-tea` (Pearl Milk Tea), `--tw-mango` (Mango Yellow).
- **Aesthetics:** Use classes like `.postcard` for game cards and `.paper-texture` for backgrounds.
- **Animations:** Reference `animations.css` for consistent feedback (e.g., `animate-bounce-in`, `animate-shake`).

### 3. Question Bank & Logic
- **Prevention of Repetition:** The game uses `QuestionTracker` (`src/lib/questionTracker.js`) to ensure students don't see the same question too often. Always wrap question selection logic with `markAsUsed()` and `filterUnused()`.
- **Difficulty Scaling:** Levels scale from 1 to 100. Higher levels pull from harder categories (Idioms, Classical Chinese) defined in `src/data/questionBankIndex.js`.

### 4. Database (Supabase)
- Leaderboard data is handled via Supabase. Ensure `.env` is configured for local development if database features are being modified.

---

## Recent Milestones (Phase 1.5)
- **Question Bank Expansion:** Increased to 457+ unique questions.
- **Repetition Control:** Implemented `QuestionTracker` with 80% usage reset logic.
- **Visual Overhaul:** Complete Taiwan-themed UI with responsive postcard designs.

## Testing Strategy
- **Manual Verification:** Test both "Classic" and "Adventure" modes using the toggle in the main menu.
- **Responsiveness:** Ensure components work on mobile screens (320px+).
- **Persistence:** Verify that level progress and "used questions" persist across browser refreshes via `LocalStorage`.
