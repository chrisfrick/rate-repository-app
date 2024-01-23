import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  redBorder: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, styles.input, error && styles.redBorder];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
