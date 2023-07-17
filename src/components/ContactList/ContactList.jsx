import React from 'react';
// import PropTypes from 'prop-types';
import ContactListItem from 'components/ContactListItem';
import contactListStyles from './ContactList.module.css';
import { useSelector } from 'react-redux';


const ContactList = () => {
  const contacts = useSelector(state => state.contactsData.contacts);
  const filter = useSelector(state => state.contactsData.filter);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <ul className={contactListStyles.list}>
        {filteredContacts.map(({ id, name, number }) => {
          return (
            <ContactListItem key={id} name={name} number={number} id={id} />
          );
        })}
      </ul>
    </>
  );
};

// ContactList.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   deleteContact: PropTypes.func.isRequired,
// };

export default ContactList;
