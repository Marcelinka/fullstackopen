import Languages from "./Languages";
import Flag from "./Flag";
import Weather from "./Weather";

const Country = ({ country }) => {
  const getCapital = () => country.capital[0];

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital {getCapital()}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <Languages languages={country.languages} />
      <Flag flags={country.flags} />
      <Weather name={getCapital()} latlng={country.capitalInfo.latlng} />
    </>
  );
};

export default Country;
