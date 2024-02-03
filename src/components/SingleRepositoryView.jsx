import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import { format, toDate } from 'date-fns';
import { FlatList, StyleSheet, View } from 'react-native';
import ItemSeparator from './ItemSeparator';
import Text from './Text';
import theme from '../theme';

const reviewStyles = StyleSheet.create({
  reviewItemContainer: {
    backgroundColor: 'white',
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  ratingContainer: {
    width: 45,
    height: 45,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 45 / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
  },
  reviewTextContainer: {
    flexShrink: 1,
  },
  reviewBody: {
    marginTop: 5,
  },
});

const ReviewItem = ({ review }) => {
  const username = review.node.user.username;
  const { text, rating, createdAt } = review.node;
  return (
    <View style={reviewStyles.reviewItemContainer}>
      <View style={reviewStyles.ratingContainer}>
        <Text style={reviewStyles.ratingText} fontWeight="bold">
          {rating}
        </Text>
      </View>
      <View style={reviewStyles.reviewTextContainer}>
        <Text fontWeight="bold">{username}</Text>
        <Text color="textSecondary">
          {format(toDate(createdAt), 'MMM dd, yyyy')}
        </Text>
        <Text style={reviewStyles.reviewBody}>{text}</Text>
      </View>
    </View>
  );
};

const SingleRepositoryView = () => {
  const { repositoryId } = useParams();
  const { repository } = useRepository(repositoryId);

  return repository ? (
    <FlatList
      data={repository.reviews.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem repository={repository} showOpenButton />
          <ItemSeparator />
        </>
      )}
    />
  ) : null;
};

export default SingleRepositoryView;
