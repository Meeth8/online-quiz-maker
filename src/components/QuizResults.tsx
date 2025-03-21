
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Award, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Question } from './QuestionForm';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  timeTaken: number;
  answers: { question: Question; selectedOptionId: string | null }[];
  onRetry: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  timeTaken,
  answers,
  onRetry,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Convert time taken from seconds to minutes and seconds
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  const formattedTime = `${minutes}m ${seconds}s`;
  
  // Determine result message based on score percentage
  const getResultMessage = () => {
    if (percentage >= 90) return "Exceptional! You're a true trivia master!";
    if (percentage >= 75) return "Great job! Your knowledge is impressive!";
    if (percentage >= 60) return "Good work! You know your stuff!";
    if (percentage >= 40) return "Not bad! There's room for improvement.";
    return "Keep practicing! You'll do better next time.";
  };

  // Determine color based on score percentage
  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="animate-appear space-y-8">
      <Card className="overflow-hidden border-t-4 border-t-primary">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl">Quiz Results</CardTitle>
          <CardDescription>{getResultMessage()}</CardDescription>
        </CardHeader>
        
        <CardContent className="px-8 py-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className={cn("text-4xl font-bold", getScoreColor())}>
                  {percentage}%
                </div>
                <Award 
                  className={cn("absolute -top-4 -right-4 w-8 h-8", getScoreColor())} 
                />
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Score
              </div>
            </div>
            
            <div className="w-px h-16 bg-border hidden md:block" />
            
            <div className="text-center">
              <div className="text-2xl font-semibold">
                {score} / {totalQuestions}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Correct Answers
              </div>
            </div>
            
            <div className="w-px h-16 bg-border hidden md:block" />
            
            <div className="text-center">
              <div className="text-2xl font-semibold">
                {formattedTime}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Time Taken
              </div>
            </div>
          </div>
          
          <Progress value={percentage} className="h-2 mb-2" />
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 pt-0">
          <Button variant="outline" size="sm" onClick={onRetry} className="w-full sm:w-auto">
            <RefreshCw size={16} className="mr-1" /> Try Again
          </Button>
          <Button asChild size="sm" className="w-full sm:w-auto">
            <Link to="/take-quiz">
              <RefreshCw size={16} className="mr-1" /> More Quizzes
            </Link>
          </Button>
          <Button asChild variant="default" size="sm" className="w-full sm:w-auto">
            <Link to="/">
              <Home size={16} className="mr-1" /> Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Question Review</h3>
        
        {answers.map((item, index) => {
          const { question, selectedOptionId } = item;
          const correctOption = question.options.find(option => option.isCorrect);
          const selectedOption = question.options.find(option => option.id === selectedOptionId);
          const isCorrect = selectedOptionId === correctOption?.id;
          
          return (
            <Card key={question.id} className={cn(
              "border-l-4",
              isCorrect ? "border-l-green-500" : "border-l-red-500"
            )}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-start">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full mr-2 text-xs bg-muted">
                    {index + 1}
                  </span>
                  <span>{question.text}</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pb-3 pt-0">
                <div className="mt-2 space-y-2">
                  {question.options.map(option => (
                    <div
                      key={option.id}
                      className={cn(
                        "p-3 rounded-md text-sm flex items-center",
                        option.isCorrect 
                          ? "bg-green-50 border border-green-200" 
                          : option.id === selectedOptionId && !option.isCorrect
                            ? "bg-red-50 border border-red-200"
                            : "bg-secondary"
                      )}
                    >
                      {option.isCorrect ? (
                        <Check size={16} className="text-green-600 mr-2 flex-shrink-0" />
                      ) : option.id === selectedOptionId && !option.isCorrect ? (
                        <X size={16} className="text-red-600 mr-2 flex-shrink-0" />
                      ) : (
                        <div className="w-4 mr-2" />
                      )}
                      {option.text}
                    </div>
                  ))}
                </div>
                
                {question.explanation && (
                  <div className="mt-3 p-3 rounded-md bg-muted text-sm">
                    <span className="font-medium">Explanation:</span> {question.explanation}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default QuizResults;
