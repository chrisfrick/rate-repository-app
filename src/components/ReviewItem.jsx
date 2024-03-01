import { StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { format, toDate } from 'date-fns';

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

const ReviewItem = ({ review, isHeaderRepoName }) => {
  const username = review.node.user?.username;
  const repositoryName = review.node.repository?.name;
  const { text, rating, createdAt } = review.node;
  return (
    <View style={reviewStyles.reviewItemContainer}>
      <View style={reviewStyles.ratingContainer}>
        <Text style={reviewStyles.ratingText} fontWeight="bold">
          {rating}
        </Text>
      </View>
      <View style={reviewStyles.reviewTextContainer}>
        <Text fontWeight="bold">
          {isHeaderRepoName ? repositoryName : username}
        </Text>
        <Text color="textSecondary">
          {format(toDate(createdAt), 'MMM dd, yyyy')}
        </Text>
        <Text style={reviewStyles.reviewBody}>{text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
