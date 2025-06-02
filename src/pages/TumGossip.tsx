
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Heart, Send, User, Clock } from "lucide-react";
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
  const [newPost, setNewPost] = useState("");
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
        isLiked: false
      },
      {
        id: "2",
        content: "The new cafeteria menu is actually fire 🔥 Finally some good food!",
        timestamp: "5 hours ago",
        likes: 45,
        comments: [
          { id: "c3", content: "The chicken is so good now!", timestamp: "4 hours ago", author: "Anonymous" }
        ],
        isLiked: false
      },
      {
        id: "3",
        content: "Someone left their laptop charger in LT5. Check the lost and found!",
        timestamp: "1 day ago",
        likes: 12,
        comments: [],
        isLiked: false
      }
    ];
    setPosts(samplePosts);
  }, []);

  const handleSubmitPost = () => {
    if (!newPost.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content for your post",
        variant: "destructive"
      });
      return;
    }

    const post: GossipPost = {
      id: Date.now().toString(),
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      comments: [],
      isLiked: false
    };

    setPosts([post, ...posts]);
    setNewPost("");
    toast({
      title: "Posted!",
      description: "Your anonymous message has been shared",
    });
  };

  const handleLike = (postId: string) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-700 flex items-center">
                <MessageSquare className="w-8 h-8 mr-3" />
                TUM Gossip
              </h1>
              <p className="text-gray-600 mt-2">Share campus news and discussions anonymously</p>
            </div>
            <Button onClick={() => window.history.back()} variant="outline">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Post Creation */}
        <Card className="mb-8 bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Share Something Anonymously
            </CardTitle>
            <CardDescription>
              What's happening on campus? Share news, events, or just chat with fellow students.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="What's the tea? Share something happening on campus..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <Badge variant="outline">Anonymous Post</Badge>
                <Button 
                  onClick={handleSubmitPost}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Anonymously
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="bg-white/90 hover:shadow-lg transition-shadow">
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
                <div className="flex items-center space-x-4 mb-4 pb-4 border-b">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`${post.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                  >
                    <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    {post.comments.length}
                  </Button>
                </div>

                {/* Comments Section */}
                {post.comments.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
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
                    className="flex-1"
                  />
                  <Button 
                    size="sm"
                    onClick={() => handleComment(post.id)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guidelines */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
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
