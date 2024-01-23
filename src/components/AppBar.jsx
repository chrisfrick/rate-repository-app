import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.darkBackground,
  },
  navItem: {
    padding: 15,
  },
});

const AppBarTab = ({ to, text }) => {
  return (
    <Link to={to} style={styles.navItem}>
      <Text color="white" fontWeight="bold">
        {text}
      </Text>
    </Link>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/" text="Repositories"></AppBarTab>
        <AppBarTab to="/sign-in" text="Sign in"></AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
