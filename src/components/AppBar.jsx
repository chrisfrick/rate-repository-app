import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import Text from './Text';
import useCurrentUser from '../hooks/useCurrentUser';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

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

const AppBarTab = ({ to, text, onPress }) => {
  // Ensure onPress is not null or undefined before executing it
  const handlePress = () => onPress && onPress();

  return (
    <Link to={to} style={styles.navItem} onPress={handlePress}>
      <Text color="white" fontWeight="bold">
        {text}
      </Text>
    </Link>
  );
};

const AppBar = () => {
  const { currentUser } = useCurrentUser();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/" text="Repositories" />
        {currentUser ? (
          <>
            <AppBarTab to="/create-review" text="Create a review" />
            <AppBarTab to="/" text="Sign out" onPress={handleSignOut} />
          </>
        ) : (
          <AppBarTab to="/sign-in" text="Sign in" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
