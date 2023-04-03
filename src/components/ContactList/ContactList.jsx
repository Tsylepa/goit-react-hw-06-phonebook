import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from 'redux/contactsSlice';
import Filter from '../Filter';
import {
  Container,
  List,
  ContactItem,
  Name,
  Number,
  Delete,
} from './ContactList.styled';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const filteredContacts = filter.length
    ? [...contacts].filter(contact =>
        contact.name.toLowerCase().includes(filter)
      )
    : [...contacts];
  const sortedContacts = [...filteredContacts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return !contacts.length ? (
    <p>Your contact list is empty...</p>
  ) : (
    <Container>
      <label>
        Find contact by name:
        <Filter />
      </label>
      {filteredContacts.length === 0 ? (
        <p>No matches found</p>
      ) : (
        <List>
          <tbody>
            {sortedContacts.map(({ id, name, number }) => (
              <ContactItem key={id}>
                <Name>{name}</Name>
                <Number>{number}</Number>
                <td>
                  <Delete
                    type="button"
                    onClick={() => dispatch(removeContact(id))}
                  >
                    Delete
                  </Delete>
                </td>
              </ContactItem>
            ))}
          </tbody>
        </List>
      )}
    </Container>
  );
};

export default ContactList;
