import React, { useState } from 'react';
import PropTypes from 'prop-types';
import contactFormStyles from './ContactForm.module.css';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onChange = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const onSubmitForm = evt => {
    evt.preventDefault();
    addContact(name, number);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

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
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={onChange}
          value={name}
          required
        />
        <label htmlFor="inputNumber">
          <p className={contactFormStyles.title}>Number</p>
        </label>
        <input
          className={contactFormStyles.inputField}
          id="inputNumber"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={onChange}
          value={number}
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
