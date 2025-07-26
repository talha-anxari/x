import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "../../components/SignOutButton";
import { useUserSync } from "@/hooks/useUserSync";
import { ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PostComposer from "@/components/PostComposer";

const HomeScreen = () => {
  useUserSync();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-6 border-b border-gray-100">
        <Ionicons name="logo-twitter" size={24} color={"#1da1f2"} />
        <Text className="text-xl font-bold text-gray-900">Home</Text>
        <SignOutButton />
      </View>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <PostComposer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
