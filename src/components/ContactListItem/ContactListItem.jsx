import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactSlice/contactSlice';
import contactListItemStyles from './ContactListItem.module.css';

const ContactListItem = ({ name, number, id }) => {
  const dispatch = useDispatch();

  return (
    <>
      <li key={id}>
        {name}: {number}
        <button
          onClick={() => dispatch(deleteContact(id))}
          className={contactListItemStyles.btn}
        >
          Delete
        </button>
      </li>
    </>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  
};

export default ContactListItem;
