
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  Trophy, 
  Clock, 
  Brain,
  CheckCircle2,
  Award,
  Target,
  BookOpen,
  ChevronUp,
  ChevronDown,
  Calendar,
  Trash2,
  Edit,
  ExternalLink,
  Plus
} from 'lucide-react';
import { AreaChart, Area, Bar, BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Legend } from 'recharts';

// Mock data for performance chart
const performanceData = [
  { name: 'Mon', score: 85 },
  { name: 'Tue', score: 78 },
  { name: 'Wed', score: 92 },
  { name: 'Thu', score: 88 },
  { name: 'Fri', score: 76 },
  { name: 'Sat', score: 90 },
  { name: 'Sun', score: 95 },
];

// Mock data for category performance
const categoryData = [
  { name: 'Science', value: 85 },
  { name: 'History', value: 72 },
  { name: 'Geography', value: 90 },
  { name: 'Technology', value: 95 },
  { name: 'Literature', value: 65 },
];

// Colors for pie chart
const COLORS = ['#3B82F6', '#14B8A6', '#F59E0B', '#6366F1', '#EC4899'];

// Mock data for recent quizzes
const recentQuizzes = [
  { 
    id: '1', 
    title: 'Science Fundamentals', 
    date: '2023-08-18', 
    score: 90, 
    timeSpent: '12:35', 
    category: 'Science',
    correct: 9,
    total: 10
  },
  { 
    id: '2', 
    title: 'World Geography', 
    date: '2023-08-16', 
    score: 85, 
    timeSpent: '18:22', 
    category: 'Geography',
    correct: 17,
    total: 20
  },
  { 
    id: '3', 
    title: 'History Highlights', 
    date: '2023-08-15', 
    score: 75, 
    timeSpent: '14:10', 
    category: 'History',
    correct: 9,
    total: 12
  },
  { 
    id: '4', 
    title: 'Tech Trivia', 
    date: '2023-08-14', 
    score: 95, 
    timeSpent: '09:45', 
    category: 'Technology',
    correct: 19,
    total: 20
  },
  { 
    id: '5', 
    title: 'Literature Legends', 
    date: '2023-08-12', 
    score: 80, 
    timeSpent: '15:30', 
    category: 'Literature',
    correct: 16,
    total: 20
  },
];

// Mock data for user's quizzes
const myQuizzes = [
  { 
    id: '101', 
    title: 'Computer Science Basics', 
    dateCreated: '2023-08-10', 
    attempts: 128, 
    avgScore: 82, 
    category: 'Technology',
    questionCount: 15,
    isPublic: true,
  },
  { 
    id: '102', 
    title: 'Physics Phenomena', 
    dateCreated: '2023-08-05', 
    attempts: 84, 
    avgScore: 76, 
    category: 'Science',
    questionCount: 12,
    isPublic: true,
  },
  { 
    id: '103', 
    title: 'World War II Facts', 
    dateCreated: '2023-07-28', 
    attempts: 156, 
    avgScore: 88, 
    category: 'History',
    questionCount: 20,
    isPublic: true,
  },
  { 
    id: '104', 
    title: 'Classic Literature', 
    dateCreated: '2023-07-20', 
    attempts: 0, 
    avgScore: 0, 
    category: 'Literature',
    questionCount: 18,
    isPublic: false,
  },
];

// Mock user stats
const userStats = {
  totalScore: 4250,
  quizzesTaken: 48,
  quizzesCreated: 4,
  avgAccuracy: 87,
  rank: 42,
  topCategory: 'Technology',
  topCategoryScore: 95,
  streak: 7,
  badges: 12,
};

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState('week');
  
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your quiz performance and analytics
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Score</p>
                  <h3 className="text-2xl font-bold mt-1">{userStats.totalScore.toLocaleString()}</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Trophy size={18} className="text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs">
                <div className="flex items-center text-green-600">
                  <ChevronUp size={16} />
                  <span>12.5%</span>
                </div>
                <span className="text-muted-foreground ml-1">vs. last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Quizzes Taken</p>
                  <h3 className="text-2xl font-bold mt-1">{userStats.quizzesTaken}</h3>
                </div>
                <div className="p-2 bg-blue-500/10 rounded-full">
                  <BookOpen size={18} className="text-blue-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs">
                <div className="flex items-center text-green-600">
                  <ChevronUp size={16} />
                  <span>8.2%</span>
                </div>
                <span className="text-muted-foreground ml-1">vs. last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Accuracy</p>
                  <h3 className="text-2xl font-bold mt-1">{userStats.avgAccuracy}%</h3>
                </div>
                <div className="p-2 bg-green-500/10 rounded-full">
                  <Target size={18} className="text-green-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs">
                <div className="flex items-center text-red-600">
                  <ChevronDown size={16} />
                  <span>3.1%</span>
                </div>
                <span className="text-muted-foreground ml-1">vs. last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Streak</p>
                  <h3 className="text-2xl font-bold mt-1">{userStats.streak} days</h3>
                </div>
                <div className="p-2 bg-orange-500/10 rounded-full">
                  <Award size={18} className="text-orange-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs">
                <div className="flex items-center text-green-600">
                  <ChevronUp size={16} />
                  <span>2 days</span>
                </div>
                <span className="text-muted-foreground ml-1">current streak</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-2 hover-lift">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <LineChart size={18} className="mr-2" />
                    Performance Trend
                  </CardTitle>
                  <CardDescription>Your quiz scores over time</CardDescription>
                </div>
                <Select defaultValue={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={performanceData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEE" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#888' }}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#888' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                      border: 'none',
                      padding: '8px 12px'
                    }}
                    labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3B82F6" 
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart size={18} className="mr-2" />
                Category Performance
              </CardTitle>
              <CardDescription>Your accuracy by category</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ paddingTop: '20px' }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Accuracy']}
                    contentStyle={{ 
                      borderRadius: '8px', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                      border: 'none',
                      padding: '8px 12px'
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs for Recent Activity and My Quizzes */}
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="myQuizzes">My Quizzes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="animate-appear">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock size={18} className="mr-2" />
                  Recent Quiz Activity
                </CardTitle>
                <CardDescription>Your recent quiz attempts and results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Quiz Title</th>
                        <th className="text-left py-3 px-4 font-medium hidden sm:table-cell">Category</th>
                        <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Date</th>
                        <th className="text-right py-3 px-4 font-medium">Score</th>
                        <th className="text-right py-3 px-4 font-medium hidden sm:table-cell">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentQuizzes.map((quiz) => (
                        <tr 
                          key={quiz.id} 
                          className="border-b last:border-0 transition-colors hover:bg-muted/50"
                        >
                          <td className="py-3 px-4">
                            <div className="font-medium truncate max-w-[180px]">
                              {quiz.title}
                            </div>
                          </td>
                          <td className="py-3 px-4 hidden sm:table-cell">
                            <Badge variant="outline">{quiz.category}</Badge>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
                            {quiz.date}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex flex-col items-end">
                              <span className={`font-bold ${
                                quiz.score >= 90 ? 'text-green-600' : 
                                quiz.score >= 70 ? 'text-amber-600' : 
                                'text-red-600'
                              }`}>
                                {quiz.score}%
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {quiz.correct}/{quiz.total}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right hidden sm:table-cell">
                            {quiz.timeSpent}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button asChild variant="outline">
                    <Link to="/take-quiz">Take Another Quiz</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="myQuizzes" className="animate-appear">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      <Brain size={18} className="mr-2" />
                      My Created Quizzes
                    </CardTitle>
                    <CardDescription>Quizzes you've created and their performance</CardDescription>
                  </div>
                  <Button asChild>
                    <Link to="/create-quiz">
                      <Plus size={16} className="mr-1" /> Create Quiz
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {myQuizzes.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Quiz Title</th>
                          <th className="text-left py-3 px-4 font-medium hidden sm:table-cell">Category</th>
                          <th className="text-right py-3 px-4 font-medium hidden md:table-cell">Questions</th>
                          <th className="text-right py-3 px-4 font-medium hidden md:table-cell">Status</th>
                          <th className="text-right py-3 px-4 font-medium">Attempts</th>
                          <th className="text-right py-3 px-4 font-medium hidden sm:table-cell">Avg Score</th>
                          <th className="text-right py-3 px-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myQuizzes.map((quiz) => (
                          <tr 
                            key={quiz.id} 
                            className="border-b last:border-0 transition-colors hover:bg-muted/50"
                          >
                            <td className="py-3 px-4">
                              <div className="font-medium truncate max-w-[160px]">
                                {quiz.title}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Created: {quiz.dateCreated}
                              </div>
                            </td>
                            <td className="py-3 px-4 hidden sm:table-cell">
                              <Badge variant="outline">{quiz.category}</Badge>
                            </td>
                            <td className="py-3 px-4 text-right hidden md:table-cell">
                              {quiz.questionCount}
                            </td>
                            <td className="py-3 px-4 text-right hidden md:table-cell">
                              <Badge variant={quiz.isPublic ? "default" : "secondary"}>
                                {quiz.isPublic ? "Public" : "Private"}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-right">
                              {quiz.attempts}
                            </td>
                            <td className="py-3 px-4 text-right hidden sm:table-cell">
                              {quiz.avgScore > 0 ? (
                                <span className={`font-bold ${
                                  quiz.avgScore >= 80 ? 'text-green-600' : 
                                  quiz.avgScore >= 60 ? 'text-amber-600' : 
                                  'text-red-600'
                                }`}>
                                  {quiz.avgScore}%
                                </span>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit size={15} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <ExternalLink size={15} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                  <Trash2 size={15} />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Brain size={40} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Quizzes Created Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start creating your own quizzes to share with others
                    </p>
                    <Button asChild>
                      <Link to="/create-quiz">Create Your First Quiz</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
