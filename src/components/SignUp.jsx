import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import useSignIn from '../hooks/useSignIn';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CREATE_USER } from '../graphql/mutations';
import { View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Button from './Button';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required('Username is required'),
  password: yup.string().min(5).max(30).required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Passwords confirmation is required'),
});

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'white',
    padding: 12,
  },
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <Button onPress={onSubmit} text="Sign up" />
    </View>
  );
};

const SignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await mutate({
        variables: {
          user: {
            username,
            password,
          },
        },
      });
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
