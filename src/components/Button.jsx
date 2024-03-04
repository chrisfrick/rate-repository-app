import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const buttonStyles = StyleSheet.create({
  button: {
    height: 40,
    marginTop: 12,
    borderRadius: 5,
    padding: 10,
  },
  primaryColor: {
    backgroundColor: theme.colors.primary,
  },
  errorColor: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    textAlign: 'center',
  },
});

const Button = ({ onPress, text, red }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        buttonStyles.button,
        red ? buttonStyles.errorColor : buttonStyles.primaryColor,
      ]}
    >
      <Text style={buttonStyles.buttonText} color="white" fontWeight="bold">
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;
