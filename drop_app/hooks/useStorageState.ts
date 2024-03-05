import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useReducer } from "react";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

/**
 * Custom hook for managing state asynchronously.
 * @template T - The type of the state value.
 * @param initialValue - The initial value of the state.
 * @returns A tuple containing the state and a setter function.
 */
function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

/**
 * Sets a value in the secure storage asynchronously.
 * @param key - The key to identify the value in the storage.
 * @param value - The value to be stored. Use `null` to delete the item.
 * @returns A promise that resolves when the operation is complete.
 */
export async function setStorageItemAsync(key: string, value: string | null) {
  if (value === null) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

/**
 * Custom hook for managing state in the secure storage.
 * @param key - The key to identify the value in the storage.
 * @returns A tuple containing the state and a setter function.
 */

export function useStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>();

  // GET
  useEffect(() => {
    SecureStore.getItemAsync(key).then((value) => {
      setState(value);
    });
  }, []);

  // SET
  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
