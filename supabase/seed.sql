-- Gather&Watch Seed Data
-- This file contains comprehensive sample data for development and testing
-- Note: This file runs after migrations, so all tables should exist

-- Only seed if we don't have existing data
DO $$
BEGIN
  -- Skip seeding if rooms already exist
  IF EXISTS (SELECT 1 FROM public.rooms LIMIT 1) THEN
    RAISE NOTICE 'Seed data already exists, skipping...';
    RETURN;
  END IF;

  -- Note: Users and profiles are created by create-seed-users.js
  -- This seed file only handles rooms, movies, and other data that depends on those users

  -- Create sample rooms
  INSERT INTO public.rooms (id, name, description, is_public, invite_code, owner_id, image_url) VALUES
    ('650e8400-e29b-41d4-a716-446655440001', 'Friday Night Horror', 'Weekly horror movie nights every Friday', true, 'HORROR123', '550e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
    ('650e8400-e29b-41d4-a716-446655440002', 'Comedy Central', 'Laughs and good times with comedy classics', true, 'COMEDY456', '550e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1489599316546-1c5d3db14e29?w=400'),
    ('650e8400-e29b-41d4-a716-446655440003', 'Sci-Fi Society', 'Exploring the universe through cinema', false, 'SCIFI789', '550e8400-e29b-41d4-a716-446655440003', 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400'),
    ('650e8400-e29b-41d4-a716-446655440004', 'Family Movie Time', 'Kid-friendly movies for the whole family', true, 'FAMILY321', '550e8400-e29b-41d4-a716-446655440004', 'https://images.unsplash.com/photo-1489599316546-1c5d3db14e29?w=400');

  -- Create room memberships
  INSERT INTO public.room_memberships (user_id, room_id, role) VALUES
    -- Alice's Horror room
    ('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'OWNER'),
    ('550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', 'MEMBER'),
    ('550e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440001', 'MEMBER'),
    
    -- Bob's Comedy room
    ('550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440002', 'OWNER'),
    ('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440002', 'MODERATOR'),
    ('550e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440002', 'MEMBER'),
    
    -- Charlie's Sci-Fi room
    ('550e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440003', 'OWNER'),
    ('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440003', 'MEMBER'),
    
    -- Diana's Family room
    ('550e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440004', 'OWNER'),
    ('550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440004', 'MEMBER'),
    ('550e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440004', 'MEMBER');

  -- Create movie suggestions (using real TMDB IDs)
  INSERT INTO public.movie_suggestions (id, tmdb_id, title, overview, poster_path, release_date, runtime, genres, suggested_by_id, room_id) VALUES
    -- Horror room suggestions
    ('750e8400-e29b-41d4-a716-446655440001', 578, 'Jaws', 'When a killer shark unleashes chaos on a beach community off Cape Cod, it''s up to a local sheriff, a marine biologist, and an old seafarer to hunt the beast down.', '/lxM6kqilAdpdhqUl2biYp5frUxE.jpg', '1975-06-20', 124, '["Horror", "Thriller"]', '550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001'),
    ('750e8400-e29b-41d4-a716-446655440002', 694, 'The Shining', 'Jack Torrance accepts a caretaker job at the isolated Overlook Hotel, where he, along with his wife Wendy and their son Danny, must live for the winter.', '/xazWoLealQwEgqZ89MLZklLZD3k.jpg', '1980-05-23', 146, '["Horror", "Thriller"]', '550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001'),
    
    -- Comedy room suggestions
    ('750e8400-e29b-41d4-a716-446655440003', 274, 'The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', '/9cqNxx0GxF0bflyCy3ZMDRbnaWl.jpg', '1994-09-23', 142, '["Drama"]', '550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440002'),
    ('750e8400-e29b-41d4-a716-446655440004', 105, 'Back to the Future', 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.', '/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg', '1985-07-03', 116, '["Adventure", "Comedy", "Science Fiction"]', '550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440002'),
    
    -- Sci-Fi room suggestions
    ('750e8400-e29b-41d4-a716-446655440005', 155, 'The Dark Knight', 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations.', '/qJ2tW6WMUDux911r6m7haRef0WH.jpg', '2008-07-18', 152, '["Action", "Crime", "Drama"]', '550e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440003'),
    ('750e8400-e29b-41d4-a716-446655440006', 13, 'Forrest Gump', 'A man with a low IQ has accomplished great things in his life and been present during significant historic events.', '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', '1994-07-06', 142, '["Comedy", "Drama", "Romance"]', '550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440003');

  -- Create votes for movie suggestions
  INSERT INTO public.votes (user_id, movie_id, room_id) VALUES
    -- Horror room votes
    ('550e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001'),
    ('550e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001'),
    ('550e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001'),
    
    -- Comedy room votes
    ('550e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440002'),
    ('550e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440002'),
    ('550e8400-e29b-41d4-a716-446655440004', '750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440002');

  -- Create sample watch events
  INSERT INTO public.watch_events (id, scheduled_for, status, host_id, movie_id, room_id) VALUES
    ('850e8400-e29b-41d4-a716-446655440001', NOW() + INTERVAL '3 days', 'SCHEDULED', '550e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001'),
    ('850e8400-e29b-41d4-a716-446655440002', NOW() + INTERVAL '1 week', 'SCHEDULED', '550e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440002'),
    ('850e8400-e29b-41d4-a716-446655440003', NOW() - INTERVAL '2 days', 'COMPLETED', '550e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440003');

  -- Create watch event participants
  INSERT INTO public.watch_event_participants (user_id, event_id) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001'),
    ('550e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440001'),
    ('550e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440002'),
    ('550e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440002'),
    ('550e8400-e29b-41d4-a716-446655440004', '850e8400-e29b-41d4-a716-446655440002'),
    ('550e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440003'),
    ('550e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440003');

  -- Create sample chat messages
  INSERT INTO public.chat_messages (content, author_id, room_id, event_id) VALUES
    ('Hey everyone! Can''t wait for movie night this Friday!', '550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', NULL),
    ('Jaws is such a classic! Perfect choice for horror night.', '550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', NULL),
    ('I''ve got the popcorn ready! 🍿', '550e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440001', NULL),
    ('That was an amazing movie! Thanks for hosting Charlie.', '550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440003'),
    ('Back to the Future never gets old 😄', '550e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440002', NULL);

  -- Create sample reactions
  INSERT INTO public.reactions (type, user_id, room_id, event_id, timestamp) VALUES
    ('LOVE', '550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001', 1440),
    ('LAUGH', '550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440002', 2250),
    ('SURPRISED', '550e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440003', 5400),
    ('LIKE', '550e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440002', NULL, NULL);

  RAISE NOTICE 'Seed data inserted successfully!';
END $$;
