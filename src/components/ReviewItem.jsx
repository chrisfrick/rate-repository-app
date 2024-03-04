import { StyleSheet, View, Alert } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { format, toDate } from 'date-fns';
import Button from './Button';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const reviewStyles = StyleSheet.create({
  reviewItemContainer: {
    backgroundColor: 'white',
    padding: 15,
  },
  reviewBodyContainer: {
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
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 2,
  },
  actionButton: {
    flexGrow: 1,
    marginHorizontal: 5,
  },
});

const ReviewItem = ({
  review,
  isHeaderRepoName,
  showActionButtons,
  refetch,
}) => {
  const username = review.node.user?.username;
  const repositoryName = review.node.repository?.name;
  const { id, text, rating, createdAt, repository } = review.node;
  const navigate = useNavigate();
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const handleDelete = async () => {
    await mutate({ variables: { deleteReviewId: id } });
    refetch();
  };

  return (
    <View style={reviewStyles.reviewItemContainer}>
      <View style={reviewStyles.reviewBodyContainer}>
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
      {showActionButtons ? (
        <View style={reviewStyles.actionButtonContainer}>
          <View style={reviewStyles.actionButton}>
            <Button
              text="View repository"
              style={reviewStyles.actionButton}
              onPress={() => navigate(`/${repository.id}`)}
            ></Button>
          </View>
          <View style={reviewStyles.actionButton}>
            <Button
              text="Delete review"
              red={true}
              style={reviewStyles.actionButton}
              onPress={() =>
                Alert.alert(
                  'Delete Review',
                  'Are you sure you want to delete this review?',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Delete',
                      onPress: () => handleDelete(),
                    },
                  ]
                )
              }
            ></Button>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ReviewItem;
