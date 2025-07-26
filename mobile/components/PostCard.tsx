import { Post, User } from "@/types";
import { formatDate, formatNumber } from "@/utils/formatters";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onDelete: (postId: string) => void;
  onComment: (post: Post) => void;
  isLiked?: boolean;
  currentUser: User;
}

const PostCard = ({
  currentUser,
  onDelete,
  onLike,
  post,
  isLiked,
  onComment,
}: PostCardProps) => {
  const isOwnPost = post.user._id === currentUser._id;

  const handleDelete = () => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(post._id),
      },
    ]);
  };

  console.log("Profile Pic:", post.user.profilePicture);
  console.log("Post Image:", post.image);
  console.log("Post Content:", post.content);
  return (
    <View className="bg-white border-b border-gray-100">
      <View className="flex-row p-4">
        <Image
          source={{ uri: post.user.profilePicture || "" }}
          className="w-12 h-12 mr-3 rounded-full"
        />

        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <View className="flex-row items-center">
              <Text className="mr-1 font-bold text-gray-900">
                {post.user.firstName} {post.user.lastName}
              </Text>
              <Text className="ml-1 text-gray-500">
                @{post.user.username} · {formatDate(post.createdAt)}
              </Text>
            </View>
            {isOwnPost && (
              <TouchableOpacity onPress={handleDelete}>
                <Feather name="trash" size={20} color="#657786" />
              </TouchableOpacity>
            )}
          </View>

          {post.content && (
            <Text className="mb-3 text-base leading-5 text-gray-900">
              {post.content}
            </Text>
          )}

          {post.image && (
            // <Image
            //   source={{ uri: post.image }}
            //   className="w-full h-48 mb-3 rounded-2xl"
            //   resizeMode="cover"
            // />
            <Image
              source={{
                uri:
                  post.image ||
                  "https://images.unsplash.com/photo-1753236408632-3ea319dd823d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              style={styles.postImage}
              className="mb-3 rounded-2xl"
            />
          )}

          <View className="flex-row justify-between max-w-xs">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => onComment(post)}
            >
              <Feather name="message-circle" size={18} color="#657786" />
              <Text className="ml-2 text-sm text-gray-500">
                {formatNumber(post.comments?.length || 0)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center">
              <Feather name="repeat" size={18} color="#657786" />
              <Text className="ml-2 text-sm text-gray-500">0</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => onLike(post._id)}
            >
              {isLiked ? (
                <AntDesign name="heart" size={18} color="#E0245E" />
              ) : (
                <Feather name="heart" size={18} color="#657786" />
              )}

              <Text
                className={`text-sm ml-2 ${isLiked ? "text-red-500" : "text-gray-500"}`}
              >
                {formatNumber(post.likes?.length || 0)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Feather name="share" size={18} color="#657786" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
});

export default PostCard;
