import React from 'react';


import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import appStyles from './App.module.css';


const App = () => {
  // const dispatch = useDispatch();
  
  // const addNewContact = (formData) => {
  //   dispatch(addContact(formData));
  // };

  
  return (
    <div className={appStyles.container}>
      <h1>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default App;
