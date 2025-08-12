# 🎬 GatherWatch

**Watch Together, Plan Seamlessly**

A social movie night scheduler with real-time watch party experience. Create rooms, vote on movies, and enjoy synchronized viewing with friends from anywhere in the world.



## Features

### Social Movie Rooms
- Create private or public movie rooms
- Invite friends with unique room codes
- Role-based permissions (Owner, Moderator, Member)

### Democratic Movie Selection
- Suggest movies using TMDB database
- Vote on what to watch
- Smart scheduling system

### Synchronized Watch Parties
- Real-time video synchronization
- Support for YouTube and external streaming links
- Live chat during movies
- Real-time reactions and emotes

### AI-Powered Enhancement (Optional)
- Movie recommendations based on group preferences
- Automated trivia generation
- Discussion prompts during intermission
- Plot summaries for late joiners

### Modern UI/UX
- Responsive design with Tailwind CSS
- Beautiful shadcn/ui components
- Dark/light mode support
- Mobile-optimized experience



## Technologies

- **Frontend**: [Next.js 15 (App Router)](https://nextjs.org/), [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui components](https://ui.shadcn.com/)
- **Database**: [Supabase (PostgreSQL)](https://supabase.com/) with auto-generated types
- **Authentication**: [Supabase Auth](https://supabase.com/docs/guides/auth) with Email/Password & Google OAuth
- **Real-time**: 
   - [Supabase Realtime](https://supabase.com/docs/guides/realtime) for database changes
   - [Ably](https://ably.com/) for complex real-time features (chat, player sync)
- **File Storage**: [Supabase Storage](https://supabase.com/docs/guides/storage) with CDN
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) for client-side state
- **Movie Data**: [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api)
- **AI Features**: [OpenAI API](https://platform.openai.com/docs/) (optional)



## Getting Started

### Prerequisites

- Node.js 22 or later
- Supabase account
- Ably account
- TMDB API key
- Google OAuth credentials (optional)
- OpenAI API key (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:Prince25/GatherWatch.git
   cd gatherwatch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables in `.env`:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
   SUPABASE_PROJECT_ID="your-supabase-project-id"
   
   # Ably (Real-time messaging)
   NEXT_PUBLIC_ABLY_API_KEY="your-ably-api-key"
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # TMDB API
   TMDB_API_KEY="your-tmdb-api-key"
   TMDB_ACCESS_TOKEN="your-tmdb-access-token"
   
   # OpenAI (Optional)
   OPENAI_API_KEY="your-openai-api-key"
   ```

4. **Set up the database**
   ```bash
   # Set up Supabase CLI (optional but recommended)
   npm install -g supabase

   # Login to Supabase
   supabase login

   # Initialize Supabase in your project
   supabase init

   # Apply database schema
   supabase db push

   # Generate TypeScript types
   npm run db:types

   # Seed with demo data (optional)
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.



## Setup Requirements

### Supabase Setup
1. Create account at [supabase.com](https://supabase.com)
2. Create new project named `gatherwatch`
3. Go to Authentication > Settings and enable email auth
4. For Google OAuth: Authentication > Providers > Enable Google
5. Create Storage buckets: `avatars` and `room-images` (both public)
6. Copy your project URL, anon key, service role key, and project ID to `.env`

### Ably Setup
1. Create account at [ably.com](https://ably.com)
2. Create new app
3. Copy API key to `.env` as `NEXT_PUBLIC_ABLY_API_KEY`

### TMDB API (Required)
1. Create account at [themoviedb.org](https://www.themoviedb.org/)
2. Go to Settings > API and request API key
3. Add both API key and access token to `.env`

### Google OAuth (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project and enable Google+ API
3. Create OAuth 2.0 credentials
4. Add redirect URIs: `http://localhost:3000/auth/callback` (dev), `https://yourdomain.com/auth/callback` (prod)
5. Add client ID and secret to both `.env` and Supabase Auth settings



## Architecture

### State Management
- **Supabase**: Persistent data (rooms, votes, chat history, profiles)
- **Zustand**: UI state (modals, local volume, optimistic updates)
- **Ably**: Complex real-time (live chat, video sync, presence)

### Real-time Channels
- `room:ID:lobby` - Presence, system notices, typing indicators
- `room:ID:chat` - Live chat messages and reactions  
- `room:ID:player` - Video sync (play/pause/seek)
- `room:ID:signals` - WebRTC signaling
- `room:ID:admin` - Moderation events

### Database
- **Supabase PostgreSQL** with Row Level Security (RLS)
- Auto-generated TypeScript types
- Real-time subscriptions for instant UI updates



## Project Structure

```
gatherwatch/
├── app/                   # Next.js App Router
│   ├── api/               # API routes
│   │   └── rooms/         # Room API endpoints
│   ├── auth/              # Authentication pages
│   │   ├── signin/        # Sign in page
│   │   └── signup/        # Sign up page
│   ├── dashboard/         # User dashboard
│   ├── rooms/             # Room pages
│   │   ├── [id]/          # Dynamic room detail page
│   │   └── page.tsx       # Rooms listing
│   ├── watch/             # Watch party interface
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── providers.tsx      # App providers
├── components/            # Reusable components
│   ├── auth/             # Auth components
│   │   └── signin-form.tsx # Sign-in form component
│   ├── rooms/            # Room-specific components
│   │   └── index.ts      # Room components export
│   ├── ui/               # shadcn/ui components
│   │   ├── alert.tsx     # Alert component
│   │   ├── avatar.tsx    # Avatar component
│   │   ├── button.tsx    # Button component
│   │   ├── card.tsx      # Card component
│   │   ├── input.tsx     # Input component
│   │   └── label.tsx     # Label component
│   └── video/            # Video player components
│       └── index.ts      # Video components export
├── lib/                  # Utility libraries
│   ├── ably/             # Ably real-time client
│   │   └── client.ts     # Ably client setup
│   ├── actions/          # Server Actions
│   │   └── rooms.ts      # Room actions
│   ├── stores/           # Zustand state management
│   │   └── index.ts      # Global stores
│   ├── supabase/         # Supabase client configurations
│   │   ├── client.ts     # Client-side Supabase instance
│   │   ├── server.ts     # Server-side Supabase instance
│   │   └── types.ts      # Database types
│   ├── tmdb.ts           # TMDB API client
│   └── utils.ts          # Utility functions
├── supabase/             # Database schema and configuration
│   ├── migrations/       # SQL migration files
│   └── config.toml       # Supabase configuration
├── types/                # TypeScript type definitions
├── public/               # Static assets
├── .env.example          # Environment variables template
├── .eslintrc.json        # ESLint configuration
├── .prettierrc.json      # Prettier configuration
├── .gitignore            # Git ignore rules
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```



## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm run db:types` - Generate TypeScript types from Supabase
- `npm run db:reset` - Reset Supabase database
- `npm run db:seed` - Seed database with demo data



## Usage

### Authentication

The app supports:
1. **Email/Password authentication** - Create account locally
2. **Google OAuth** - Sign in with Google account (optional)

### Creating a Room

1. Sign up with email/password or sign in with Google
2. Click "Create Room" on the dashboard
3. Set room name, description, and privacy settings
4. Share the invite code with friends

### Planning a Movie Night

1. Join or create a room
2. Use the movie search to find films
3. Vote on suggestions from the group
4. Schedule the watch party for a convenient time

### Hosting a Watch Party

1. Start the scheduled watch event
2. Share your screen or paste a streaming URL
3. Use the sync controls to keep everyone together
4. Enjoy live chat and reactions during the movie



## Database Schema

The application uses PostgreSQL with the following main entities:

- **Users** - User accounts and profiles
- **Rooms** - Movie rooms and settings
- **RoomMemberships** - User-room relationships with roles
- **MovieSuggestions** - Movies suggested for rooms
- **Votes** - User votes on movie suggestions
- **WatchEvents** - Scheduled watch parties
- **ChatMessages** - Real-time chat messages
- **Reactions** - User reactions during watch parties



## API Endpoints

### Authentication
- `GET/POST /api/auth/*` - NextAuth.js endpoints

### Rooms
- `GET /api/rooms` - List user's rooms
- `POST /api/rooms` - Create new room
- `GET /api/rooms/[id]` - Get room details
- `PUT /api/rooms/[id]` - Update room
- `DELETE /api/rooms/[id]` - Delete room

### Movies
- `GET /api/movies/search` - Search TMDB movies
- `POST /api/rooms/[id]/suggestions` - Add movie suggestion
- `POST /api/rooms/[id]/votes` - Vote on suggestion

### Watch Events
- `POST /api/rooms/[id]/events` - Create watch event
- `GET /api/events/[id]` - Get event details
- `PUT /api/events/[id]/sync` - Update sync status



## Customization

### Theming

The app uses CSS variables for theming. Modify `app/globals.css` to customize colors:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* ... other variables */
}
```

### Adding New OAuth Providers

1. Add provider configuration in `lib/auth.ts`
2. Add environment variables
3. Update the sign-in page UI



## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Other Platforms

The app can be deployed on any platform supporting Node.js:

1. Build the application: `npm run build`
2. Set production environment variables
3. Start the server: `npm start`



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy watching! 🍿**
