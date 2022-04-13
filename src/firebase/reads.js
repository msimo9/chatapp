import { app, db } from "./firebase";
import { collection, getDocs, doc, getDoc, query, where,} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { storage } from "./firebase";
import { getDownloadURL, ref } from "firebase/storage";

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

export const readProfilePhotoURL = (userID, setProfilePhoto, toggleChangesMade) => {
  if(userID !== undefined){
    const pathRef = '/userData/'+userID+'/profilePhoto';
    getDownloadURL(ref(storage, pathRef))
    .then((url) => {
      setProfilePhoto(url);
      toggleChangesMade();
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

export const getFriendRequests = async (userID, setFriendRequests, toggleChangesMade) => {
  const docRef = doc(db, "userInfo", userID);
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()) {
    setFriendRequests(docSnap.data().friendRequest);
    toggleChangesMade();
  }else{
    console.log("No such document");
  }
}

export const getAddedFriends = async (userID, setAddedFriends, toggleChangesMade) => {
  const docRef = doc(db, "userInfo", userID);
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()) {
    setAddedFriends(docSnap.data().addedFriends);
    toggleChangesMade();
  }else{
    console.log("No such document");
  }
}

export const readMessages = async (userID, setSentMessages, setReceivedMessages, setUniqueIDs, toggleChangesMade) => {
  const q1 = query(collection(db, "messages"), where("senderID", "==", userID));
  const q2 = query(collection(db, "messages"), where("receiverID", "==", userID));

  let sentArr = [];
  let receivedArr = [];
  let friendsIDs = [];
  
  const querySnapshot1 = await getDocs(q1);
  querySnapshot1.forEach((doc) => {
    sentArr.push(doc.data());
    friendsIDs.push(doc.data().receiverID);
  });

  const querySnapshot2 = await getDocs(q2);
  querySnapshot2.forEach((doc) => {
    receivedArr(doc.data());
    friendsIDs.push(doc.data().senderID);
  });

  const uniqueIDs = [...new Set(friendsIDs)];
  setUniqueIDs(uniqueIDs);
  setSentMessages(sentArr);
  setReceivedMessages(sentArr);
  toggleChangesMade();
}