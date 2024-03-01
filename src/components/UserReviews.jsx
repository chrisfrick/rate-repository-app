import { FlatList } from 'react-native';
import ReviewItem from './ReviewItem';
import ItemSeparator from './ItemSeparator';
import useCurrentUser from '../hooks/useCurrentUser';

const UserReviews = () => {
  const { currentUser } = useCurrentUser(true);
  console.log(currentUser);
  return (
    <FlatList
      data={currentUser.reviews.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={item} isHeaderRepoName={true} />
      )}
      keyExtractor={({ id }) => id}
    ></FlatList>
  );
};

export default UserReviews;
