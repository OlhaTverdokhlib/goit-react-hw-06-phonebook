import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import appStyles from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const contactExists = this.state.contacts.find(
      ({ name: contactName }) =>
        contactName.toLowerCase() === name.toLowerCase()
    );

    if (contactExists) {
      alert(`${name} is already in contact list.`);
      return;
    }

    const newContact = { name, number, id: nanoid() };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  onChangeFilter = evt => {
    this.setState({
      filter: evt.target.value,
    });
  };

  getFilteredContacts = () => {
    return this.state.contacts.filter(({ name }) => {
      return name.toLowerCase().includes(this.state.filter.toLowerCase());
    });
  };

  deleteContact = id => {
    this.setState(prevState => {
      const contacts = prevState.contacts;
      const newContacts = contacts.filter(contact => {
        return contact.id !== id;
      });
      return {
        contacts: newContacts,
      };
    });
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className={appStyles.container}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter onChangeFilter={this.onChangeFilter} filter={filter} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
