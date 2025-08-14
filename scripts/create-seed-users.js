import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
  );
  throw new Error("Missing environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});


// Users from seed data
const seedUsers = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    email: "alice@example.com",
    password: "password123",
    name: "Alice Johnson",
    bio: "Movie enthusiast and horror fan",
    avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    email: "bob@example.com",
    password: "password123",
    name: "Bob Smith",
    bio: "Comedy and action movie lover",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    email: "charlie@example.com",
    password: "password123",
    name: "Charlie Davis",
    bio: "Sci-fi and fantasy enthusiast",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    email: "diana@example.com",
    password: "password123",
    name: "Diana Wilson",
    bio: "Documentary and drama fan",
    avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
  },
];


// Create seed users in Supabase Auth and profiles table
async function createSeedUsers() {
  console.log("Creating seed users in Supabase Auth...");

  for (const user of seedUsers) {
    try {
      // Create user in auth.users
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        id: user.id,
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: {
          name: user.name,
        },
      });

      if (authError) {
        if (authError.message.includes("already registered")) {
          console.log(`✓ User ${user.email} already exists`);

          // Create/update profile for existing user
          const { error: profileError } = await supabase.from("profiles").upsert({
            id: user.id,
            name: user.name,
            bio: user.bio,
            avatar_url: user.avatar_url,
          });

          if (profileError) {
            console.error(`  ✗ Error creating profile for ${user.email}:`, profileError.message);
          } else {
            console.log(`  ✓ Profile created/updated for ${user.email}`);
          }
        } else {
          console.error(`✗ Error creating user ${user.email}:`, authError.message);
        }
        continue;
      }

      console.log(`✓ Created auth user: ${user.email}`);

      // Wait a moment for the user to be fully created in auth.users
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        name: user.name,
        bio: user.bio,
        avatar_url: user.avatar_url,
      });

      if (profileError) {
        console.error(`  ✗ Error creating profile for ${user.email}:`, profileError.message);
      } else {
        console.log(`  ✓ Created profile for ${user.email}`);
      }
    } catch (error) {
      console.error(`✗ Unexpected error for user ${user.email}:`, error.message);
    }
  }

  console.log("\n✅ Seed users creation completed!");
  console.log("You can now run: npm run db:seed");
}

createSeedUsers().catch(console.error);
