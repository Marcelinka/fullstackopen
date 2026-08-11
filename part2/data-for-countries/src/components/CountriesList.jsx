const CountriesList = ({ countries, showCountry }) => {
  return (
    <>
      {countries.map((c) => (
        <div key={c.name.common}>
          {c.name.common}{" "}
          <button onClick={() => showCountry(c.name.common)}>Show</button>
        </div>
      ))}
    </>
  );
};

export default CountriesList;
