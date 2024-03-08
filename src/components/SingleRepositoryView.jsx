import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import { FlatList } from 'react-native';
import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';

const SingleRepositoryView = () => {
  const { repositoryId } = useParams();
  const { repository, fetchMore } = useRepository({
    repositoryId,
    first: 4,
  });

  const onEndReach = () => {
    fetchMore();
  };

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
      onEndReached={onEndReach}
    />
  ) : null;
};

export default SingleRepositoryView;
