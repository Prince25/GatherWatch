import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Users, Calendar, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Gather&Watch</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/rooms">
              <Button variant="ghost">Explore Rooms</Button>
            </Link>
            <Link href="/auth/signin">
              <Button>Sign In</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Watch Together,
            <br />
            <span className="text-blue-600">Plan Seamlessly</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create movie rooms, vote on what to watch, and enjoy synchronized viewing experiences
            with friends from anywhere in the world.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/auth/signin">
              <Button size="lg" className="text-lg px-8">
                Get Started Free
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="text-lg px-8">
                Try Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Social Rooms</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create private or public movie rooms. Invite friends and build your watch community.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Smart Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Suggest movies, vote together, and schedule the perfect movie night for everyone.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Sync Viewing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Real-time synchronized playback with live chat and reactions. Never miss a moment.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Film className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>AI Enhanced</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get movie recommendations, trivia, and discussion prompts powered by AI.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-600 text-white rounded-2xl p-12">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Watching Together?</h3>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of movie lovers who have made movie nights better with Gather&Watch.
          </p>
          <Link href="/auth/signin">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Create Your First Room
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p>&copy; 2024 Gather&Watch. Made with ❤️ for movie lovers everywhere.</p>
        </div>
      </footer>
    </div>
  );
}
