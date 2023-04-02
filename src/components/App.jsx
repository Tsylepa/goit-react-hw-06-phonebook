import ContactForm from './ContactForm';
import ContactList from './ContactList/ContactList';
import { Wrapper } from './App.styled';

const App = () => {
  return (
    <Wrapper>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>My contacts</h2>
      <ContactList />
    </Wrapper>
  );
};

export default App;
