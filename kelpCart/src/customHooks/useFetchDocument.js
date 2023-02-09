import React, { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
const useFetchDocument = (collectionName, documentID) => {
    // 設立變數
    const [document, setDocument] = useState('');
    const getDocument = async () => {
        const docRef = doc(db, collectionName, documentID);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const obj = {
                id: documentID,
                ...docSnap.data()
            };
            setDocument(obj);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    };
    useEffect(() => {
        getDocument()
    }, [])
    return {
        document
    }
}

export default useFetchDocument