import { projectStorage } from "../firebase/config";
import { useState } from "react";

const useStorage = () => {
  const [filePath, setFilePath] = useState(null);
  const [url, setUrl] = useState(null);
  const [errorS, setErrorS] = useState(null);

  const uploadImage = async (file) => {
    setFilePath(`gameImages/`);
    const storageRef = projectStorage.ref("gameImages/").child(file.name);
    // console.log(storageRef);
    // const filePathRef = storageRef.child(filePath);
    // const fileRef = filePathRef.child(file.name);

    try {
      const res = await storageRef.put(file);
      const link = await res.ref.getDownloadURL();
      setUrl(link);
    } catch (err) {
      console.log(err.message);
      setErrorS(err.message);
    }
  };

  return { url, filePath, errorS, uploadImage };
};

export default useStorage;
