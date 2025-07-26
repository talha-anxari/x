import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePosts } from "@/hooks/usePosts";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import PostCard from "./PostCard";
import { useState } from "react";
import CommentsModal from "./CommentsModal";
import { Post } from "@/types";

const PostsList = ({ username }: { username?: string }) => {
  const { currentUser } = useCurrentUser();
  const {
    posts,
    isLoading,
    error,
    refetch,
    toggleLike,
    deletePost,
    checkIsLiked,
  } = usePosts(username);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const selectedPost = selectedPostId
    ? posts.find((p: Post) => p._id === selectedPostId)
    : null;

  if (isLoading) {
    return (
      <View className="items-center p-8">
        <ActivityIndicator size="large" color="#1DA1F2" />
        <Text className="mt-2 text-gray-500">Loading posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="items-center p-8">
        <Text className="mb-4 text-gray-500">Failed to load posts</Text>
        <TouchableOpacity
          className="px-4 py-2 bg-blue-500 rounded-lg"
          onPress={() => refetch()}
        >
          <Text className="font-semibold text-white">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (posts.length === 0) {
    return (
      <View className="items-center p-8">
        <Text className="text-gray-500">No posts yet</Text>
      </View>
    );
  }

  return (
    <>
      {posts.map((post: Post) => (
        <PostCard
          key={post._id}
          post={post}
          onLike={toggleLike}
          onDelete={deletePost}
          onComment={(post: Post) => setSelectedPostId(post._id)}
          currentUser={currentUser}
          isLiked={checkIsLiked(post.likes, currentUser)}
        />
      ))}

      <CommentsModal
        selectedPost={selectedPost}
        onClose={() => setSelectedPostId(null)}
      />
    </>
  );
};

export default PostsList;
