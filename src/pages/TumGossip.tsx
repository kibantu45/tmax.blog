
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Heart, Send, User, Clock, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";

interface GossipPost {
  id: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  category: 'trending' | 'love';
}

interface Comment {
  id: string;
  content: string;
  timestamp: string;
  author: string;
}

const TumGossip = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<GossipPost[]>([]);
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  // Initialize with some sample posts
  useEffect(() => {
    const samplePosts: GossipPost[] = [
      {
        id: "1",
        content: "Did anyone see what happened at the library yesterday? The drama was unreal! 👀",
        timestamp: "2 hours ago",
        likes: 23,
        comments: [
          { id: "c1", content: "I was there! Can't believe it happened", timestamp: "1 hour ago", author: "Anonymous" },
          { id: "c2", content: "What exactly happened? Spill the tea! ☕", timestamp: "45 min ago", author: "Anonymous" }
        ],
        isLiked: false,
        category: 'trending'
      },
      {
        id: "2",
        content: "Looking for someone special to share campus life with 💕 DM if interested",
        timestamp: "5 hours ago",
        likes: 45,
        comments: [
          { id: "c3", content: "Good luck finding someone!", timestamp: "4 hours ago", author: "Anonymous" }
        ],
        isLiked: false,
        category: 'love'
      },
      {
        id: "3",
        content: "Someone left their laptop charger in LT5. Check the lost and found!",
        timestamp: "1 day ago",
        likes: 12,
        comments: [],
        isLiked: false,
        category: 'trending'
      },
      {
        id: "4",
        content: "Saw my crush at the cafeteria today but couldn't work up the courage to say hi 😅",
        timestamp: "3 hours ago",
        likes: 18,
        comments: [
          { id: "c4", content: "You got this! Just say hello next time", timestamp: "2 hours ago", author: "Anonymous" }
        ],
        isLiked: false,
        category: 'love'
      },
      {
        id: "5",
        content: "The new cafeteria menu is actually fire! Finally some good food on campus 🔥",
        timestamp: "6 hours ago",
        likes: 31,
        comments: [
          { id: "c5", content: "Which items did you try?", timestamp: "5 hours ago", author: "Anonymous" },
          { id: "c6", content: "The chicken is amazing!", timestamp: "4 hours ago", author: "Anonymous" }
        ],
        isLiked: false,
        category: 'trending'
      },
      {
        id: "6",
        content: "Anyone else think the guy from engineering block is cute? Asking for a friend 😏",
        timestamp: "8 hours ago",
        likes: 27,
        comments: [
          { id: "c7", content: "Which one? There are many cute guys there! 😂", timestamp: "7 hours ago", author: "Anonymous" }
        ],
        isLiked: false,
        category: 'love'
      }
    ];
    setPosts(samplePosts);
  }, []);

  const handleLike = (postId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to like posts",
        variant: "destructive"
      });
      return;
    }

    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked 
          }
        : post
    ));
  };

  const handleComment = (postId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to comment",
        variant: "destructive"
      });
      return;
    }

    const commentContent = commentInputs[postId];
    if (!commentContent?.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      content: commentContent,
      timestamp: "Just now",
      author: "Anonymous"
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));

    setCommentInputs({ ...commentInputs, [postId]: "" });
    toast({
      title: "Comment added!",
      description: "Your comment has been posted anonymously",
    });
  };

  const filteredPosts = (category: 'trending' | 'love') => 
    posts.filter(post => post.category === category);

  const PostsList = ({ posts }: { posts: GossipPost[] }) => (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <Card key={post.id} className="glass backdrop-blur-lg bg-white/30 hover:bg-white/40 border-white/20 hover:shadow-2xl transition-all duration-500 animate-fade-in" style={{animationDelay: `${index * 150}ms`}}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500">Anonymous</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{post.timestamp}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-800 mb-4">{post.content}</p>
            
            {/* Like and Comment Actions */}
            <div className="flex items-center space-x-4 mb-4 pb-4 border-b border-white/20">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(post.id)}
                className={`${post.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 hover:scale-110 transition-all duration-300`}
              >
                <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? 'fill-current animate-pulse' : ''}`} />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:scale-110 transition-all duration-300">
                <MessageSquare className="w-4 h-4 mr-1" />
                {post.comments.length}
              </Button>
            </div>

            {/* Comments Section */}
            {post.comments.length > 0 && (
              <div className="space-y-3 mb-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="glass bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-800">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment */}
            <div className="flex space-x-2">
              <Input
                placeholder="Add a comment..."
                value={commentInputs[post.id] || ""}
                onChange={(e) => setCommentInputs({
                  ...commentInputs,
                  [post.id]: e.target.value
                })}
                className="flex-1 glass backdrop-blur-sm bg-white/20 border-white/30 hover:bg-white/30 transition-all duration-300"
              />
              <Button 
                size="sm"
                onClick={() => handleComment(post.id)}
                className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20">
      {/* Header with glassmorphism */}
      <header className="glass backdrop-blur-xl bg-white/20 border-b border-white/30 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold text-blue-700 flex items-center">
                <MessageSquare className="w-8 h-8 mr-3 animate-bounce" />
                TUM Gossip
              </h1>
              <p className="text-gray-600 mt-2">Campus news and discussions</p>
            </div>
            <Button onClick={() => window.history.back()} variant="outline" className="glass hover:scale-105 transition-all duration-300">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Posts Feed with Tabs and glassmorphism */}
        <Tabs defaultValue="trending" className="space-y-6 animate-fade-in">
          <TabsList className="grid w-full grid-cols-2 glass backdrop-blur-lg bg-white/30 border-white/20">
            <TabsTrigger value="trending" className="flex items-center space-x-2 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-700 transition-all duration-300 hover:scale-105">
              <TrendingUp className="w-4 h-4" />
              <span>Trending Stories</span>
            </TabsTrigger>
            <TabsTrigger value="love" className="flex items-center space-x-2 data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-700 transition-all duration-300 hover:scale-105">
              <Heart className="w-4 h-4" />
              <span>Campus Love Stories</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending">
            <PostsList posts={filteredPosts('trending')} />
          </TabsContent>

          <TabsContent value="love">
            <PostsList posts={filteredPosts('love')} />
          </TabsContent>
        </Tabs>

        {/* Guidelines with glassmorphism */}
        <Card className="mt-8 glass backdrop-blur-lg bg-blue-50/30 border-blue-200/30 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-blue-800">Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Be respectful to fellow students</li>
              <li>• No hate speech or harassment</li>
              <li>• Keep it campus-related</li>
              <li>• No sharing of personal information</li>
              <li>• Anonymous doesn't mean irresponsible</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default TumGossip;
