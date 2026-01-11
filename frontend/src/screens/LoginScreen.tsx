import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import LoginStyle from "../styles/LoginStyle";
import { ScreenProps } from "../types";

const styles = LoginStyle;

const LoginScreen = ({ navigation }: ScreenProps<"LoginScreen">) => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        navigation.replace("RegisterUserScreen");
      }
    } catch (err) {
      console.error("Google login failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Icon */}
        <View style={styles.iconWrapper}>
          <Ionicons name="location-outline" size={28} color="#FFFFFF" />
        </View>

        {/* Title */}
        <Text style={styles.title}>SnapMap</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          See what's happening on campus
        </Text>

        {/* Button */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.googleButtonText}>
              Continue with Google
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
