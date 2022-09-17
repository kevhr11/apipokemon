import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Card";

const List = () => {
  const [pokemons, setPokemons] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [onePokemon, setOnePokemon] = useState({
    name: "",
    sprites: {
      front_default: "#",
    },
    poke: false,
    noSeEncontro: "",
  });
  const [tipo, setTipo] = useState([]);

  //---------------------------------Get list pokemon------------------------------------
  const getList = async () => {
    await axios.get("https://pokeapi.co/api/v2/pokemon/").then((res) => {
      res.data.results.forEach((element) => {
        getImage(element.url);
      });
    });
  };

  //-----------------------------Get pokemon img------------------------------------------
  const getImage = async (url) => {
    await axios.get(url).then((res) => {
      //console.log(res.data)
      setPokemons((pokemons) => [...pokemons, res.data]);
    });
  };

  //----------------------------------Get pokemon name------------------------------------
  const buscarPokemon = async (e) => {
    e.preventDefault();
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${buscar}`)
      .then((res) => {
        res.data.poke = true;
        setOnePokemon(res.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("No se encontro el pokemon");
        setOnePokemon({
          poke: false,
          noSeEncontro: "No se encontro el pokemon",
        });
      });
  };

  //---------------------------------Get value---------------------------------------------
  const handleChange = (e) => {
    setBuscar(e.target.value);
  };

  //---------------------------------Get type Pokemon----------------------------------------
  const getTipo = async () => {
    await axios.get("https://pokeapi.co/api/v2/type").then((res) => {
      setTipo(res.data.results);
    });
  };

  //-----------------------------Get pokemon OnClick in input-------------------------------
  const buscarTipo = async(e) => {
    setPokemons([]);
    await axios.get(e.target.value).then((res) => {
      res.data.pokemon.forEach(async (item) => {
        await axios.get(item.pokemon.url).then((res) => {
          setPokemons((pokemons) => [...pokemons, res.data]);
        });
      });
    });
    setOnePokemon([]);
  };

  useEffect(() => {
    getList();
    getTipo();
    // eslint-disable-next-line
  }, [setPokemons]);

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <img src="/assets/pokeapi.png" alt="Poke api" />
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <input
          onChange={handleChange}
          className="form-control"
          style={{ width: "18rem" }}
          type="text"
          placeholder="Ingrese nombre del pokemon"
        />
        <button onClick={buscarPokemon} className="btn btn-primary mt-3">
          Buscar
        </button>
        <p className="mt-3 mb-3 text-danger">{onePokemon.noSeEncontro}</p>
        <select className="form-select w-75" onChange={buscarTipo}>
          {tipo.map((data) => (
            <option key={data.name} value={data.url}>
              {data.name}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex justify-content-around flex-wrap mt-5 mb-5">
        {onePokemon.poke ? (
          <Card key={onePokemon.name} thisPokemon={onePokemon} />
        ) : (
          <>
            {pokemons.map((pokemon) => (
              <Card key={pokemon.id} thisPokemon={pokemon}></Card>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default List;
