import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'your_apiKey',
  authDomain: 'your_authDomain',
  projectId: 'your_projectId',
  storageBucket: 'your_storageBucket',
  messagingSenderId: 'your_messagingSenderId',
  appId: 'your_appId',
  measurementId: 'your_measurementId',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
const login = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("ログインエラー:", error);
  }
};

const logout = async () => {
  await signOut(auth);
};

const addSongToFirestore = async (userId: string, song: string) => {
  await addDoc(collection(db, "songs"), {
    userId,
    song,
    date: new Date().toISOString().split('T')[0],
  });
};

const getSongsFromFirestore = async (userId: string) => {
  const q = query(collection(db, "songs"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
};

export { auth, login, logout, addSongToFirestore, getSongsFromFirestore };