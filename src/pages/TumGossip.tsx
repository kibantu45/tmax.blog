
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Heart, Send, User, Clock, TrendingUp, Image, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import BottomNavigation from "@/components/BottomNavigation";

interface GossipPost {
  id: string;
  content: string;
  image_url?: string | null;
  likes_count: number | null;
  category: string | null;
  created_at: string;
  user_id?: string | null;
  isLiked: boolean;
}

const TumGossip = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<GossipPost[]>([]);
  const [newPost, setNewPost] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<'trending' | 'love'>('trending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('gossip_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Check which posts the current user has liked
      const postsWithLikes = await Promise.all(
        (data || []).map(async (post) => {
          let isLiked = false;
          if (user) {
            const { data: likeData } = await supabase
              .from('gossip_likes')
              .select('id')
              .eq('post_id', post.id)
              .eq('user_id', user.id)
              .single();
            isLiked = !!likeData;
          }
          return { 
            ...post, 
            isLiked,
            likes_count: post.likes_count || 0,
            category: post.category || 'trending'
          };
        })
      );

      setPosts(postsWithLikes);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to like posts",
        variant: "destructive"
      });
      return;
    }

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    try {
      if (post.isLiked) {
        // Unlike the post
        await supabase
          .from('gossip_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);

        await supabase
          .from('gossip_posts')
          .update({ likes_count: post.likes_count - 1 })
          .eq('id', postId);
      } else {
        // Like the post
        await supabase
          .from('gossip_likes')
          .insert({ post_id: postId, user_id: user.id });

        await supabase
          .from('gossip_posts')
          .update({ likes_count: post.likes_count + 1 })
          .eq('id', postId);
      }

      // Update local state
      setPosts(posts.map(p => 
        p.id === postId 
          ? { 
              ...p, 
              likes_count: p.isLiked ? p.likes_count - 1 : p.likes_count + 1,
              isLiked: !p.isLiked 
            }
          : p
      ));
    } catch (error) {
      console.error('Error updating like:', error);
      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive"
      });
    }
  };

  const handleCreatePost = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to create posts",
        variant: "destructive"
      });
      return;
    }

    if (!newPost.trim()) return;

    try {
      const { error } = await supabase
        .from('gossip_posts')
        .insert({
          content: newPost,
          category: selectedCategory,
          user_id: user.id,
          likes_count: 0
        });

      if (error) throw error;

      setNewPost("");
      toast({
        title: "Post created!",
        description: "Your post has been published",
      });
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive"
      });
    }
  };

  const filteredPosts = (category: 'trending' | 'love') => 
    posts.filter(post => post.category === category);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInDays > 0) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    if (diffInHours > 0) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

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
                <span>{formatTimeAgo(post.created_at)}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-800 mb-4">{post.content}</p>
            
            {/* Image display */}
            {post.image_url && (
              <div className="mb-4">
                <img 
                  src={post.image_url} 
                  alt="Post image" 
                  className="w-full max-h-64 object-cover rounded-lg"
                />
              </div>
            )}
            
            {/* Only Like Actions - No Comments */}
            <div className="flex items-center space-x-4 mb-4 pb-4 border-b border-white/20">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(post.id)}
                className={`${post.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 hover:scale-110 transition-all duration-300`}
              >
                <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? 'fill-current animate-pulse' : ''}`} />
                {post.likes_count}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading gossip...</p>
        </div>
      </div>
    );
  }

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
        {/* Create Post Section */}
        {user && (
          <Card className="mb-8 glass backdrop-blur-lg bg-white/30 border-white/20 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg">Share Something</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <textarea
                  placeholder="What's happening on campus?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="w-full p-3 border border-white/20 rounded-lg bg-white/20 backdrop-blur-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button
                      variant={selectedCategory === 'trending' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory('trending')}
                    >
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Trending
                    </Button>
                    <Button
                      variant={selectedCategory === 'love' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory('love')}
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      Love Stories
                    </Button>
                  </div>
                  <Button 
                    onClick={handleCreatePost}
                    disabled={!newPost.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
              <li>• Only reactions (likes) are allowed - no comments</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default TumGossip;
