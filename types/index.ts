export interface User {
  id: string;
  name?: string;
  email: string;
  image?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  inviteCode: string;
  image?: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomMembership {
  id: string;
  role: "OWNER" | "MODERATOR" | "MEMBER";
  joinedAt: Date;
  userId: string;
  roomId: string;
}

export interface MovieSuggestion {
  id: string;
  tmdbId: number;
  title: string;
  overview?: string;
  posterPath?: string;
  releaseDate?: string;
  runtime?: number;
  genres: string[];
  suggestedById: string;
  roomId: string;
  createdAt: Date;
}

export interface Vote {
  id: string;
  userId: string;
  movieId: string;
  roomId: string;
  createdAt: Date;
}

export interface WatchEvent {
  id: string;
  scheduledFor: Date;
  status: "SCHEDULED" | "LIVE" | "COMPLETED" | "CANCELLED";
  streamingUrl?: string;
  externalUrl?: string;
  syncTimestamp?: number;
  isPlaying: boolean;
  hostId: string;
  movieId: string;
  roomId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  authorId: string;
  roomId: string;
  eventId?: string;
  createdAt: Date;
}

export interface Reaction {
  id: string;
  type: "LIKE" | "LOVE" | "LAUGH" | "SURPRISED" | "SAD" | "ANGRY";
  timestamp?: number;
  userId: string;
  roomId: string;
  eventId?: string;
  createdAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
