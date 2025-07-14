import { useSocialAuth } from "@/hooks/useSocialAuth";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const { isLoading, handleSocialAuth } = useSocialAuth();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.centerContent}>
          {/* Demo Image */}
          <View style={styles.imageWrapper}>
            <Image
              source={require("../../assets/images/auth2.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.buttonContainer}>
            {/* Google Button */}
            <TouchableOpacity
              style={[styles.googleButton, isLoading && styles.disabledButton]}
              disabled={isLoading}
              onPress={() => handleSocialAuth("oauth_google")}
            >
              {isLoading ? (
                <ActivityIndicator size={"small"} color="#4285f4" />
              ) : (
                <View style={styles.appleButton}>
                  <Image
                    source={require("../../assets/images/google.png")}
                    style={styles.googleIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.buttonText}>Continue with Google</Text>
                </View>
              )}
            </TouchableOpacity>
            {/* Apple Button */}
            <TouchableOpacity
              style={[styles.googleButton, isLoading && styles.disabledButton]}
              disabled={isLoading}
              onPress={() => handleSocialAuth("oauth_apple")}
            >
              {isLoading ? (
                <ActivityIndicator size={"small"} color={"#000"} />
              ) : (
                <View style={styles.appleButton}>
                  <Image
                    source={require("../../assets/images/apple.png")}
                    style={styles.appleIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.buttonText}>Continue with Apple</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          {/* Terms and Privacy */}
          <Text style={styles.termsText}>
            By signing up, you agree to our{" "}
            <Text style={styles.linkText}>Terms</Text>
            {", "}
            <Text style={styles.linkText}>Privacy Policy</Text>
            {", and "}
            <Text style={styles.linkText}>Cookie Use</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 32, // px-8
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 32,
  },
  image: {
    width: 384, // size-96
    height: 384,
  },
  buttonContainer: {
    flexDirection: "column",
    rowGap: 8,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db", // Tailwind border-gray-300
    borderRadius: 9999, // fully rounded
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 2,
  },
  disabledButton: {
    opacity: 0.5,
  },
  googleIcon: {
    width: 40, // size-10
    height: 40,
    marginRight: 12, // mr-3
  },
  appleIcon: {
    width: 30, // size-10
    height: 30,
    marginRight: 12, // mr-3
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500", // Tailwind font-medium
  },
  appleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  termsText: {
    paddingHorizontal: 8, // px-2 => 2 * 4 = 8
    marginTop: 24, // mt-6 => 6 * 4 = 24
    fontSize: 12, // text-xs
    lineHeight: 16, // leading-4 => 4 * 4 = 16
    textAlign: "center",
    color: "#6b7280", // text-gray-500 (Tailwind color)
  },
  linkText: {
    color: "#3b82f6", // text-blue-500
  },
});
