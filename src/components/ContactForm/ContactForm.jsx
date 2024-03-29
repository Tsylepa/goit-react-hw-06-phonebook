import { AddContactForm, ErrorText, Input, Button } from './ContactForm.styled';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { addContact } from 'redux/contactsSlice';

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};

const initialValues = {
  name: '',
  number: '',
};

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup
    .string()
    .matches(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

function autoFormatPhoneNumber(e) {
  const inputText = e.target;
  const cleaned = ('' + inputText.value).replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{0,3})?(\d{0,2})?(\d{0,2})?(\d{0,2})$/);
  const intlCode = match[1] ? '+1 ' : '';
  inputText.value = [
    intlCode,
    match[2],
    match[3] ? '-' : '',
    match[3],
    match[4] ? '-' : '',
    match[4],
  ].join('');
}

function checkContact(contacts, newContact) {
  return contacts.find(
    ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
  );
}

const ContactForm = () => {
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  function handleSubmit(newContact, resetForm) {
    if (checkContact(contacts, newContact)) {
      return alert(`${newContact.name} is already in contacts`);
    }
    dispatch(addContact(newContact));
    resetForm();
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values, resetForm);
      }}
      validationSchema={schema}
    >
      {({ isValid, dirty }) => {
        return (
          <AddContactForm>
            <label>
              Name:
              <Input name="name" placeholder="Ex.: Peter Griffin" />
              <FormError name="name" />
            </label>
            <label>
              Number:
              <Input
                name="number"
                onInput={autoFormatPhoneNumber}
                placeholder="xxx-xx-xx"
              />
              <FormError name="number" />
            </label>
            <Button type="submit" disabled={!(isValid && dirty)}>
              Add to contacts
            </Button>
          </AddContactForm>
        );
      }}
    </Formik>
  );
};

export default ContactForm;
