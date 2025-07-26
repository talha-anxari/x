import { useComments } from "@/hooks/useComments";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Post } from "@/types";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";

interface CommentsModalProps {
  selectedPost: Post;
  onClose: () => void;
}

const CommentsModal = ({ selectedPost, onClose }: CommentsModalProps) => {
  const { commentText, setCommentText, createComment, isCreatingComment } =
    useComments();
  const { currentUser } = useCurrentUser();

  const handleClose = () => {
    onClose();
    setCommentText("");
  };

  return (
    <Modal
      visible={!!selectedPost}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      {/* MODAL HEADER */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={handleClose}>
          <Text className="text-lg text-blue-500">Close</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Comments</Text>
        <View className="w-12" />
      </View>

      {selectedPost && (
        <ScrollView className="flex-1">
          {/* ORIGINAL POST */}
          <View className="p-4 bg-white border-b border-gray-100">
            <View className="flex-row">
              <Image
                source={{ uri: selectedPost.user.profilePicture }}
                className="mr-3 rounded-full size-12"
              />

              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <Text className="mr-1 font-bold text-gray-900">
                    {selectedPost.user.firstName} {selectedPost.user.lastName}
                  </Text>
                  <Text className="ml-1 text-gray-500">
                    @{selectedPost.user.username}
                  </Text>
                </View>

                {selectedPost.content && (
                  <Text className="mb-3 text-base leading-5 text-gray-900">
                    {selectedPost.content}
                  </Text>
                )}

                {selectedPost.image && (
                  <Image
                    source={{ uri: selectedPost.image }}
                    className="w-full h-48 mb-3 rounded-2xl"
                    resizeMode="cover"
                  />
                )}
              </View>
            </View>
          </View>

          {/* COMMENTS LIST */}
          {selectedPost.comments.map((comment) => (
            <View
              key={comment._id}
              className="p-4 bg-white border-b border-gray-100"
            >
              <View className="flex-row">
                <Image
                  source={{ uri: comment.user.profilePicture }}
                  className="w-10 h-10 mr-3 rounded-full"
                />

                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <Text className="mr-1 font-bold text-gray-900">
                      {comment.user.firstName} {comment.user.lastName}
                    </Text>
                    <Text className="ml-1 text-sm text-gray-500">
                      @{comment.user.username}
                    </Text>
                  </View>

                  <Text className="mb-2 text-base leading-5 text-gray-900">
                    {comment.content}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {/* ADD COMMENT INPUT */}

          <View className="p-4 border-t border-gray-100">
            <View className="flex-row">
              <Image
                source={{ uri: currentUser?.profilePicture }}
                className="mr-3 rounded-full size-10"
              />

              <View className="flex-1">
                <TextInput
                  className="p-3 mb-3 text-base border border-gray-200 rounded-lg outline-none"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChangeText={setCommentText}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />

                <TouchableOpacity
                  className={`px-4 py-2 rounded-lg self-start ${
                    commentText.trim() ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  onPress={() => createComment(selectedPost._id)}
                  disabled={isCreatingComment || !commentText.trim()}
                >
                  {isCreatingComment ? (
                    <ActivityIndicator size={"small"} color={"white"} />
                  ) : (
                    <Text
                      className={`font-semibold ${
                        commentText.trim() ? "text-white" : "text-gray-500"
                      }`}
                    >
                      Reply
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </Modal>
  );
};

export default CommentsModal;
