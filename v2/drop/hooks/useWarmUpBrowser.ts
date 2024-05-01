import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Platform } from "react-native";

export const useWamUpBrowser = () => {
	React.useEffect(() => {
		if (Platform.OS !== "android") return;

		void WebBrowser.warmUpAsync();
		return () => {
			if (Platform.OS !== "android") return;

			void WebBrowser.coolDownAsync();
		};
	}, []);
};
