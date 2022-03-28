import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 


import { app } from "./firebase";
import { db } from "./firebase";


export const handleSignUp = (email, password, username, fullName, birthDate) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("user ", user, " signed up successfully!");
        const userID = user.uid;
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