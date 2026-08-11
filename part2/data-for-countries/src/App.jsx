import { useState, useEffect } from "react";
import countryService from "./services/countries";
import Country from "./components/Country";
import CountriesList from "./components/CountriesList";

const App = () => {
  const [country, setCountry] = useState("");
  const [countriesList, setCountriesList] = useState([]);

  const onChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  const onShowCountry = (countryName) => setCountry(countryName);

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

    return (
      <CountriesList countries={filteredList} showCountry={onShowCountry} />
    );
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
