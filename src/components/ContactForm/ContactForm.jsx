import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactSlice/contactSlice';
import { nanoid } from '@reduxjs/toolkit';

import contactFormStyles from './ContactForm.module.css';

const INITIAL_FORM_DATA = {
  contactName: '',
  contactNumber: '',
};


const ContactForm = () => {
  const contacts = useSelector((state) => state.contactsData.contacts);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const dispatch = useDispatch();

  const onChange = evt => {
    const { name, value } = evt.target;

    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
  

  const onSubmitForm = evt => {
    evt.preventDefault();

    const newContact = {
      id: nanoid(),
      name: formData.contactName,
      number: formData.contactNumber,
    };
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contact list.`);
      return;
    }

    const newContacts = [newContact, ...contacts];

    dispatch(addContact(newContacts));
    reset();
  };

  const reset = () => {
    setFormData(INITIAL_FORM_DATA);
  }


  return (
    <>
      <form onSubmit={onSubmitForm} className={contactFormStyles.form}>
        <label htmlFor="inputName">
          <p className={contactFormStyles.title}>Name</p>
        </label>
        <input
          className={contactFormStyles.inputField}
          id="inputName"
          type="text"
          name="contactName"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={onChange}
          value={formData.contactName}
          required
        />
        <label htmlFor="inputNumber">
          <p className={contactFormStyles.title}>Number</p>
        </label>
        <input
          className={contactFormStyles.inputField}
          id="inputNumber"
          type="tel"
          name="contactNumber"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={onChange}
          value={formData.contactNumber}
          required
        />
        <button type="submit" className={contactFormStyles.button}>
          Add contact
        </button>
      </form>
    </>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default ContactForm;
