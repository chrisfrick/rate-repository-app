import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

const useRepository = (variables) => {
  // eslint-disable-next-line no-unused-vars
  const { data, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORY_BY_ID,
    {
      variables,
      fetchPolicy: 'cache-and-network',
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const repository = loading ? undefined : data.repository;

  return { repository, fetchMore: handleFetchMore, loading, ...result };
};

export default useRepository;
