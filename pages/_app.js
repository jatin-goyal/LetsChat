import "../styles/globals.css";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./login";
import Loading from "../components/Loading";
import { useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const setUser = async () => {
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoURL: user.photoURL,
        });
      }
    };

    setUser();
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
