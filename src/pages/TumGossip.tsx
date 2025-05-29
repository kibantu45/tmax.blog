import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Heart, MessageCircle, Share, Calendar, TrendingUp, Users, Star, Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const TumGossip = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [stories, setStories] = useState([
    {
      id: "story1",
      title: "New Coffee Shop Opens Near Library",
      content: "A new 24-hour coffee shop just opened next to the main library. Perfect for those late-night study sessions!",
      category: "Campus News",
      author: "Sarah M.",
      time: "2 hours ago",
      likes: 45,
      comments: [
        { id: 1, author: "John D.", text: "Finally! I was waiting for this!", time: "1 hour ago" },
        { id: 2, author: "Mary K.", text: "Great location choice", time: "45 min ago" }
      ],
      trending: true,
      liked: false
    },
    {
      id: "story2", 
      title: "Professor Spotted Dancing at Campus Event",
      content: "Prof. Johnson showed off some incredible dance moves at yesterday's cultural night. Students are calling for an encore!",
      category: "Fun",
      author: "Anonymous",
      time: "5 hours ago",
      likes: 128,
      comments: [
        { id: 1, author: "Alex R.", text: "I was there! It was amazing 😂", time: "4 hours ago" },
        { id: 2, author: "Lisa M.", text: "Prof Johnson is so cool!", time: "3 hours ago" },
        { id: 3, author: "Mike T.", text: "Video please!", time: "2 hours ago" }
      ],
      trending: true,
      liked: false
    },
    {
      id: "story3",
      title: "Lost Cat Found After Week-Long Search", 
      content: "Whiskers, the campus cat that went missing last week, has been found safe and sound near the engineering building.",
      category: "Community",
      author: "Cat Rescue Team",
      time: "1 day ago",
      likes: 89,
      comments: [
        { id: 1, author: "Emma S.", text: "So happy Whiskers is safe! 🐱", time: "20 hours ago" },
        { id: 2, author: "Tom W.", text: "Thanks to everyone who helped search", time: "18 hours ago" }
      ],
      trending: false,
      liked: false
    }
  ]);

  const [newComment, setNewComment] = useState<{[key: string]: string}>({});
  const [openComments, setOpenComments] = useState<string | null>(null);

  const events = [
    {
      id: "event1",
      title: "Annual Tech Fair 2024",
      date: "December 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium",
      description: "Showcase of student tech projects and innovations",
      attendees: 234
    },
    {
      id: "event2",
      title: "Career Networking Night",
      date: "December 20, 2024", 
      time: "6:00 PM - 9:00 PM",
      location: "Student Center",
      description: "Meet industry professionals and potential employers",
      attendees: 156
    },
    {
      id: "event3",
      title: "End of Semester Party",
      date: "December 22, 2024",
      time: "8:00 PM - 12:00 AM", 
      location: "Campus Grounds",
      description: "Celebrate the end of semester with music and food",
      attendees: 567
    }
  ];

  const polls = [
    {
      id: "poll1",
      question: "Best campus food spot?",
      options: [
        { text: "Main Cafeteria", votes: 45 },
        { text: "Food Trucks", votes: 78 },
        { text: "Coffee Shop", votes: 23 },
        { text: "Student Lounge", votes: 12 }
      ],
      totalVotes: 158
    },
    {
      id: "poll2",
      question: "Preferred study location?",
      options: [
        { text: "Library", votes: 89 },
        { text: "Dorm Room", votes: 34 },
        { text: "Outdoor Spaces", votes: 23 },
        { text: "Coffee Shop", votes: 67 }
      ],
      totalVotes: 213
    }
  ];

  const handleLike = (storyId: string) => {
    setStories(prevStories => 
      prevStories.map(story => 
        story.id === storyId 
          ? { 
              ...story, 
              liked: !story.liked,
              likes: story.liked ? story.likes - 1 : story.likes + 1
            }
          : story
      )
    );
  };

  const handleComment = (storyId: string) => {
    const commentText = newComment[storyId];
    if (!commentText || commentText.trim() === '') return;

    const newCommentObj = {
      id: Date.now(),
      author: "You",
      text: commentText.trim(),
      time: "Just now"
    };

    setStories(prevStories =>
      prevStories.map(story =>
        story.id === storyId
          ? {
              ...story,
              comments: [...story.comments, newCommentObj]
            }
          : story
      )
    );

    setNewComment(prev => ({ ...prev, [storyId]: '' }));
  };

  const handleShare = (story: any) => {
    const message = `Check out this campus story: ${story.title} - ${story.content}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastelYellow via-pastelYellow-light to-pastelYellow-dark">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-tmaxGreen-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-tmaxGreen-700">Campus Gossip</h1>
              <p className="text-gray-600 mt-2">Stay updated with campus life and events</p>
            </div>
            <Button onClick={() => window.history.back()} variant="outline">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search stories, events, polls..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/90"
            />
          </div>
        </div>

        <Tabs defaultValue="stories" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80">
            <TabsTrigger value="stories" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Stories
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="polls" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Polls
            </TabsTrigger>
            <TabsTrigger value="submit" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              <Star className="w-4 h-4 mr-2" />
              Submit
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stories" className="space-y-6">
            <div className="space-y-6">
              {filteredStories.map((story) => (
                <Card key={story.id} className="hover:shadow-lg transition-shadow bg-white/90">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-lg">{story.title}</CardTitle>
                          {story.trending && <Badge variant="destructive">Trending</Badge>}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>By {story.author}</span>
                          <span>{story.time}</span>
                          <Badge variant="outline">{story.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{story.content}</p>
                    <div className="flex items-center space-x-4 mb-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(story.id)}
                        className={`flex items-center space-x-1 ${story.liked ? 'text-red-500' : ''}`}
                      >
                        <Heart className={`w-4 h-4 ${story.liked ? 'fill-current' : ''}`} />
                        <span>{story.likes}</span>
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{story.comments.length}</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Comments - {story.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            {/* Existing Comments */}
                            {story.comments.map((comment) => (
                              <div key={comment.id} className="border-b pb-3">
                                <div className="flex justify-between items-start mb-1">
                                  <span className="font-semibold text-sm text-tmaxGreen-700">{comment.author}</span>
                                  <span className="text-xs text-gray-500">{comment.time}</span>
                                </div>
                                <p className="text-gray-700 text-sm">{comment.text}</p>
                              </div>
                            ))}
                            
                            {/* Add New Comment */}
                            <div className="flex space-x-2 pt-4 border-t">
                              <Textarea
                                placeholder="Write a comment..."
                                value={newComment[story.id] || ''}
                                onChange={(e) => setNewComment(prev => ({ ...prev, [story.id]: e.target.value }))}
                                className="flex-1 min-h-[60px]"
                              />
                              <Button 
                                onClick={() => handleComment(story.id)}
                                className="bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                                disabled={!newComment[story.id]?.trim()}
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(story)}
                        className="flex items-center space-x-1"
                      >
                        <Share className="w-4 h-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow bg-white/90">
                  <CardHeader>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {event.attendees} interested
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Location:</span>
                      <span className="ml-1">{event.location}</span>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button 
                        className="flex-1 bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                        onClick={() => window.open(`https://wa.me/254702752033?text=Hi, I'm interested in the event: ${event.title}`, '_blank')}
                      >
                        I'm Interested
                      </Button>
                      <Button variant="outline" onClick={() => handleShare(event)}>
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="polls" className="space-y-6">
            <div className="space-y-6">
              {polls.map((poll) => (
                <Card key={poll.id} className="hover:shadow-lg transition-shadow bg-white/90">
                  <CardHeader>
                    <CardTitle className="text-lg">{poll.question}</CardTitle>
                    <CardDescription>{poll.totalVotes} total votes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {poll.options.map((option, index) => {
                      const percentage = Math.round((option.votes / poll.totalVotes) * 100);
                      return (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{option.text}</span>
                            <span>{option.votes} votes ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-tmaxGreen-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                    <Button 
                      className="w-full mt-4 bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                      onClick={() => window.open(`https://wa.me/254702752033?text=Hi, I'd like to participate in the poll: ${poll.question}`, '_blank')}
                    >
                      Vote via WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="submit" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/90">
                <CardHeader>
                  <CardTitle>Submit a Story</CardTitle>
                  <CardDescription>Share interesting campus news or events</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                    onClick={() => window.open('https://wa.me/254702752033?text=Hi, I have a campus story to share on Tmax Gossip.', '_blank')}
                  >
                    Submit Story
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90">
                <CardHeader>
                  <CardTitle>Create a Poll</CardTitle>
                  <CardDescription>Ask the campus community what they think</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                    onClick={() => window.open('https://wa.me/254702752033?text=Hi, I want to create a poll for the campus community.', '_blank')}
                  >
                    Create Poll
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90">
                <CardHeader>
                  <CardTitle>Post an Event</CardTitle>
                  <CardDescription>Promote your upcoming campus event</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                    onClick={() => window.open('https://wa.me/254702752033?text=Hi, I want to post an event on Tmax Campus Gossip.', '_blank')}
                  >
                    Post Event
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90">
                <CardHeader>
                  <CardTitle>Anonymous Tip</CardTitle>
                  <CardDescription>Share something anonymously</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                    onClick={() => window.open('https://wa.me/254702752033?text=Hi, I have an anonymous tip to share.', '_blank')}
                  >
                    Submit Anonymously
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TumGossip;
