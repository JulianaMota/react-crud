import React, { useEffect, useState } from "react";
import { timestamp } from "../firebase/config";
import useDocument from "./useDocument";
import { useHistory, useParams } from "react-router-dom";
import useFetchOne from "./useFetchOne";
import useStorage from "./useStorage";
import "./form.css";

const Form = (props) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [fileError, setFileError] = useState(null);
  const [file, setFile] = useState(null);

  const [launch, setLaunch] = useState({});
  const [price, setPrice] = useState(0);

  const history = useHistory();
  const { id } = useParams();

  const [genre, setGenre] = useState([]);
  const [type, setType] = useState([]);

  const { addDoc, updateDoc, isPending, error } = useDocument("products");
  const { data, isLoading } = useFetchOne("products", id);
  const { filePath, url, uploadImage } = useStorage();

  useEffect(() => {
    if (!isLoading && props.title === "Update Game") {
      setGenre(data.genre);
      setType(data.type);
    } else {
      setGenre([]);
      setType([]);
    }
  }, [data, isLoading, props.title]);

  const handleAdd = (e) => {
    e.preventDefault();
    const doc = {
      name: name,
      description: desc,
      price: price,
      genre: genre,
      type: type,
      imgURL: "",
      launchDate: timestamp()
    };
    addDoc(doc);
    if (!isPending && error === null) {
      history.push("/");
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault(e);
    if (!isLoading) {
      const doc = {
        name: !name ? data.name : name,
        description: !desc ? data.description : desc,
        price: !price ? data.price : price,
        launchDate: timestamp(launch),
        genre: genre,
        type: type
      };
      updateDoc(doc, id);
      if (!isPending && error === null) {
        history.push("/");
      }
    }
  };

  const handleAddGenre = (e) => {
    const val = e.target.value;
    console.log(e.key);
    if (e.key === " " && val) {
      if (genre.find((g) => g.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setGenre([...genre, val]);

      e.target.value = "";
    }
  };

  const deleteGenre = (e, i) => {
    e.preventDefault();
    const newGenres = [...genre];
    newGenres.splice(i, 1);
    setGenre(newGenres);
  };

  const handleAddTypes = (e) => {
    const val = e.target.value;
    if (e.key === " " && val) {
      if (type.find((t) => t.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setType([...type, val]);
      e.target.value = "";
    }
  };

  const deleteType = (e, i) => {
    e.preventDefault();
    const newTypes = [...type];
    newTypes.splice(i, 1);
    setType(newTypes);
  };

  const imgTypes = ["image/png", "image/jpeg"];

  const handleChange = (e) => {
    let selected = e.target.files[0];
    // console.log(selected.name);

    if (selected && imgTypes.includes(selected.type)) {
      setFile(selected);
      setFileError(null);
      // console.log(file);
    } else {
      setFile(null);
      setFileError("Please select an image file (png or jpg)");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log(file);
    if (file) {
      await uploadImage(file);
      console.log(await url);
    }
  };

  return (
    <form>
      <h2>{props.title}</h2>
      {!isLoading && props.title === "Update Game" && (
        <div className="form-grid">
          <input
            className="form-control"
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            defaultValue={data.name}
          />

          <input
            className="form-control"
            type="text"
            placeholder="description"
            onChange={(e) => setDesc(e.target.value)}
            defaultValue={data.description}
          />

          <input
            className="form-control"
            type="number"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            defaultValue={data.price}
          />

          <input
            className="form-control"
            type="date"
            onChange={(e) => setLaunch(e.target.value)}
            defaultValue={data.launchDate}
          />
        </div>
      )}
      {props.title === "Add Game" && (
        <div className="form-grid">
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            defaultValue=""
          />

          <input
            className="form-control"
            type="text"
            placeholder="Description"
            onChange={(e) => setDesc(e.target.value)}
            defaultValue=""
          />

          <input
            className="form-control"
            type="number"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            defaultValue=""
          />

          <input
            className="form-control"
            type="date"
            onChange={(e) => setLaunch(e.target.value)}
            defaultValue=""
          />
          <label>Upload Game image</label>
          <div className="input-group">
            <div className="custom-file">
              <input
                className="custom-file-input"
                type="file"
                onChange={(e) => handleChange(e)}
                id="inputGroupFile04"
              />
            </div>
            <div class="input-group-append">
              <button
                className="btn btn-outline-light"
                onClick={(e) => handleUpload(e)}
              >
                Upload Image
              </button>
            </div>
          </div>

          <div>{fileError}</div>
          {url && <p>Image added {file.name}</p>}
        </div>
      )}
      <div>
        <p>Add genres (click on space to add)</p>
        <input
          className="form-control"
          type="text"
          placeholder="Genre"
          defaultValue=""
          onKeyDown={(e) => handleAddGenre(e)}
        />

        <ul className="form-tags">
          {genre.map((g, i) => (
            <li>
              <p>{g}</p>
              <button onClick={(e) => deleteGenre(e, i)}></button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p>Add Types (click on space to add)</p>
        <input
          className="form-control"
          type="text"
          placeholder="Game Type"
          defaultValue=""
          onKeyDown={(e) => handleAddTypes(e)}
        />
        <ul className="form-tags">
          {type.map((t, i) => (
            <li>
              <p>{t}</p>
              <button onClick={(e) => deleteType(e, i)}></button>
            </li>
          ))}
        </ul>
      </div>
      {!isPending && (
        <input
          className="btn btn-primary"
          type="submit"
          value={props.title === "Add Game" ? "Add Game" : "Update Game"}
          onClick={(e) =>
            props.title === "Add Game" ? handleAdd(e) : handleUpdate(e)
          }
        />
      )}
      {isPending && (
        <input
          className="btn btn-primary"
          type="submit"
          value={
            props.title === "Add Game" ? "Adding Game..." : "Updating Game..."
          }
          disable
        />
      )}
    </form>
  );
};

export default Form;
