
  
import db from '../../config/firebase';
import {collection, getDocs} from "firebase/firestore";




import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";









const getData = async()=>{
    const users = collection(db, "users")
    const userSnapshot = await getDocs(users)
    const lists = userSnapshot.docs.map(doc=>doc.data())
    console.log(lists)
  }


