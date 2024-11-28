import { db } from "./firebase"; // Import Firestore instance
import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs, getDoc } from "firebase/firestore";

// Add a new document
export const addUserData = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

// Update an existing document
export const updateUserData = async (collectionName, docId, updatedData) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updatedData);
    console.log("Document updated!");
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
};

// Delete a document
export const deleteUserData = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log("Document deleted!");
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw e;
  }
};

// Fetch all documents from a collection
export const getAllDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    console.log("Fetched data:", data);
    return data;
  } catch (e) {
    console.error("Error fetching documents: ", e);
    throw e;
  }
};

// Fetch a single document
export const getDocumentById = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error fetching document:", e);
    throw e;
  }
};
