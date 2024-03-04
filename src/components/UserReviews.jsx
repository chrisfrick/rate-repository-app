import { FlatList } from 'react-native';
import ReviewItem from './ReviewItem';
import ItemSeparator from './ItemSeparator';
import useCurrentUser from '../hooks/useCurrentUser';

const UserReviews = () => {
  const { currentUser, refetch } = useCurrentUser(true);
  console.log(currentUser);
  return currentUser ? (
    <FlatList
      data={currentUser.reviews.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          isHeaderRepoName={true}
          showActionButtons={true}
          refetch={refetch}
        />
      )}
      keyExtractor={({ id }) => id}
    ></FlatList>
  ) : null;
};

export default UserReviews;
