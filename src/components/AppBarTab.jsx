import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  menuItem: {
    padding: 15,
  },
});

const AppBarTab = ({ text }) => {
  return (
    <Pressable style={styles.menuItem}>
      <Text color="white" fontWeight="bold">
        {text}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
