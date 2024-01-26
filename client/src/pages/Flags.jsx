import React, { useContext, useState } from "react";
import "../styles/pages/flags.css";
import { AppContext } from "../App";
// import { Container, Row, Col } from "react-bootstrap";

const Flags = () => {
  const { dataOfFlags } = useContext(AppContext);
  // const continents = ["Asia", "Oceania", "Europe", "Americas", "Africa"];
  const [filterContinentSelected, setFilterContinentSelected] = useState("");
  const [filterResearch, setFilterResearched] = useState("");
  const [filterPopulation, setFilterPopulation] = useState("");

  return (
    <section className="flags">
      <div className="filters">
        <select
          value={filterContinentSelected}
          onChange={(e) => setFilterContinentSelected(e.target.value)}
          name="continents"
          id="continent-selected"
        >
          <option value="">All Continents</option>
          <option value="Asia">Asia</option>
          <option value="Oceania">Oceania</option>
          <option value="Europe">Europe</option>
          <option value="Americas">America</option>
          <option value="Africa">Africa</option>
        </select>
        <select
          value={filterPopulation}
          onChange={(e) => setFilterPopulation(e.target.value)}
          name="population"
          id="population-filter"
        >
          {/* <option value="">Population</option> */}
          <option defaultValue value="" disabled hidden>
            Population
          </option>
          <option value="Crescent">Crescent</option>
          <option value="Descending">Descending</option>
        </select>
      </div>
      <div className="research">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Type here..."
          spellCheck="false"
          onChange={(e) =>
            setFilterResearched(
              e.target.value
                .normalize("NFD")
                .replace(/\p{Diacritic}/gu, "")
                .toUpperCase()
            )
          }
        />
      </div>
      <div className="flags-bloc">
        {dataOfFlags
          .sort((a, b) => {
            if (filterPopulation === "Crescent") {
              return a.population - b.population;
            }
            if (filterPopulation === "Descending") {
              return b.population - a.population;
            }
            return 0;
          })
          .filter((country) => country.region.includes(filterContinentSelected))
          .filter((country) => {
            let test = false;
            if (filterResearch === "") {
              return true;
            } else {
              for (let item in country.translations) {
                if (
                  country.translations[item].common
                    .normalize("NFD")
                    .replace(/\p{Diacritic}/gu, "")
                    .toUpperCase()
                    .includes(filterResearch)
                ) {
                  test = true;
                }
              }
            }
            return test;
          })
          .map((country, index) => (
            <div
              className="card-bloc"
              key={index}
              country={country.name.common}
            >
              <img className="card-flag" src={country.flags.png} alt="" />

              <div className="card-country my-2">{country.name.common}</div>
              <div className="card-info">Region : {country.region}</div>
              <div className="card-info">Capital : {country.capital}</div>
              <div className="card-info">Population : {country.population}</div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Flags;
