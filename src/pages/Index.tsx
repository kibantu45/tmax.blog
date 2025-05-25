
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Share2, Users, TrendingUp, Star, Calendar, Search } from "lucide-react";

const Index = () => {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const handleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const featuredPosts = [
    {
      id: 1,
      title: "Building the Future of Community",
      excerpt: "Exploring how modern communities are reshaping digital interaction...",
      author: "Sarah Chen",
      likes: 124,
      comments: 23,
      category: "Community",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Design Thinking Workshop",
      excerpt: "Join us for an interactive session on creative problem solving...",
      author: "Marcus Rivera",
      likes: 89,
      comments: 15,
      category: "Workshop",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Tech Innovation Showcase",
      excerpt: "Discover the latest innovations from our community members...",
      author: "Alex Thompson",
      likes: 156,
      comments: 34,
      category: "Technology",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop"
    }
  ];

  const communityStats = [
    { label: "Active Members", value: "12.5K", icon: Users, color: "text-blue-500" },
    { label: "Posts This Week", value: "847", icon: TrendingUp, color: "text-green-500" },
    { label: "Featured Content", value: "156", icon: Star, color: "text-yellow-500" },
    { label: "Events Hosted", value: "89", icon: Calendar, color: "text-purple-500" }
  ];

  const topMembers = [
    { name: "Emma Wilson", posts: 42, avatar: "EW", level: "Expert" },
    { name: "David Kim", posts: 38, avatar: "DK", level: "Pro" },
    { name: "Lisa Rodriguez", posts: 35, avatar: "LR", level: "Expert" },
    { name: "James Park", posts: 29, avatar: "JP", level: "Active" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ConnectHub
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to ConnectHub
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            A vibrant community where ideas flourish, connections grow, and innovation thrives. 
            Join thousands of creators, thinkers, and makers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              Explore Content
            </Button>
            <Button size="lg" variant="outline" className="border-purple-200 hover:bg-purple-50">
              Learn More
            </Button>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {communityStats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow border-purple-100">
              <CardContent className="pt-6">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="featured" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>
              
              <TabsContent value="featured" className="space-y-6">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-purple-100 group">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 hover:from-purple-200 hover:to-blue-200">
                            {post.category}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={`https://ui-avatars.com/api/?name=${post.author}&background=random`} />
                              <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleLike(post.id)}
                              className={`${likedPosts.includes(post.id) ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                            >
                              <Heart className={`w-4 h-4 mr-1 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                              {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {post.comments}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="recent" className="space-y-4">
                <Card className="p-6 text-center border-purple-100">
                  <h3 className="text-lg font-semibold mb-2">Recent Posts</h3>
                  <p className="text-gray-600">Stay updated with the latest community discussions and posts.</p>
                </Card>
              </TabsContent>
              
              <TabsContent value="trending" className="space-y-4">
                <Card className="p-6 text-center border-purple-100">
                  <h3 className="text-lg font-semibold mb-2">Trending Now</h3>
                  <p className="text-gray-600">Discover what's hot in the community right now.</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Members */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Top Contributors</CardTitle>
                <CardDescription>Our most active community members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.posts} posts</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {member.level}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Quick Start</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-700">
                  • Share your ideas and projects
                </div>
                <div className="text-sm text-gray-700">
                  • Connect with like-minded people
                </div>
                <div className="text-sm text-gray-700">
                  • Join discussions and events
                </div>
                <div className="text-sm text-gray-700">
                  • Learn from the community
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-white/80 backdrop-blur-sm border-t border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 ConnectHub. Built with passion for community building.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
