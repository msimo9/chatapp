import { app, db } from "./firebase";
import { collection, getDocs, doc, getDoc} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export const handleLogin = (username, password, toggleLoginVis, saveUserID) =>{
    const auth = getAuth();
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toggleLoginVis();
        const userID = user.uid;
        saveUserID(userID);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
}

export const readFriendsList = () => {
    
}

export const searchFieldOutput = async (setUsers) => {
    let tempUsersArr = []
    const querySnapshot = await getDocs(collection(db, "userInfo"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        tempUsersArr.push(doc.data());
    });
    setUsers(tempUsersArr);
}

export const getUserData = async(userID, saveUserData, toggleDataReady) => {
  const docRef = doc(db, "userInfo", userID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    saveUserData(docSnap.data());
    toggleDataReady();
  } else {
    console.log("No such document!");
  }
}