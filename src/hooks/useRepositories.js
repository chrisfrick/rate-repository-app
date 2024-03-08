import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  let orderBy;
  let orderDirection;
  const searchKeyword = variables.searchKeyword;

  switch (variables.sortOrder) {
    case 'HIGHEST_RATED':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC';
      break;
    case 'LOWEST_RATED':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';
      break;
    case 'LATEST':
    default:
      orderBy = 'CREATED_AT';
      break;
  }

  // eslint-disable-next-line no-unused-vars
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy,
      orderDirection,
      searchKeyword,
      first: variables.first,
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        first: variables.first,
        after: data.repositories.pageInfo.endCursor,
        orderBy,
        orderDirection,
        searchKeyword,
      },
    });
  };

  const repositories = loading ? undefined : data.repositories;

  return {
    repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
