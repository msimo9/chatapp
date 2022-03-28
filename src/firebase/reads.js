import { app, db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";



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