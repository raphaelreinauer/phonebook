import { useState, useEffect } from 'react'
import { Filter } from './Filter'
import { PersonForm } from './PersonForm'
import { Persons } from './Persons'
import DBCommunication from './DbCommunication'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorColor, setErrorColor] = useState('red')

  // Fetch all persons from server
  useEffect(() => {
    DBCommunication
    .getAll()
    .then(
      persons => {
        setPersons(persons)
      }
    )
  }, [])

  // Notify user
  const Notifications = ({message}) => {
    const color = errorColor
    const style = {
      color: color,
      backgroundColor: 'light' + color,
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }
    if (message === null) {
      return null
    } else {
      return <div className="error" style={style}>{message}</div>
    }
  }


  const addName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      // If person with same name already exists, ask user if he wants to update the number
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.find(person => person.name === newName).id
        DBCommunication
        .update({
          name: newName,
          number: newNumber,
          id: id
        })
        .then(
          () => {
            setPersons(persons.map(person => person.id === id ? { ...person, number: newNumber } : person))
          }
        )
        .catch(error => {
          setErrorColor('red')
          setErrorMessage(`Information of ${newName} has already been removed from server`, 'red')
          setTimeout(() => {
            setErrorMessage(null, 'red')
          } , 5000)
          setPersons(persons.filter(person => person.id !== id))
          return
        }
        )
      }
      setErrorColor('green')
      setErrorMessage(`Information of ${newName} was updated.`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      
      // Send new person to server
      DBCommunication
      .create(newPerson)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson))
      } )
      setErrorColor('green')
      setErrorMessage(`${newName} was added to phonebook.`)
    }
    setTimeout(() => {
      setErrorMessage(null)
    } , 5000)
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications message={errorMessage} />
      <Filter filter={newFilter} setFilter={setNewFilter} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} setPersons={setPersons}/>
    </div>
  )
}

export default App


