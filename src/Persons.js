import DBCommunication from "./DbCommunication";

export const Persons = ({ persons, newFilter, setPersons }) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase()
    .includes(newFilter.toLowerCase()));
  return (
    <ul>
      {filteredPersons.map(person => <li key={person.name}>{person.name} {person.number}
      <button onClick={() => {
        DBCommunication
        .deletePerson(person)
        .then(() => {
          console.log(`User ${person.name} was deleted`)
          setPersons(persons.filter(p => p.id !== person.id))
        } )
        .catch(error => {
          console.log(error)
        }
        )
      } }>delete</button></li>)}

    </ul>
  );
};
