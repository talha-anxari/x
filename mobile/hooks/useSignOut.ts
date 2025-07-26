import { useClerk } from "@clerk/clerk-expo";
import { Alert } from "react-native";

export const useSignOut = () => {
  const { signOut } = useClerk();

  const handleSignOut = () => {
    Alert.alert("Signout", "Are you sure you want to signout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Signout",
        style: "destructive",
        onPress: () => signOut(),
      },
    ]);
  };

  return { handleSignOut };
};
