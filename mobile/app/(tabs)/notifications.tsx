import NoNotificationsFound from "@/components/NoNotificationsFound";
import NotificationCard from "@/components/NotificationCard";
import { useNotifications } from "@/hooks/useNotifications";
import { Notification } from "@/types";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const NotificationsScreen = () => {
  const {
    notifications,
    isLoading,
    error,
    refetch,
    isRefetching,
    deleteNotification,
  } = useNotifications();

  const insets = useSafeAreaInsets();

  if (error) {
    return (
      <View className="items-center justify-center flex-1 p-8">
        <Text className="mb-4 text-gray-500">Failed to load notifications</Text>
        <TouchableOpacity
          className="px-4 py-2 bg-blue-500 rounded-lg"
          onPress={() => refetch()}
        >
          <Text className="font-semibold text-white">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <Text className="text-xl font-bold text-gray-900">Notifications</Text>
        <TouchableOpacity>
          <Feather name="settings" size={24} color="#657786" />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={"#1DA1F2"}
          />
        }
      >
        {isLoading ? (
          <View className="items-center justify-center flex-1 p-8">
            <ActivityIndicator size="large" color="#1DA1F2" />
            <Text className="mt-4 text-gray-500">Loading notifications...</Text>
          </View>
        ) : notifications.length === 0 ? (
          <NoNotificationsFound />
        ) : (
          notifications.map((notification: Notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
              onDelete={deleteNotification}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default NotificationsScreen;
