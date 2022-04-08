import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, updateDoc} from "firebase/firestore"; 
import { getStorage, ref, uploadBytes} from "firebase/storage";


import { app } from "./firebase";
import { db } from "./firebase";
import { storage } from "./firebase";



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

export const handleUpdateUserInfo = async (userID, fullName, username, email, birthDate, toggleChangesMade) => {
    const userRef = doc(db, "userInfo", userID);

    await updateDoc(userRef, {
        fullName: fullName,
        username: username,
        email: email,
        birthDate: birthDate,
    });

    toggleChangesMade();

}

export const uploadProfilePhoto = (image) => {
    const storageRef = ref(storage, "profilePhoto");
    try{
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, image).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    });
    }catch(e){
        console.log(e);
    }
}