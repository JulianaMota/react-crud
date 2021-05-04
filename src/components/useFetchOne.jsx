import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useFetchOne = (collection, id) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorOne, setErrorOne] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      projectFirestore
        .collection(collection, { signal: abortCont.signal })
        .doc(id)
        .get()
        .then(
          (doc) => {
            const document = doc.data();
            setData(document);
            setErrorOne(null);
            setIsLoading(false);
          },
          (err) => {
            if (err.name === "AbortError") {
              console.log("fetch aborted");
            } else {
              setData(null);
              setErrorOne(err.message);
              setIsLoading(false);
              console.log(err.message);
            }
          }
        );
    }, 1000);

    return () => abortCont.abort();
  }, [collection, id]);

  return { data, isLoading, errorOne };
};

export default useFetchOne;
