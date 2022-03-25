import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";


import { app } from "./firebase";


export const handleSignUp = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("user ", user, " signed up successfully!")
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