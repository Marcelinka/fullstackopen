import Languages from "./Languages";
import Flag from "./Flag";

const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <Languages languages={country.languages} />
      <Flag flags={country.flags} />
    </>
  );
};

export default Country;
