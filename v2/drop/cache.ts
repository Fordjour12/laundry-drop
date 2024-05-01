import type { TokenCache } from "@clerk/clerk-expo/dist/cache";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const createTokenCache = (): TokenCache => {
	return {
		getToken: (key: string) => {
			return SecureStore.getItemAsync(key);
		},
		saveToken: (key: string, value: string) => {
			return SecureStore.setItemAsync(key, value);
		},
	};
};

// SecureStore is not supported on the web
// https://github.com/expo/expo/issues/7744#issuecomment-611093485
export const tokenCache =
	Platform.OS !== "web" ? createTokenCache() : undefined;
