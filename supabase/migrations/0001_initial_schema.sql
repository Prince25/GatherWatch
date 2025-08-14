-- Gather&Watch Database Schema for Supabase
-- This file contains the SQL schema for the Supabase database
-- Enable Row Level Security for all tables

-- Create custom types
CREATE TYPE room_member_role AS ENUM ('OWNER', 'MODERATOR', 'MEMBER');
CREATE TYPE watch_event_status AS ENUM ('SCHEDULED', 'LIVE', 'COMPLETED', 'CANCELLED');
CREATE TYPE reaction_type AS ENUM ('LIKE', 'LOVE', 'LAUGH', 'SURPRISED', 'SAD', 'ANGRY');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT,
    bio TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Rooms table
CREATE TABLE public.rooms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    invite_code TEXT UNIQUE DEFAULT gen_random_uuid()::text,
    image_url TEXT,
    owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Room memberships
CREATE TABLE public.room_memberships (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE NOT NULL,
    role room_member_role DEFAULT 'MEMBER',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, room_id)
);

-- Movie suggestions
CREATE TABLE public.movie_suggestions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tmdb_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    overview TEXT,
    poster_path TEXT,
    release_date TEXT,
    runtime INTEGER,
    genres JSONB DEFAULT '[]',
    suggested_by_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(tmdb_id, room_id)
);

-- Votes
CREATE TABLE public.votes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    movie_id UUID REFERENCES public.movie_suggestions(id) ON DELETE CASCADE NOT NULL,
    room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, movie_id)
);

-- Watch events
CREATE TABLE public.watch_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
    status watch_event_status DEFAULT 'SCHEDULED',
    streaming_url TEXT,
    external_url TEXT,
    sync_timestamp INTEGER DEFAULT 0,
    is_playing BOOLEAN DEFAULT false,
    host_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    movie_id UUID REFERENCES public.movie_suggestions(id) ON DELETE CASCADE NOT NULL,
    room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Chat messages
CREATE TABLE public.chat_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE NOT NULL,
    event_id UUID REFERENCES public.watch_events(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Reactions
CREATE TABLE public.reactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type reaction_type NOT NULL,
    timestamp INTEGER,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE NOT NULL,
    event_id UUID REFERENCES public.watch_events(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Watch event participants (many-to-many)
CREATE TABLE public.watch_event_participants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    event_id UUID REFERENCES public.watch_events(id) ON DELETE CASCADE NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, event_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.movie_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watch_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watch_event_participants ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies

-- Profiles: Users can read all profiles, but only update their own
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Rooms: Public rooms visible to all, private rooms only to members
CREATE POLICY "Public rooms are viewable by everyone" ON public.rooms
    FOR SELECT USING (is_public = true);

CREATE POLICY "Room members can view private rooms" ON public.rooms
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.room_memberships 
            WHERE room_id = rooms.id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Room owners can update rooms" ON public.rooms
    FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Authenticated users can create rooms" ON public.rooms
    FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND owner_id = auth.uid());

-- Room memberships: Members can view memberships of their rooms
CREATE POLICY "Users can view room memberships for their rooms" ON public.room_memberships
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.room_memberships AS rm 
            WHERE rm.room_id = room_memberships.room_id AND rm.user_id = auth.uid()
        )
    );

-- Movie suggestions: Room members can view and create suggestions
CREATE POLICY "Room members can view movie suggestions" ON public.movie_suggestions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.room_memberships 
            WHERE room_id = movie_suggestions.room_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Room members can create movie suggestions" ON public.movie_suggestions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.room_memberships 
            WHERE room_id = movie_suggestions.room_id AND user_id = auth.uid()
        ) AND suggested_by_id = auth.uid()
    );

-- Votes: Room members can view and create votes
CREATE POLICY "Room members can view votes" ON public.votes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.room_memberships 
            WHERE room_id = votes.room_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Room members can create votes" ON public.votes
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.room_memberships 
            WHERE room_id = votes.room_id AND user_id = auth.uid()
        ) AND user_id = auth.uid()
    );

-- Watch events: Room members can view events
CREATE POLICY "Room members can view watch events" ON public.watch_events
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.room_memberships 
            WHERE room_id = watch_events.room_id AND user_id = auth.uid()
        )
    );

-- Chat messages: Room members can view and create messages
CREATE POLICY "Room members can view chat messages" ON public.chat_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.room_memberships 
            WHERE room_id = chat_messages.room_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Room members can create chat messages" ON public.chat_messages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.room_memberships 
            WHERE room_id = chat_messages.room_id AND user_id = auth.uid()
        ) AND author_id = auth.uid()
    );

-- Create indexes for better performance
CREATE INDEX idx_rooms_owner_id ON public.rooms(owner_id);
CREATE INDEX idx_room_memberships_user_id ON public.room_memberships(user_id);
CREATE INDEX idx_room_memberships_room_id ON public.room_memberships(room_id);
CREATE INDEX idx_movie_suggestions_room_id ON public.movie_suggestions(room_id);
CREATE INDEX idx_votes_room_id ON public.votes(room_id);
CREATE INDEX idx_votes_movie_id ON public.votes(movie_id);
CREATE INDEX idx_watch_events_room_id ON public.watch_events(room_id);
CREATE INDEX idx_chat_messages_room_id ON public.chat_messages(room_id);
CREATE INDEX idx_reactions_room_id ON public.reactions(room_id);

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.rooms
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.watch_events
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
