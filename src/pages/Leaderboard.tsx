
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Award, Search, Trophy, Medal, User, Calendar } from 'lucide-react';

// Mock leaderboard data
const mockLeaderboardData = {
  weekly: [
    { rank: 1, username: 'QuizMaster', score: 1250, quizzes: 14, avgScore: 94, avatar: '/images/avatars/01.png' },
    { rank: 2, username: 'Brainy_42', score: 1180, quizzes: 12, avgScore: 91, avatar: '/images/avatars/02.png' },
    { rank: 3, username: 'KnowledgeSeeker', score: 1050, quizzes: 11, avgScore: 89, avatar: '/images/avatars/03.png' },
    { rank: 4, username: 'TriviaPro', score: 980, quizzes: 10, avgScore: 88, avatar: '/images/avatars/04.png' },
    { rank: 5, username: 'WisdomHunter', score: 920, quizzes: 10, avgScore: 86, avatar: '/images/avatars/05.png' },
    { rank: 6, username: 'BrainiacXL', score: 890, quizzes: 9, avgScore: 85, avatar: '/images/avatars/06.png' },
    { rank: 7, username: 'ThinkTank', score: 860, quizzes: 10, avgScore: 82, avatar: '/images/avatars/07.png' },
    { rank: 8, username: 'QuizWhiz', score: 830, quizzes: 9, avgScore: 80, avatar: '/images/avatars/08.png' },
    { rank: 9, username: 'MindMaster', score: 780, quizzes: 8, avgScore: 84, avatar: '/images/avatars/09.png' },
    { rank: 10, username: 'TriviaKing', score: 750, quizzes: 8, avgScore: 82, avatar: '/images/avatars/10.png' },
  ],
  monthly: [
    { rank: 1, username: 'QuizMaster', score: 4820, quizzes: 52, avgScore: 92, avatar: '/images/avatars/01.png' },
    { rank: 2, username: 'KnowledgeSeeker', score: 4680, quizzes: 50, avgScore: 90, avatar: '/images/avatars/03.png' },
    { rank: 3, username: 'Brainy_42', score: 4250, quizzes: 46, avgScore: 88, avatar: '/images/avatars/02.png' },
    { rank: 4, username: 'WisdomHunter', score: 3980, quizzes: 42, avgScore: 87, avatar: '/images/avatars/05.png' },
    { rank: 5, username: 'TriviaPro', score: 3760, quizzes: 40, avgScore: 86, avatar: '/images/avatars/04.png' },
    { rank: 6, username: 'MindMaster', score: 3650, quizzes: 39, avgScore: 85, avatar: '/images/avatars/09.png' },
    { rank: 7, username: 'BrainiacXL', score: 3450, quizzes: 37, avgScore: 84, avatar: '/images/avatars/06.png' },
    { rank: 8, username: 'TriviaKing', score: 3340, quizzes: 36, avgScore: 83, avatar: '/images/avatars/10.png' },
    { rank: 9, username: 'ThinkTank', score: 3180, quizzes: 34, avgScore: 82, avatar: '/images/avatars/07.png' },
    { rank: 10, username: 'QuizWhiz', score: 3050, quizzes: 32, avgScore: 81, avatar: '/images/avatars/08.png' },
  ],
  allTime: [
    { rank: 1, username: 'QuizMaster', score: 15680, quizzes: 168, avgScore: 93, avatar: '/images/avatars/01.png' },
    { rank: 2, username: 'KnowledgeSeeker', score: 14250, quizzes: 152, avgScore: 91, avatar: '/images/avatars/03.png' },
    { rank: 3, username: 'Brainy_42', score: 13980, quizzes: 148, avgScore: 90, avatar: '/images/avatars/02.png' },
    { rank: 4, username: 'WisdomHunter', score: 12670, quizzes: 138, avgScore: 89, avatar: '/images/avatars/05.png' },
    { rank: 5, username: 'MindMaster', score: 11450, quizzes: 126, avgScore: 88, avatar: '/images/avatars/09.png' },
    { rank: 6, username: 'TriviaPro', score: 10980, quizzes: 118, avgScore: 87, avatar: '/images/avatars/04.png' },
    { rank: 7, username: 'BrainiacXL', score: 9850, quizzes: 106, avgScore: 86, avatar: '/images/avatars/06.png' },
    { rank: 8, username: 'TriviaKing', score: 8750, quizzes: 96, avgScore: 85, avatar: '/images/avatars/10.png' },
    { rank: 9, username: 'ThinkTank', score: 7650, quizzes: 84, avgScore: 84, avatar: '/images/avatars/07.png' },
    { rank: 10, username: 'QuizWhiz', score: 6890, quizzes: 76, avgScore: 83, avatar: '/images/avatars/08.png' },
  ],
};

// Mock quiz leaderboards
const mockQuizLeaderboards = [
  {
    id: '1',
    title: 'Science Fundamentals',
    category: 'Science',
    totalAttempts: 248,
    leaderboard: [
      { rank: 1, username: 'QuizMaster', score: 100, time: '2:45', date: '2023-08-15' },
      { rank: 2, username: 'Brainy_42', score: 90, time: '3:12', date: '2023-08-14' },
      { rank: 3, username: 'KnowledgeSeeker', score: 90, time: '3:30', date: '2023-08-12' },
    ],
  },
  {
    id: '2',
    title: 'World Geography',
    category: 'Geography',
    totalAttempts: 196,
    leaderboard: [
      { rank: 1, username: 'WisdomHunter', score: 95, time: '4:10', date: '2023-08-16' },
      { rank: 2, username: 'QuizMaster', score: 90, time: '4:05', date: '2023-08-13' },
      { rank: 3, username: 'TriviaPro', score: 85, time: '3:55', date: '2023-08-11' },
    ],
  },
  {
    id: '3',
    title: 'History Highlights',
    category: 'History',
    totalAttempts: 312,
    leaderboard: [
      { rank: 1, username: 'KnowledgeSeeker', score: 100, time: '3:40', date: '2023-08-17' },
      { rank: 2, username: 'MindMaster', score: 92, time: '3:52', date: '2023-08-15' },
      { rank: 3, username: 'ThinkTank', score: 88, time: '4:05', date: '2023-08-14' },
    ],
  },
];

const Leaderboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Filter quiz leaderboards based on search and category
  const filteredQuizLeaderboards = mockQuizLeaderboards.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || quiz.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  // Get top 3 from global leaderboard for header display
  const topThreeGlobal = mockLeaderboardData.allTime.slice(0, 3);
  
  // Get unique categories from quiz data
  const categories = ['all', ...new Set(mockQuizLeaderboards.map(quiz => quiz.category))];
  
  // Render trophy icon based on rank
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy size={18} className="text-yellow-500" />;
      case 2:
        return <Medal size={18} className="text-gray-400" />;
      case 3:
        return <Medal size={18} className="text-amber-700" />;
      default:
        return <span className="w-[18px] h-[18px] flex items-center justify-center text-xs text-muted-foreground">{rank}</span>;
    }
  };
  
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Leaderboards</h1>
          <p className="text-muted-foreground">
            Track top performers and see where you stand in the rankings
          </p>
        </div>
        
        {/* Top 3 Showcase */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {topThreeGlobal.map((user, index) => (
            <Card 
              key={index} 
              className={`
                relative overflow-hidden border-t-4 hover-lift
                ${index === 0 ? 'border-t-yellow-500 md:scale-110 z-10' : ''}
                ${index === 1 ? 'border-t-gray-400' : ''}
                ${index === 2 ? 'border-t-amber-700' : ''}
              `}
            >
              <div className={`
                absolute -right-4 -top-4 w-16 h-16 rounded-full text-white flex items-center justify-center transform rotate-12
                ${index === 0 ? 'bg-yellow-500' : ''}
                ${index === 1 ? 'bg-gray-400' : ''}
                ${index === 2 ? 'bg-amber-700' : ''}
              `}>
                #{user.rank}
              </div>
              <CardContent className="pt-6 pb-4 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <User size={32} className="text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-1">{user.username}</h3>
                <div className="text-sm text-muted-foreground mb-4">
                  {user.quizzes} quizzes completed
                </div>
                <div className="text-3xl font-bold mb-1">{user.score.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Main Leaderboard */}
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="allTime">All Time</TabsTrigger>
          </TabsList>
          
          {(Object.keys(mockLeaderboardData) as Array<keyof typeof mockLeaderboardData>).map((period) => (
            <TabsContent key={period} value={period} className="animate-appear">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award size={20} className="mr-2" />
                    {period === 'weekly' ? 'Weekly' : period === 'monthly' ? 'Monthly' : 'All Time'} Leaderboard
                  </CardTitle>
                  <CardDescription>
                    Top performers from {period === 'weekly' ? 'this week' : period === 'monthly' ? 'this month' : 'all time'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Rank</th>
                          <th className="text-left py-3 px-4 font-medium">User</th>
                          <th className="text-right py-3 px-4 font-medium">Score</th>
                          <th className="text-right py-3 px-4 font-medium hidden sm:table-cell">Quizzes</th>
                          <th className="text-right py-3 px-4 font-medium hidden sm:table-cell">Avg Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockLeaderboardData[period].map((user, index) => (
                          <tr 
                            key={index} 
                            className={`
                              border-b last:border-0 transition-colors hover:bg-muted/50
                              ${index < 3 ? 'bg-muted/20' : ''}
                            `}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                {getRankIcon(user.rank)}
                                <span className="ml-2">{user.rank}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                  <User size={16} className="text-primary" />
                                </div>
                                <span className="font-medium">{user.username}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right font-bold">
                              {user.score.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-right hidden sm:table-cell">
                              {user.quizzes}
                            </td>
                            <td className="py-3 px-4 text-right hidden sm:table-cell">
                              {user.avgScore}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Quiz-specific Leaderboards */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Quiz Leaderboards</h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search quizzes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredQuizLeaderboards.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredQuizLeaderboards.map((quiz) => (
                <Card key={quiz.id} className="overflow-hidden hover-lift">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge className="mb-2">{quiz.category}</Badge>
                        <CardTitle className="text-lg">{quiz.title}</CardTitle>
                        <CardDescription>{quiz.totalAttempts} attempts</CardDescription>
                      </div>
                      <Trophy size={20} className="text-yellow-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {quiz.leaderboard.map((entry) => (
                        <div 
                          key={entry.rank} 
                          className="flex items-center justify-between p-3 rounded-md border border-border"
                        >
                          <div className="flex items-center">
                            <div className="mr-3">
                              {getRankIcon(entry.rank)}
                            </div>
                            <div>
                              <div className="font-medium">{entry.username}</div>
                              <div className="text-xs text-muted-foreground flex items-center mt-0.5">
                                <Calendar size={12} className="mr-1" />
                                {entry.date}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{entry.score}%</div>
                            <div className="text-xs text-muted-foreground">
                              {entry.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <Search size={32} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Matching Quizzes</h3>
              <p className="text-muted-foreground">
                Try a different search term or category filter
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
