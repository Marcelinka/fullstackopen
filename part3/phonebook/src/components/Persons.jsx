import Person from "./Person";

const Persons = ({ persons, remove }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.id} person={person} remove={() => remove(person)} />
      ))}
    </div>
  );
};

export default Persons;
