import { useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

const useDocument = (collection) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const updateDoc = async (doc, id) => {
    setIsPending(true);
    setError(null);

    try {
      const res = await projectFirestore
        .collection(collection)
        .doc(id)
        .update(doc);
      setIsPending(false);
      return res;
    } catch (err) {
      console.log(err.message);
      setIsPending(false);
      setError("could not update document");
    }
  };

  const addDoc = async (doc) => {
    setIsPending(true);
    setError(null);

    try {
      const res = await projectFirestore.collection(collection).add(doc);
      setIsPending(false);
      return res;
    } catch (err) {
      setError("could not add doc");
      setIsPending(false);
      console.log(err.message);
    }
  };

  const deleteDoc = async (id) => {
    const doc = projectFirestore.collection(collection).doc(id);
    setIsPending(true);
    setError(null);

    try {
      const res = await doc.delete();
      setIsPending(false);
      return res;
    } catch (err) {
      console.log(err.message);
      setIsPending(false);
      setError("could not delete the document");
    }
  };

  return { error, isPending, deleteDoc, addDoc, updateDoc };
};

export default useDocument;
