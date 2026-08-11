import { useState, useEffect } from "react";
import countryService from "./services/countries";
import Country from "./components/Country";

const App = () => {
  const [country, setCountry] = useState("");
  const [countriesList, setCountriesList] = useState([]);

  const onChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  useEffect(() => {
    countryService.getAll().then((countries) => setCountriesList(countries));
  }, []);

  const filteredCountries = () => {
    return countriesList.filter((c) =>
      c.name.common.toLowerCase().startsWith(country.toLowerCase()),
    );
  };

  const getCountries = () => {
    const filteredList = filteredCountries();

    if (filteredList.length > 10) {
      return "Too many matches, specify another filter";
    }

    if (filteredList.length === 1) {
      const chosenCountry = filteredList[0];
      return <Country country={chosenCountry} />;
    }

    return filteredList.map((c) => (
      <div key={c.name.common}>{c.name.common}</div>
    ));
  };

  return (
    <div>
      <div>
        find countries <input value={country} onChange={onChangeCountry} />
      </div>
      <div>{getCountries()}</div>
    </div>
  );
};

export default App;
