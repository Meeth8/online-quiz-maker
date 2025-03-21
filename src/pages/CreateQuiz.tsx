
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Check, Plus, Save, X, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import QuestionForm, { Question } from '@/components/QuestionForm';

// Mock categories
const categories = [
  'Science', 'History', 'Geography', 'Literature', 
  'Movies', 'Music', 'Sports', 'Technology', 'General Knowledge'
];

const difficulties = ['Easy', 'Medium', 'Hard'];

const CreateQuiz = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);
  
  // Quiz details state
  const [quizDetails, setQuizDetails] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'Medium',
    timeLimit: 0,
    enableTimer: false,
    isPublic: true,
  });
  
  // Questions state
  const [questions, setQuestions] = useState<Question[]>([]);
  
  const handleQuizDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuizDetails({
      ...quizDetails,
      [name]: value,
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setQuizDetails({
      ...quizDetails,
      [name]: value,
    });
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setQuizDetails({
      ...quizDetails,
      [name]: checked,
    });
  };
  
  const handleAddQuestion = () => {
    setShowQuestionForm(true);
    setEditingQuestionIndex(null);
  };
  
  const handleEditQuestion = (index: number) => {
    setShowQuestionForm(true);
    setEditingQuestionIndex(index);
  };
  
  const handleSaveQuestion = (question: Question) => {
    if (editingQuestionIndex !== null) {
      // Edit existing question
      const updatedQuestions = [...questions];
      updatedQuestions[editingQuestionIndex] = question;
      setQuestions(updatedQuestions);
    } else {
      // Add new question
      setQuestions([...questions, question]);
    }
    setShowQuestionForm(false);
    setEditingQuestionIndex(null);
  };
  
  const handleCancelQuestion = () => {
    setShowQuestionForm(false);
    setEditingQuestionIndex(null);
  };
  
  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };
  
  const handleMoveQuestion = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === questions.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedQuestions = [...questions];
    [updatedQuestions[index], updatedQuestions[newIndex]] = 
      [updatedQuestions[newIndex], updatedQuestions[index]];
    
    setQuestions(updatedQuestions);
  };
  
  const handleSaveQuiz = () => {
    // In a real app, this would send the data to an API
    console.log('Saving quiz:', { quizDetails, questions });
    alert('Quiz saved successfully! (This is a mock success message)');
  };
  
  const isDetailsValid = () => {
    return (
      quizDetails.title.trim() !== '' &&
      quizDetails.description.trim() !== '' &&
      quizDetails.category !== ''
    );
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create Quiz</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="details">Quiz Details</TabsTrigger>
            <TabsTrigger 
              value="questions" 
              disabled={!isDetailsValid()}
              title={!isDetailsValid() ? "Complete quiz details first" : ""}
            >
              Questions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="animate-appear">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Information</CardTitle>
                <CardDescription>
                  Provide the basic details about your quiz
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Quiz Title</Label>
                  <Input 
                    id="title" 
                    name="title"
                    placeholder="Enter a descriptive title for your quiz"
                    value={quizDetails.title}
                    onChange={handleQuizDetailsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    placeholder="Briefly describe what your quiz is about"
                    value={quizDetails.description}
                    onChange={handleQuizDetailsChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={quizDetails.category}
                      onValueChange={(value) => handleSelectChange('category', value)}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select 
                      value={quizDetails.difficulty}
                      onValueChange={(value) => handleSelectChange('difficulty', value)}
                    >
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map((difficulty) => (
                          <SelectItem key={difficulty} value={difficulty}>
                            {difficulty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableTimer">Enable Time Limit</Label>
                      <div className="text-sm text-muted-foreground">
                        Set a time limit for quiz completion
                      </div>
                    </div>
                    <Switch 
                      id="enableTimer"
                      checked={quizDetails.enableTimer}
                      onCheckedChange={(checked) => handleSwitchChange('enableTimer', checked)}
                    />
                  </div>
                  
                  {quizDetails.enableTimer && (
                    <div className="space-y-2">
                      <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                      <Input 
                        id="timeLimit" 
                        name="timeLimit"
                        type="number"
                        min="1"
                        max="180"
                        placeholder="Enter time in minutes"
                        value={quizDetails.timeLimit || ''}
                        onChange={handleQuizDetailsChange}
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="isPublic">Make Quiz Public</Label>
                    <div className="text-sm text-muted-foreground">
                      Allow others to find and take your quiz
                    </div>
                  </div>
                  <Switch 
                    id="isPublic"
                    checked={quizDetails.isPublic}
                    onCheckedChange={(checked) => handleSwitchChange('isPublic', checked)}
                  />
                </div>
              </CardContent>
              
              <CardFooter className="justify-between">
                <div className="text-sm text-muted-foreground flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  All fields are required except time limit
                </div>
                <Button 
                  onClick={() => setActiveTab('questions')}
                  disabled={!isDetailsValid()}
                >
                  Continue <ArrowRight size={16} className="ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="questions" className="animate-appear">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Quiz Questions</CardTitle>
                    <CardDescription>
                      Add and manage your quiz questions
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setActiveTab('details')}
                    variant="ghost" 
                    size="sm"
                  >
                    <ArrowLeft size={16} className="mr-1" /> Back to Details
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                {!showQuestionForm ? (
                  <div className="space-y-6">
                    {questions.length > 0 ? (
                      <div className="space-y-4">
                        {questions.map((question, index) => (
                          <Card key={question.id} className="border border-border hover:border-primary/50 transition-colors">
                            <CardHeader className="py-3 px-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start">
                                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center mr-3 text-xs font-medium">
                                    {index + 1}
                                  </div>
                                  <div className="text-sm font-medium">{question.text}</div>
                                </div>
                                <div className="flex space-x-1">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => handleMoveQuestion(index, 'up')}
                                    disabled={index === 0}
                                    className="h-7 w-7"
                                  >
                                    <ArrowUp size={14} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => handleMoveQuestion(index, 'down')}
                                    disabled={index === questions.length - 1}
                                    className="h-7 w-7"
                                  >
                                    <ArrowDown size={14} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => handleEditQuestion(index)}
                                    className="h-7 w-7"
                                  >
                                    <Pencil size={14} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => handleRemoveQuestion(index)}
                                    className="h-7 w-7 text-destructive"
                                  >
                                    <Trash2 size={14} />
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 border-2 border-dashed rounded-lg">
                        <div className="flex justify-center mb-4">
                          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                            <Plus size={24} className="text-muted-foreground" />
                          </div>
                        </div>
                        <h3 className="text-lg font-medium mb-2">No Questions Added Yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Start adding questions to complete your quiz
                        </p>
                        <Button onClick={handleAddQuestion}>
                          <Plus size={16} className="mr-1" /> Add Your First Question
                        </Button>
                      </div>
                    )}
                    
                    {questions.length > 0 && (
                      <div className="text-center mt-4">
                        <Button onClick={handleAddQuestion} variant="secondary">
                          <Plus size={16} className="mr-1" /> Add Another Question
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <QuestionForm 
                    onSave={handleSaveQuestion}
                    onCancel={handleCancelQuestion}
                    initialQuestion={editingQuestionIndex !== null ? questions[editingQuestionIndex] : undefined}
                  />
                )}
              </CardContent>
              
              {!showQuestionForm && questions.length > 0 && (
                <CardFooter>
                  <div className="w-full flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {questions.length} {questions.length === 1 ? 'question' : 'questions'} added
                    </div>
                    <Button onClick={handleSaveQuiz} disabled={questions.length === 0}>
                      <Save size={16} className="mr-1" /> Save Quiz
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Missing imports
const Pencil = (props: any) => <span {...props} />;
const Trash2 = (props: any) => <span {...props} />;
const ArrowUp = (props: any) => <span {...props} />;
const ArrowDown = (props: any) => <span {...props} />;

export default CreateQuiz;
