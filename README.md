# QuizZard

A Quiz web application for interactive learning!

## Tech Stack

QuizZard was built using the following technologies:

- SvelteKit
- TypeScript
- TailwindCSS
- Supabase (Database and Auth)

## Setup / Development

Create a new [Supabase](https://supabase.com/) project, 
and go to Settings > API to see your project URL and API 
keys.

Clone the repository and install all the dependencies:

```bash
git clone https://github.com/tomasohCHOM/QuizZard.git
cd QuizZard
npm install
```

Make a new `.env`, following the `.env.example` template 
for the keys needed to connect to Supabase:

```env
PUBLIC_SUPABASE_URL=""
PUBLIC_SUPABASE_ANON_KEY=""
```

Then start the development process:

```bash
npm run dev
```

To build and start in production mode:

```bash
npm run build
npm run preview
```

---

Develped with 🔥 by Tomas