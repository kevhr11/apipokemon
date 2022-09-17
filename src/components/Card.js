import React from "react";

const Card = ({ thisPokemon }) => {

  return (
    <>
      <div
        className="card flex-grow-0 flex-shrink-1 mt-5 mx-2 shadow-lg"
        style={{ width: "20%" }}
      >
        <div className="card-img-top bg-info d-flex flex-column justify-content-center align-items-center p-2">
          <img
            id="imagen"
            src={thisPokemon.sprites.front_default}
            style={{ with: "500px" }}
            alt="Nombre Pokemon"
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <div className="card-body d-flex justify-content-around w-100">
            <p
              className="card-title"
              style={{ fontSize: "1.2rem", fontWeight: "bold" }}
            >
              {thisPokemon.name}
            </p>
            <p
              className="card-title"
              style={{ fontSize: "1.2rem", fontWeight: "bold" }}
            >
              {"# " + thisPokemon.id}
            </p>
          </div>
          <hr className="w-100" />
          <div className="d-flex flex-column justify-content-center align-items-center w-75 mt-2">
            <p className="fw-bold mt-2">Habilidades:</p>
            <ul>
              {thisPokemon.abilities.map((data) => (
                <li key={data.ability.url}>{data.ability.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
