import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { Redirect } from "expo-router";

export default function SSOCallback() {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      // Redirect to home (tabs) after successful sign-in
      window.location.href = "/(tabs)";
    }
  }, [isSignedIn]);

  return null; // Ya koi loading screen
}
