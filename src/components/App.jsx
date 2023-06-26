import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import appStyles from './App.module.css';

const App =() => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  
  const [filter, setFilter] = useState('');
  

 
 useEffect(() => {
   const storedContacts = localStorage.getItem('contacts');
   if (storedContacts) {
     setContacts(JSON.parse(storedContacts));
   }
 }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const addContact = (name, number) => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contact list.`);
      return;
    }

    setContacts(prevState => [...prevState, { name, number, id: nanoid() }]);
  };



  const onChangeFilter = evt => {
     setFilter(evt.target.value)
   };

const getFilteredContacts = contacts.filter(({ name }) =>
  name.toLowerCase().includes(filter.toLowerCase())
);


const deleteContact = id => {
  setContacts(prevContacts =>
    prevContacts.filter(contact => contact.id !== id)
  );
};
 

    return (
      <div className={appStyles.container}>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />

        <h2>Contacts</h2>
        <Filter onChangeFilter={onChangeFilter} filter={filter} />
        <ContactList
          contacts={getFilteredContacts}
          deleteContact={deleteContact}
        />
      </div>
    );
  };

export default App;
