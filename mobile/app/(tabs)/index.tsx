import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "../../components/SignOutButton";
import { useUserSync } from "@/hooks/useUserSync";

const HomeScreen = () => {
  useUserSync();
  return (
    <SafeAreaView className="items-center justify-center flex-1">
      <SignOutButton />
    </SafeAreaView>
  );
};

export default HomeScreen;
