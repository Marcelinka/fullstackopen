import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then(setPersons);
  }, []);

  const [newName, setNewName] = useState("");
  const handleNewNameChange = (event) => setNewName(event.target.value);

  const [newNumber, setNewNumber] = useState("");
  const handleNewNumberChange = (event) => setNewNumber(event.target.value);

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleAddNewPerson = async (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const agreed = confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`,
      );
      if (agreed) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        const person = await personService.update(
          existingPerson.id,
          updatedPerson,
        );
        return void setPersons(
          persons.map((p) => (p.id === person.id ? person : p)),
        );
      }
    }

    const numberAlreadyExist = persons.some(
      (person) => person.number === newNumber,
    );
    if (numberAlreadyExist) {
      return void alert(`${newNumber} is already added to phonebook`);
    }

    const newPerson = await personService.create({
      name: newName,
      number: newNumber,
    });

    setPersons(persons.concat([newPerson]));

    setSuccessMessage(`Added ${newPerson.name}`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const [filter, setFilter] = useState("");
  const handleFilterChange = (event) => setFilter(event.target.value);

  const getFilteredPersons = () =>
    persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase()),
    );

  const remove = (person) => {
    const agreed = confirm(`Delete ${person.name}?`);
    if (agreed) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`,
          );
          setPersons(persons.filter((p) => p.id !== person.id));
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Notification type="error" message={errorMessage} />

      <Filter value={filter} onChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        onSubmit={handleAddNewPerson}
        name={{ value: newName, onChange: handleNewNameChange }}
        number={{ value: newNumber, onChange: handleNewNumberChange }}
      />

      <h2>Numbers</h2>
      <Persons persons={getFilteredPersons()} remove={remove} />
    </div>
  );
};

export default App;
