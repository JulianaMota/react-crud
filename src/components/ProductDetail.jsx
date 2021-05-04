import React from "react";
import { useParams } from "react-router-dom";
import useFetchOne from "./useFetchOne";
import { Link } from "react-router-dom";
import "./detail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading, errorOne } = useFetchOne("products", id);
  console.log();

  return (
    <div>
      {errorOne && <div>{errorOne}</div>}
      {isLoading && <div>Loading...</div>}
      {data && (
        <div className="layout">
          <h2>{data.name}</h2>
          {data.imgURL && <img src={data.imgURL} alt={data.name + "image"} />}
          <p className="price">€ {data.price}</p>
          <p className="bolder">Game Description</p>
          <p className="desc-text">{data.description}</p>
          {data.genre && (
            <div>
              <p className="bolder">Gender</p>
              <ul className="tags">
                {data.genre.map((g) => (
                  <li>{g}</li>
                ))}
              </ul>
            </div>
          )}
          {data.type && (
            <div>
              <p className="bolder">Type</p>
              <ul className="tags">
                {data.type.map((t) => (
                  <li>{t}</li>
                ))}
              </ul>
            </div>
          )}
          <p className="bolder">
            Launch Date: <span>{data.launchDate.toDate().toDateString()}</span>
          </p>
          <Link to={"/"} className="btn btn-outline-dark">
            Back >{" "}
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
