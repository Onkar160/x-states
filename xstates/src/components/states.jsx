import React, { useState, useEffect } from "react";

export default function States() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  //Handling onchange whenever value changes
  const handleChange = (e) => {
    if (e.target.name === "country") {
      // console.log(e.target.name);
      // console.log(e.target.value);
      setSelectedCity("");
      setSelectedState("");
      setSelectedCountry(e.target.value);
    }
    if (e.target.name === "state") {
      // console.log(e.target.name);
      // console.log(e.target.value);
      setSelectedCity("");
      setSelectedState(e.target.value);
    }
    if (e.target.name === "city") {
      // console.log(e.target.name);
      // console.log(e.target.value);
      setSelectedCity(e.target.value);
    }
  };

  //Fething data from APi's in the useEFfect
  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setCountries(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          return response.json();
        })
        .then((data) => {
          // console.log(data);

          setStates(data);
        })
        .catch((error) => console.error("Error fetching data: ", error));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          return response.json();
        })
        .then((data) => {
          // console.log(data);

          setCities(data);
        })
        .catch((error) => console.error("Error fetching data: ", error));
    }
  }, [selectedState]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Select location</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <select
          name="country"
          style={{ padding: "10px" }}
          onChange={handleChange}
          defaultValue=""
        >
          <option value="">
            Select Country
          </option>
          {countries.map((item, ind) => {
            return (
              <option value={item} key={`${ind}_${item}`}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          name="state"
          style={{ padding: "10px" }}
          onChange={handleChange}
          disabled={!selectedCountry}
          defaultValue=""
        >
          <option value="">
            Select State
          </option>
          {states.map((item, ind) => {
            return (
              <option value={item} key={`${ind}_${item}`}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          name="city"
          style={{ padding: "10px" }}
          onChange={handleChange}
          disabled={!selectedState}
          defaultValue=""
        >
          <option value="">
            Select City
          </option>
          {cities.map((item, ind) => {
            return (
              <option value={item} key={`${ind}_${item}`}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      {selectedCity && (
        <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
          <h3 style={{ marginBottom: "0" }}>You selected </h3>
          <p style={{ fontSize: "25px", marginBottom: "0", fontWeight: "700" }}>
            {selectedCity},
          </p>
          <h3 style={{ color: "grey", marginBottom: "0" }}>{selectedState}</h3>
          <h3 style={{ color: "grey", marginBottom: "0" }}>
            {selectedCountry}
          </h3>
        </div>
      )}
    </div>
  );
}
