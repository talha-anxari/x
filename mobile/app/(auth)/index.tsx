import { useSocialAuth } from "@/hooks/useSocialAuth";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

export default function Index() {
  const { handleSocialAuth, isLoading } = useSocialAuth();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.content}>
          {/* DEMO IMAGE */}
          <View style={styles.imageWrapper}>
            <Image
              source={require("../../assets/images/auth2.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.buttonGroup}>
            {/* GOOGLE SIGNIN BTN */}
            <TouchableOpacity
              style={[styles.authButton, styles.shadow]}
              onPress={() => handleSocialAuth("oauth_google")}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#4285F4" />
              ) : (
                <View style={styles.buttonContent}>
                  <Image
                    source={require("../../assets/images/google.png")}
                    style={styles.googleIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.buttonText}>Continue with Google</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* APPLE SIGNIN BTN */}
            <TouchableOpacity
              style={[styles.authButton, styles.shadow]}
              onPress={() => handleSocialAuth("oauth_apple")}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <View style={styles.buttonContent}>
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
            <Text style={styles.linkText}>Cookie Use</Text>.
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
    paddingHorizontal: 32,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 24,
  },
  image: {
    width: 300,
    height: 300,
  },
  buttonGroup: {
    flexDirection: "column",
    gap: 12,
  },
  authButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db", // gray-300
    borderRadius: 999,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  appleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  termsText: {
    marginTop: 24,
    paddingHorizontal: 8,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    color: "#6b7280", // gray-500
  },
  linkText: {
    color: "#3b82f6", // blue-500
  },
});
