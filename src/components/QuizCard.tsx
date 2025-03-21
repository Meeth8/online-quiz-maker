
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, Award } from 'lucide-react';

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  category: string;
  author: string;
  timeLimit?: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  attemptCount?: number;
  topScore?: number;
  linkTo: string;
  actionText: string;
}

const QuizCard: React.FC<QuizCardProps> = ({
  id,
  title,
  description,
  questionCount,
  category,
  author,
  timeLimit,
  difficulty = 'Medium',
  attemptCount,
  topScore,
  linkTo,
  actionText
}) => {
  // Map difficulty to appropriate color
  const difficultyColor = {
    'Easy': 'bg-green-100 text-green-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'Hard': 'bg-red-100 text-red-800',
  }[difficulty];

  return (
    <Card className="hover-lift h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Badge className="mb-2">{category}</Badge>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          </div>
          <Badge variant="outline" className={difficultyColor}>
            {difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-3 flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-y-2 text-xs text-muted-foreground">
          <div className="w-1/2 flex items-center">
            <Clock size={14} className="mr-1" />
            {timeLimit ? `${timeLimit} min` : 'No time limit'}
          </div>
          <div className="w-1/2 flex items-center">
            <span className="inline-block w-4 h-4 mr-1 text-center">Q</span>
            {questionCount} questions
          </div>
          <div className="w-1/2 flex items-center">
            <User size={14} className="mr-1" />
            {author}
          </div>
          {attemptCount !== undefined && (
            <div className="w-1/2 flex items-center">
              <span className="inline-block w-4 h-4 mr-1 text-center">#</span>
              {attemptCount} attempts
            </div>
          )}
          {topScore !== undefined && (
            <div className="w-1/2 flex items-center">
              <Award size={14} className="mr-1" />
              Top score: {topScore}%
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={linkTo}>{actionText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
