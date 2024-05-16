import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useReducer } from "react";
import { Platform } from "react-native";

type useStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
	initialValue: [boolean, T | null] = [true, null],
): useStateHook<T> {
	return useReducer(
		(
			state: [boolean, T | null],
			action: T | null = null,
		): [boolean, T | null] => [false, action],
		initialValue,
	) as useStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
	if (Platform.OS === "web") {
		try {
			if (value === null) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, value);
			}
		} catch (error) {
			console.error("Local storage is unavailable", error);
		}
	} else {
		if (value === null) {
			await SecureStore.deleteItemAsync(key);
		} else {
			await SecureStore.setItemAsync(key, value);
		}
	}
}

export function useStorageState(key: string): useStateHook<string> {
	const [state, setState] = useAsyncState<string>();

	useEffect(() => {
		if (Platform.OS === "web") {
			try {
				if (typeof localStorage !== "undefined") {
					setState(localStorage.getItem(key));
				}
			} catch (error) {
				console.error("Local storage is unavailable", error);
			}
		} else {
			SecureStore.getItemAsync(key).then((value) => setState(value));
		}
	}, [key, setState]);

	const setValue = useCallback(
		(value: string | null) => {
			setState(value);
			setStorageItemAsync(key, value);
		},
		[key, setState],
	);

	return [state, setValue];
}
