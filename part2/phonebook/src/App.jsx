import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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

    setPersons(
      persons.concat([
        { name: newName, number: newNumber, id: persons.length + 1 },
      ]),
    );
  };

  const [filter, setFilter] = useState("");
  const handleFilterChange = (event) => setFilter(event.target.value);

  const getFilteredPersons = () =>
    persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase()),
    );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        onSubmit={handleAddNewPerson}
        name={{ value: newName, onChange: handleNewNameChange }}
        number={{ value: newNumber, onChange: handleNewNumberChange }}
      />

      <h2>Numbers</h2>
      <Persons persons={getFilteredPersons()} />
    </div>
  );
};

export default App;
