import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "../../components/SignOutButton";

const HomeScreen = () => {
  return (
    <SafeAreaView className="items-center justify-center flex-1">
      <SignOutButton />
    </SafeAreaView>
  );
};

export default HomeScreen;
