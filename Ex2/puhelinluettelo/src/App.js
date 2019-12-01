import React, { useState, useEffect } from 'react'
import noteService from './services/notes'

const Filter = ({handleSearchChange,newSearch}) => {
  return (
    <div>
      filter shown with
      <input onChange={handleSearchChange} value={newSearch} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
    <div>
      name: <input onChange={props.handleNameChange} value={props.newName} />
      <br />
      number: <input onChange={props.handleNumberChange} value={props.newNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({persons, deletePerson}) => {
  return (
    <div>
    {persons.map(person =>
      <div key={person.id}>
      <Person key={person.name} person={person} deletePerson={deletePerson} />
      </div>)}
    </div>
  )
}

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id,person.name)}>Delete</button>
    </div>
  )
}

const Notification = ({message}) => {
  if (message) {
    return (
      <div className="notification">
        {message}
      </div>
    )
  } else {
    return null
  }
}

const Error = ({message}) => {
  if (message) {
    return (
      <div className="error">
        {message}
      </div>
    )
  } else {
    return null
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsToShow,setPersonsToShow] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [noteMsg, setNoteMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')


  useEffect(() => {
    noteService
      .getAll()
        .then(newPersons => {
          setPersons(newPersons)
          setPersonsToShow(newPersons)
        })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    var msg = ''
    const personExist = persons.map(person => person.name).indexOf(newName)
    if (personExist < 0) {
      noteService
        .create(newPerson)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setPersonsToShow(persons.concat(returnedPerson))
          })

      setNewName('')
      setNewNumber('')
      msg += 'Added '
    } else {
      const id = persons[personExist].id
      const result = window.confirm(
        `${newName} has already been added to phonebook,
        replace the old number with the new one?`)
      if (result) {
        noteService
          .update(id, newPerson)
            .then(updated => {
              const newPersons = persons.map(
                person => person.id !== id ? person : updated)
              setPersons(newPersons)
              setPersonsToShow(newPersons)
              msg += 'Modified '
            })
            .catch(error => handleError(id,newPerson.name))
      }
    }

    if (msg) {
      msg += newPerson.name
      setNoteMsg(msg)
      setTimeout(() => setNoteMsg(''),2000)
    }
  }

  const handleError = (id,name) => {
    setErrorMsg(`The person ${name} had already been deleted from the server.`)
    const newPersons = persons.filter(person => person.id !== id)
    setTimeout(() => {
      setPersons(newPersons)
      setPersonsToShow(newPersons)
      setErrorMsg('')
    },2000)
  }

  const deletePerson = (id,name) => {    
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      console.log('Deleting',id)
      noteService
        .deleteId(id)
          .then(deleted => {
            const newPersons = persons.filter(person => person.id !== id)
            setPersons(newPersons)
            setPersonsToShow(newPersons)
            setNoteMsg(`Deleted ${name}`)
            setTimeout(() => setNoteMsg(''),2000)      
          })
          .catch(error => handleError(id,name))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    const search = event.target.value
    const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(search.toLowerCase()) ||
      person.number.toLowerCase().includes(search.toLowerCase()))

    setPersonsToShow(filteredPersons)
    setNewSearch(search)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={noteMsg}/>
      <Error message={errorMsg}/>
      <Filter handleSearchChange={handleSearchChange} newSearch={newSearch}/>
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson} handleNameChange={handleNameChange}
        newName={newName} handleNumberChange={handleNumberChange}
        newNumber={newNumber}/>
      <h2>Numbers</h2>
        <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App