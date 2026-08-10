import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "12345" },
  ]);

  const [newName, setNewName] = useState("");
  const handleNewNameChange = (event) => setNewName(event.target.value);

  const [newNumber, setNewNumber] = useState("");
  const handleNewNumberChange = (event) => setNewNumber(event.target.value);

  const handleAddNewPerson = (event) => {
    event.preventDefault();

    const nameAlreadyExist = persons.some((person) => person.name === newName);
    if (nameAlreadyExist) {
      return void alert(`${newName} is already added to phonebook`);
    }

    const numberAlreadyExist = persons.some(
      (person) => person.number === newNumber,
    );
    if (numberAlreadyExist) {
      return void alert(`${newNumber} is already added to phonebook`);
    }

    setPersons(persons.concat([{ name: newName, number: newNumber }]));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
