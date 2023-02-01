import React, { useState, useEffect } from 'react'

// firebase
import { collection, doc, setDoc } from "firebase/firestore";
import { query, where, onSnapshot, orderBy, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase/config'

// redux
import { useDispatch } from 'react-redux';

const useFetchCollection = (collectionName) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const getCollection = () => {
        setIsLoading(true)
        try {
            const docRef = collection(db, collectionName);
            const q = query(docRef, orderBy("createdAt", "desc"));
            onSnapshot(q, (snapshot) => {
                const allData = snapshot.docs.map((doc) => (
                    {
                        id: doc.id,
                        ...doc.data()
                    }
                ))
                setData(allData);
            });
        setIsLoading(false)
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        getCollection()
    }, [])
    return {
        data, isLoading
    }
}

export default useFetchCollection