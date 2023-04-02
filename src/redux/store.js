import { configureStore, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: JSON.parse(localStorage.getItem('contacts') || []),
  reducers: {
    addContact(state, action) {
      const newContact = action.payload;
      newContact.id = nanoid();

      const updatedContacts = [...state, newContact];
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));

      return (state = updatedContacts);
    },
    removeContact(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    handleFilter(state, action) {
      return (state = action.payload);
    },
  },
});

export const { handleFilter } = filterSlice.actions;

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
    filter: filterSlice.reducer,
  },
});
