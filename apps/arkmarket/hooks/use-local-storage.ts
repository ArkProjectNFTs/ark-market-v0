import React, { useCallback, useEffect } from "react";

const dispatchStorageEvent = (key: string, newValue: string | null): void => {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
};

const setLocalStorageItem = (key: string, value: any): void => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  // Assuming dispatchStorageEvent is defined elsewhere in your code
  dispatchStorageEvent(key, stringifiedValue);
};

const removeLocalStorageItem = (key: string): void => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

const getLocalStorageItem = (key: string): string | null => {
  return window.localStorage.getItem(key);
};

const useLocalStorageSubscribe = (
  callback: EventListenerOrEventListenerObject
): (() => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getLocalStorageServerSnapshot = (): never => {
  throw Error("useLocalStorage is a client-only hook");
};

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const getSnapshot = (): T | null => {
    const item = getLocalStorageItem(key);
    return item ? JSON.parse(item) : null;
  };

  const store = React.useSyncExternalStore<T | null>(
    useLocalStorageSubscribe,
    getSnapshot,
    getLocalStorageServerSnapshot
  );
  
  const setState = useCallback(
    (v: React.SetStateAction<T>): void => {
      try {
        const parsedStore =
          store && typeof store === "string" ? JSON.parse(store) : null;

        let nextState: T | null = null;

        if (typeof v === "function") {
          const updaterFn = v as (prevState: T) => T; // Type assertion here
          nextState = updaterFn(parsedStore);
        } else {
          // If v is not a function, it must be of type T
          nextState = v;
        }

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem(key, nextState);
        }
      } catch (e) {
        console.warn(e);
      }
    },
    [key, store]
  );

  useEffect(() => {
    if (
      getLocalStorageItem(key) === null &&
      typeof initialValue !== "undefined"
    ) {
      setLocalStorageItem(key, initialValue);
    }
  }, [key, initialValue]);

  return [
    store && typeof store === "string" ? JSON.parse(store) : initialValue,
    setState
  ];
}
