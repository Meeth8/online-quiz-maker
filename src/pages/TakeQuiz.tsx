
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertCircle, ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { Question } from '@/components/QuestionForm';
import QuizResults from '@/components/QuizResults';
import QuizCard from '@/components/QuizCard';

// Mock quizzes
const mockQuizzes = [
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
    questions: [
      {
        id: '101',
        text: 'What is the chemical symbol for gold?',
        options: [
          { id: 'a', text: 'Go', isCorrect: false },
          { id: 'b', text: 'Au', isCorrect: true },
          { id: 'c', text: 'Ag', isCorrect: false },
          { id: 'd', text: 'Gd', isCorrect: false },
        ],
        explanation: 'Gold\'s chemical symbol Au comes from the Latin word "aurum".'
      },
      {
        id: '102',
        text: 'Which planet has the most moons?',
        options: [
          { id: 'a', text: 'Jupiter', isCorrect: false },
          { id: 'b', text: 'Saturn', isCorrect: true },
          { id: 'c', text: 'Uranus', isCorrect: false },
          { id: 'd', text: 'Neptune', isCorrect: false },
        ],
        explanation: 'Saturn has 83 confirmed moons, more than any other planet in our solar system.'
      },
      {
        id: '103',
        text: 'What is the hardest natural substance on Earth?',
        options: [
          { id: 'a', text: 'Diamond', isCorrect: true },
          { id: 'b', text: 'Titanium', isCorrect: false },
          { id: 'c', text: 'Graphene', isCorrect: false },
          { id: 'd', text: 'Quartz', isCorrect: false },
        ],
        explanation: 'Diamond is the hardest known natural material, scoring 10 on the Mohs scale of mineral hardness.'
      },
    ]
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
    questions: []
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
    questions: []
  },
  {
    id: '4',
    title: 'Tech Trivia',
    description: 'Test your knowledge of technology, computers, and innovations',
    questionCount: 8,
    category: 'Technology',
    author: 'Admin',
    timeLimit: 10,
    difficulty: 'Medium' as const,
    attemptCount: 85,
    topScore: 90,
    questions: []
  },
  {
    id: '5',
    title: 'Pop Culture',
    description: 'Questions about movies, music, celebrities and trends',
    questionCount: 20,
    category: 'Entertainment',
    author: 'Admin',
    timeLimit: 25,
    difficulty: 'Easy' as const,
    attemptCount: 210,
    topScore: 96,
    questions: []
  },
  {
    id: '6',
    title: 'Literature Legends',
    description: 'Test your knowledge of famous books, authors and literary works',
    questionCount: 12,
    category: 'Literature',
    author: 'Admin',
    timeLimit: 15,
    difficulty: 'Hard' as const,
    attemptCount: 64,
    topScore: 82,
    questions: []
  },
];

// Defining different views for the quiz experience
type QuizView = 'browse' | 'intro' | 'active' | 'results';

const TakeQuiz = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  
  // State for quiz progress
  const [currentView, setCurrentView] = useState<QuizView>(quizId ? 'intro' : 'browse');
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: string | null}>({});
  const [timer, setTimer] = useState<number>(0);
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Load quiz data based on ID
  useEffect(() => {
    if (quizId) {
      const quiz = mockQuizzes.find(q => q.id === quizId);
      if (quiz) {
        setSelectedQuiz(quiz);
        // Reset quiz state
        setCurrentQuestionIndex(0);
        setAnswers({});
        setTimer(0);
        setQuizStartTime(null);
      } else {
        navigate('/take-quiz');
      }
    }
  }, [quizId, navigate]);
  
  // Timer effect
  useEffect(() => {
    let interval: number | undefined;
    
    if (currentView === 'active' && quizStartTime) {
      interval = window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - quizStartTime) / 1000);
        setTimer(elapsed);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentView, quizStartTime]);
  
  // Start quiz
  const startQuiz = () => {
    setCurrentView('active');
    setQuizStartTime(Date.now());
  };
  
  // Handle answer selection
  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers({
      ...answers,
      [questionId]: optionId
    });
  };
  
  // Navigate to next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };
  
  // Navigate to previous question
  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Finish quiz and show results
  const finishQuiz = () => {
    setCurrentView('results');
  };
  
  // Calculate results
  const calculateResults = () => {
    if (!selectedQuiz) return { score: 0, totalQuestions: 0, timeTaken: 0, answerDetails: [] };
    
    let correctAnswers = 0;
    const answerDetails = selectedQuiz.questions.map((question: Question) => {
      const selectedOptionId = answers[question.id] || null;
      const isCorrect = question.options.find(opt => opt.id === selectedOptionId)?.isCorrect;
      if (isCorrect) correctAnswers++;
      
      return { question, selectedOptionId };
    });
    
    return {
      score: correctAnswers,
      totalQuestions: selectedQuiz.questions.length,
      timeTaken: timer,
      answerDetails
    };
  };
  
  // Retry quiz
  const handleRetryQuiz = () => {
    setCurrentView('intro');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimer(0);
    setQuizStartTime(null);
  };
  
  // Filter quizzes based on search query
  const filteredQuizzes = mockQuizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  if (currentView === 'browse') {
    return (
      <Layout>
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Available Quizzes</h1>
              <p className="text-muted-foreground">
                Choose a quiz from our collection and test your knowledge
              </p>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>
          
          {filteredQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  id={quiz.id}
                  title={quiz.title}
                  description={quiz.description}
                  questionCount={quiz.questionCount}
                  category={quiz.category}
                  author={quiz.author}
                  timeLimit={quiz.timeLimit}
                  difficulty={quiz.difficulty as 'Easy' | 'Medium' | 'Hard'}
                  attemptCount={quiz.attemptCount}
                  topScore={quiz.topScore}
                  linkTo={`/take-quiz/${quiz.id}`}
                  actionText="Start Quiz"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <Search size={24} className="text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2">No Quizzes Found</h3>
              <p className="text-muted-foreground mb-4">
                Try a different search term or browse all quizzes
              </p>
              <Button onClick={() => setSearchQuery('')}>
                Show All Quizzes
              </Button>
            </div>
          )}
        </div>
      </Layout>
    );
  }
  
  if (!selectedQuiz) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">Loading quiz...</div>
        </div>
      </Layout>
    );
  }
  
  if (currentView === 'intro') {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto">
          <div className="mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/take-quiz')}
              className="text-muted-foreground"
            >
              <ArrowLeft size={16} className="mr-1" /> Back to Quizzes
            </Button>
          </div>
          
          <Card className="border-t-4 border-t-primary">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <Badge className="mb-2">{selectedQuiz.category}</Badge>
                  <CardTitle className="text-2xl">{selectedQuiz.title}</CardTitle>
                  <CardDescription className="mt-1">{selectedQuiz.description}</CardDescription>
                </div>
                <Badge variant="outline" className={`
                  ${selectedQuiz.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : ''}
                  ${selectedQuiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${selectedQuiz.difficulty === 'Hard' ? 'bg-red-100 text-red-800' : ''}
                `}>
                  {selectedQuiz.difficulty}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Quiz Details</h3>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Questions</span>
                      <span>{selectedQuiz.questionCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time Limit</span>
                      <span>{selectedQuiz.timeLimit} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created By</span>
                      <span>{selectedQuiz.author}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Quiz Stats</h3>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Attempts</span>
                      <span>{selectedQuiz.attemptCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Top Score</span>
                      <span>{selectedQuiz.topScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Average Time</span>
                      <span>{Math.round(selectedQuiz.timeLimit * 0.6)} minutes</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="font-semibold">Quiz Rules</h3>
                <ul className="text-sm space-y-2 list-disc pl-5">
                  <li>Answer all questions to the best of your knowledge.</li>
                  <li>You can navigate between questions during the quiz.</li>
                  <li>Once you submit your answers, you can't change them.</li>
                  <li>Your score will be calculated based on correct answers.</li>
                  {selectedQuiz.timeLimit > 0 && (
                    <li>Complete the quiz within {selectedQuiz.timeLimit} minutes.</li>
                  )}
                </ul>
              </div>
            </CardContent>
            
            <CardFooter className="flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between items-center">
              <div className="flex items-center text-sm">
                <AlertCircle size={16} className="mr-1 text-yellow-600" />
                <span>Ready to test your knowledge?</span>
              </div>
              <Button onClick={startQuiz}>
                Begin Quiz
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }
  
  if (currentView === 'active') {
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100;
    
    return (
      <Layout>
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">{selectedQuiz.title}</h2>
              <div className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
              </div>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span className="text-sm font-medium">{formatTime(timer)}</span>
            </div>
          </div>
          
          <Progress value={progressPercentage} className="h-2 mb-6" />
          
          <Card className="mb-4 animate-appear">
            <CardHeader>
              <CardTitle className="text-lg">{currentQuestion.text}</CardTitle>
            </CardHeader>
            
            <CardContent>
              <RadioGroup 
                value={answers[currentQuestion.id] || ''} 
                onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
                className="space-y-3"
              >
                {currentQuestion.options.map((option: any) => (
                  <div key={option.id} className="flex items-center space-x-2 p-3 rounded-md border border-border hover:border-primary/50 transition-colors">
                    <RadioGroupItem id={`option-${option.id}`} value={option.id} />
                    <Label htmlFor={`option-${option.id}`} className="flex-grow cursor-pointer">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={goToPrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft size={16} className="mr-1" /> Previous
              </Button>
              <Button 
                onClick={goToNextQuestion}
                disabled={!answers[currentQuestion.id]}
              >
                {currentQuestionIndex < selectedQuiz.questions.length - 1 ? (
                  <>Next <ArrowRight size={16} className="ml-1" /></>
                ) : (
                  'Finish Quiz'
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="flex justify-center gap-2">
            {selectedQuiz.questions.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-full text-xs flex items-center justify-center transition-colors ${
                  index === currentQuestionIndex
                    ? 'bg-primary text-primary-foreground'
                    : answers[selectedQuiz.questions[index].id]
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
  
  if (currentView === 'results') {
    const results = calculateResults();
    
    return (
      <Layout>
        <div className="max-w-3xl mx-auto">
          <QuizResults
            score={results.score}
            totalQuestions={results.totalQuestions}
            timeTaken={results.timeTaken}
            answers={results.answerDetails}
            onRetry={handleRetryQuiz}
          />
        </div>
      </Layout>
    );
  }
  
  return null;
};

export default TakeQuiz;
