import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// import Filter from "bad-words";
import { ref, onUnmounted, computed, reactive } from "vue";

firebase.initializeApp({
  apiKey: "AIzaSyA2z1ZFTCIKO1n7BcQh2HKlLh-z7gkTsSo",
  authDomain: "vue-bid-app.firebaseapp.com",
  projectId: "vue-bid-app",
  storageBucket: "vue-bid-app.appspot.com",
  messagingSenderId: "953499375810",
  appId: "1:953499375810:web:388d09ea4982a70f07c35b",
});

const auth = firebase.auth();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useAuth() {
  const user = ref();
  const unsubscribe = auth.onAuthStateChanged(
    (_user) => (user.value = _user as never)
  );

  console.log(user)

  onUnmounted(unsubscribe);
  const isLogin = computed(() => user.value !== null);

  const signIn = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(googleProvider);
  };
  const signOut = () => auth.signOut();

  return { user, isLogin, signIn, signOut };
}

const firestore = firebase.firestore();
const messagesCollection = firestore.collection("bids");
const messagesQuery = messagesCollection
  .orderBy("createdAt", "desc")
  .limit(100);
// // const filter = new Filter();

export function useBid() {
  const priceList = ref();
  const unsubscribe = messagesQuery.onSnapshot((snapshot) => {
    console.log(snapshot.docs)
    priceList.value = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .reverse();
  });
  onUnmounted(unsubscribe);

  console.log("last", priceList)

  const { user, isLogin } = useAuth();
  const sendPrice = (price: number) => {
    if (!isLogin.value) return;
    const { uid, displayName } = user.value;
    messagesCollection.add({
      nama: displayName,
      id_user: uid,
      price: price,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return { priceList, sendPrice };
}
