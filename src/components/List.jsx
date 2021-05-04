import React from "react";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import useDocument from "./useDocument";
import "./list.css";

const List = () => {
  const { error, isPending, data } = useFetch("products");
  const { deleteDoc } = useDocument("products");

  return (
    <div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && (
        <div className="list-group list">
          {" "}
          {data.map((p) => {
            return (
              <div key={p.id} className="list-group-item box">
                <p className="name">{p.name}</p>
                <img src={p.imgURL} alt={p.name} />
                <p className="price">€ {p.price}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteDoc(p.id)}
                >
                  Delete
                </button>
                <Link
                  to={{
                    pathname: `/update/${p.id}`,
                    state: { nameUp: p.name, contentUp: p.content }
                  }}
                  className="btn btn-secondary"
                >
                  Update
                </Link>
                <Link to={`/detail/${p.id}`} className="btn btn-primary">
                  Details
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default List;
