import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import Button from './Button';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  pageBackground: {
    backgroundColor: theme.colors.greyBackground,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 12,
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Button onPress={onSubmit} text="Sign in" />
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      style={styles.pageBackground}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
