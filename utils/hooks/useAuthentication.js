import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";



const auth = getAuth();
export function useAuthentication() {
  const [user, setUser] = useState("");
  const [unmounted, setunmounted] = useState(false);

  useEffect(() => {
    if (!unmounted) {
      const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
        auth,
        (user) => {
          user ? setUser(user) : setUser(undefined);
          return () => {
            unsubscribeFromAuthStatusChanged;
          };
        }
      );
    }
    return () => {
      setunmounted(true)
    };
  }, []);
  return { user, setunmounted};
}

