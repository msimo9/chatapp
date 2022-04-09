import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc, arrayUnion, arrayRemove} from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";


import { app } from "./firebase";
import { db } from "./firebase";
import { storage } from "./firebase";
import { readProfilePhotoURL } from "./reads";



export const handleSignUp = (email, password, username, fullName, birthDate, saveUserID) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("user ", user, " signed up successfully!");
        const userID = user.uid;
        saveUserID(userID);
        handleSaveAdditionalInfo(userID, email, username, fullName, birthDate);
        return true;
    })
    .catch((error) => {
        console.log(error.code, " ", error.message);
        return false;
    });
}

export const handleSendMessage = () => {

}

export const handleSignOut = (action) => {
    const auth = getAuth();
    signOut(auth).then(() => {
        action();
    }).catch((error) => {
    // An error happened.
    });
}

export const handleSaveAdditionalInfo = async (userID, email, username, fullName, birthDate) => {
    await setDoc(doc(db, "userInfo", userID), {
        userID: userID,
        email: email,
        username: username,
        fullName: fullName,
        birthDate: birthDate,
      });
}

export const handleUpdateUserInfo = async (userID, fullName, username, email, birthDate, toggleChangesMade, image) => {
    const userRef = doc(db, "userInfo", userID);

    await updateDoc(userRef, {
        fullName: fullName,
        username: username,
        email: email,
        birthDate: birthDate,
    });
    uploadProfilePhoto(userID, image);
    toggleChangesMade();

}

export const addPhotoURLtoProfile = async (userID, url) => {
    const userRef = doc(db, "userInfo", userID);

    await updateDoc(userRef, {
        profilePhotoURL: url,
    });

}

export const uploadProfilePhoto = (userID, image) => {
    const pathRef = '/userData/'+userID+'/profilePhoto';
    const storageRef = ref(storage, pathRef);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, image).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        const pathRef = '/userData/'+userID+'/profilePhoto';
        getDownloadURL(ref(storage, pathRef))
            .then((url) => {
            addPhotoURLtoProfile(userID, url);
        })
        .catch((error) => {
            console.log(error);
        });
    });
}

export const addFriend = async (userID, friendID) => {
    const userRef = doc(db, "userInfo", userID);
    await updateDoc(userRef, {
        addedFriends: arrayUnion(friendID)
    });
}

export const removeFriend = async (userID, friendID) => {
    const userRef = doc(db, "userInfo", userID);
    await updateDoc(userRef, {
        addedFriends: arrayRemove(friendID)
    });
}