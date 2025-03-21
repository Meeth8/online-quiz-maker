
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check, X, Trash2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestionFormProps {
  onSave: (question: Question) => void;
  onCancel: () => void;
  initialQuestion?: Question;
}

export interface Question {
  id: string;
  text: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation?: string;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSave, onCancel, initialQuestion }) => {
  const [question, setQuestion] = useState<Question>(
    initialQuestion || {
      id: Math.random().toString(36).substr(2, 9),
      text: '',
      options: [
        { id: '1', text: '', isCorrect: true },
        { id: '2', text: '', isCorrect: false },
        { id: '3', text: '', isCorrect: false },
        { id: '4', text: '', isCorrect: false },
      ],
      explanation: '',
    }
  );

  const [correctOptionId, setCorrectOptionId] = useState<string>(
    initialQuestion ? 
      initialQuestion.options.find(o => o.isCorrect)?.id || '1' : 
      '1'
  );

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion({ ...question, text: e.target.value });
  };

  const handleOptionChange = (id: string, value: string) => {
    setQuestion({
      ...question,
      options: question.options.map(option => 
        option.id === id ? { ...option, text: value } : option
      ),
    });
  };

  const handleCorrectOptionChange = (value: string) => {
    setCorrectOptionId(value);
    setQuestion({
      ...question,
      options: question.options.map(option => ({
        ...option,
        isCorrect: option.id === value,
      })),
    });
  };

  const handleExplanationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion({ ...question, explanation: e.target.value });
  };

  const addOption = () => {
    if (question.options.length < 8) {
      const newId = (question.options.length + 1).toString();
      setQuestion({
        ...question,
        options: [
          ...question.options,
          { id: newId, text: '', isCorrect: false },
        ],
      });
    }
  };

  const removeOption = (id: string) => {
    // Don't allow fewer than 2 options
    if (question.options.length <= 2) return;
    
    // If removing the correct option, set the first remaining option as correct
    let newCorrectId = correctOptionId;
    if (id === correctOptionId) {
      const remainingOptions = question.options.filter(o => o.id !== id);
      newCorrectId = remainingOptions[0].id;
      setCorrectOptionId(newCorrectId);
    }
    
    setQuestion({
      ...question,
      options: question.options
        .filter(option => option.id !== id)
        .map(option => ({
          ...option,
          isCorrect: option.id === newCorrectId ? true : false,
        })),
    });
  };

  const handleSave = () => {
    // Validate before saving
    if (!question.text.trim()) {
      alert('Please enter a question');
      return;
    }
    
    if (question.options.some(option => !option.text.trim())) {
      alert('Please fill in all options');
      return;
    }
    
    onSave(question);
  };

  return (
    <div className="space-y-6 animate-appear">
      <div className="space-y-2">
        <Label htmlFor="question-text">Question</Label>
        <Textarea
          id="question-text"
          value={question.text}
          onChange={handleQuestionChange}
          placeholder="Enter your question here"
          className="min-h-24"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Answer Options</Label>
          <Button 
            type="button" 
            size="sm" 
            variant="outline" 
            onClick={addOption}
            disabled={question.options.length >= 8}
            className="h-8"
          >
            <Plus size={16} className="mr-1" /> Add Option
          </Button>
        </div>

        <RadioGroup value={correctOptionId} onValueChange={handleCorrectOptionChange}>
          {question.options.map((option, index) => (
            <div key={option.id} className="flex items-start mb-3 relative rounded-md group">
              <div className="flex items-center h-10 px-3 border rounded-l-md bg-muted">
                <RadioGroupItem 
                  value={option.id} 
                  id={`option-${option.id}`} 
                  className="mr-2" 
                />
                <Label htmlFor={`option-${option.id}`} className="cursor-pointer">
                  {index + 1}
                </Label>
              </div>
              
              <Input
                value={option.text}
                onChange={(e) => handleOptionChange(option.id, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className={cn(
                  "flex-1 rounded-l-none", 
                  option.isCorrect && "border-green-500 focus-visible:ring-green-500"
                )}
              />
              
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeOption(option.id)}
                disabled={question.options.length <= 2}
                className="absolute -right-10 top-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} className="text-muted-foreground hover:text-destructive" />
              </Button>
              
              {option.isCorrect && (
                <div className="absolute right-2 top-2.5">
                  <Check size={16} className="text-green-500" />
                </div>
              )}
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="explanation" className="flex items-center">
          Explanation (Optional)
        </Label>
        <Textarea
          id="explanation"
          value={question.explanation || ''}
          onChange={handleExplanationChange}
          placeholder="Explain why the correct answer is right (optional)"
          className="min-h-20"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X size={16} className="mr-1" /> Cancel
        </Button>
        <Button type="button" onClick={handleSave}>
          <Check size={16} className="mr-1" /> Save Question
        </Button>
      </div>
    </div>
  );
};

export default QuestionForm;
