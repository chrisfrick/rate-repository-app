import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import { FlatList } from 'react-native';
import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';

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
