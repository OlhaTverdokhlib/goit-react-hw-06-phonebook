import { createSlice} from '@reduxjs/toolkit';

const contactsInitialState = [
  { id: 1, name: 'Rosie Simpson', number: '459-12-56' },
  { id: 2, name: 'Hermione Klinen', number: '443-89-12' },
  { id: 3, name: 'Eden Clements', number: '645-17-79' },
  { id: 4, name: 'Annie Copeland', number: '227-91-26' },
];

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,

  reducers: {
    addContact(state, action) {
      state.push(action.payload);
    },

    // deleteContact(state, action) {
    //   const contactId = action.payload;

    //   state.contacts = state.contacts.filter(
    //     contact => contact.id !== contactId
    //   );
    // },

    deleteContact(state, action) {
      const contactId = action.payload;
      return state.filter(contact => contact.id !== contactId);
    },

    // filterContact(state, action) {
    //   state.filter = action.payload;
    // },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactReducer = contactsSlice.reducer;
