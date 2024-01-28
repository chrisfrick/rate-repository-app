import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const buttonStyles = StyleSheet.create({
  button: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    textAlign: 'center',
  },
});

const Button = ({ onPress, text }) => {
  return (
    <Pressable onPress={onPress} style={buttonStyles.button}>
      <Text style={buttonStyles.buttonText} color="white" fontWeight="bold">
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;
