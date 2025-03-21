
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusSquare, BookOpen, Award, BarChart3 } from 'lucide-react';
import QuizCard from '@/components/QuizCard';

// Sample featured quizzes
const featuredQuizzes = [
  {
    id: '1',
    title: 'Science Fundamentals',
    description: 'Test your knowledge of basic scientific principles and discoveries',
    questionCount: 10,
    category: 'Science',
    author: 'Admin',
    timeLimit: 15,
    difficulty: 'Medium' as const,
    attemptCount: 124,
    topScore: 95,
  },
  {
    id: '2',
    title: 'World Geography',
    description: 'Explore countries, capitals, and geographic wonders',
    questionCount: 15,
    category: 'Geography',
    author: 'Admin',
    timeLimit: 20,
    difficulty: 'Hard' as const,
    attemptCount: 98,
    topScore: 88,
  },
  {
    id: '3',
    title: 'History Highlights',
    description: 'Journey through important historical events and figures',
    questionCount: 12,
    category: 'History',
    author: 'Admin',
    timeLimit: 18,
    difficulty: 'Easy' as const,
    attemptCount: 156,
    topScore: 92,
  },
];

const Index = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative px-4 py-16 sm:py-24 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5MSA0IDQgNCAzLTEuNzkxIDMtNHptMC0yOGMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDMuNzkxIDQgNCA0IDQtMS43OTEgNC00em0wIDU2YzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        <div className="relative container max-w-6xl mx-auto px-4 text-center">
          <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
            The Ultimate Quiz Platform
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight md:leading-tight lg:leading-tight animate-slide-up opacity-0 text-balance" style={{ animationDelay: '0.4s' }}>
            Challenge Your Knowledge <br className="hidden sm:block" />
            Create, Share, Compete
          </h1>
          <p className="max-w-2xl mx-auto text-white/90 text-lg md:text-xl mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.6s' }}>
            Create engaging quizzes, test your knowledge, and compete with others on our interactive quiz platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up opacity-0" style={{ animationDelay: '0.8s' }}>
            <Button asChild size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
              <Link to="/take-quiz">Start Quizzing</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/20">
              <Link to="/create-quiz">Create Quiz</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trivion makes it easy to create, share and take quizzes on any topic. Our platform is designed for everyone from teachers to trivia enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="overflow-hidden hover-lift">
            <div className="h-2 bg-primary"></div>
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <PlusSquare size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Create</h3>
              <p className="text-muted-foreground text-sm">
                Build engaging quizzes with multiple-choice questions, add explanations and set time limits.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover-lift">
            <div className="h-2 bg-accent"></div>
            <CardContent className="pt-6">
              <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen size={24} className="text-accent" />
              </div>
              <h3 className="text-lg font-medium mb-2">Take</h3>
              <p className="text-muted-foreground text-sm">
                Attempt quizzes from various categories and test your knowledge in different subjects.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover-lift">
            <div className="h-2 bg-yellow-500"></div>
            <CardContent className="pt-6">
              <div className="rounded-full bg-yellow-500/10 w-12 h-12 flex items-center justify-center mb-4">
                <Award size={24} className="text-yellow-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Compete</h3>
              <p className="text-muted-foreground text-sm">
                Score points, earn badges and climb the leaderboard as you showcase your knowledge.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover-lift">
            <div className="h-2 bg-indigo-500"></div>
            <CardContent className="pt-6">
              <div className="rounded-full bg-indigo-500/10 w-12 h-12 flex items-center justify-center mb-4">
                <BarChart3 size={24} className="text-indigo-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Analyze</h3>
              <p className="text-muted-foreground text-sm">
                Track your progress and performance with detailed analytics and insights.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Quizzes */}
      <section className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Quizzes</h2>
            <p className="text-muted-foreground">
              Explore our most popular quizzes and challenge yourself
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/take-quiz">View All Quizzes</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredQuizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              description={quiz.description}
              questionCount={quiz.questionCount}
              category={quiz.category}
              author={quiz.author}
              timeLimit={quiz.timeLimit}
              difficulty={quiz.difficulty}
              attemptCount={quiz.attemptCount}
              topScore={quiz.topScore}
              linkTo={`/take-quiz/${quiz.id}`}
              actionText="Start Quiz"
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16 px-4 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Challenge Yourself?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of users who are expanding their knowledge and having fun with our quizzes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/take-quiz">Start Quizzing Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/create-quiz">Create Your Own Quiz</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
