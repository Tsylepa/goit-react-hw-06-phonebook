import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Wrapper } from './Phonebook.styled';

const Phonebook = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts') || [])
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function addContact(newContact, { resetForm }) {
    if (checkContact(newContact)) {
      return alert(`${newContact.name} is already in contacts`);
    }

    newContact.id = nanoid();
    setContacts(prevState => [...prevState, newContact]);
    resetForm();
  }

  function removeContact(key) {
    setContacts(prevState => prevState.filter(contact => contact.id !== key));
  }

  function onFilter(e) {
    setFilter(e.target.value);
  }

  function checkContact(newContact) {
    return contacts.find(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );
  }

  return (
    <Wrapper>
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={addContact} />
      <h2>My contacts</h2>
      {contacts.length === 0 ? (
        <p>Your contact list is empty...</p>
      ) : (
        <ContactList
          contacts={contacts}
          removeContact={removeContact}
          onFilter={onFilter}
          filter={filter}
        />
      )}
    </Wrapper>
  );
};

export default Phonebook;
