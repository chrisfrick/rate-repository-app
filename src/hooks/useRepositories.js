import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sortOrder) => {
  let orderBy;
  let orderDirection;

  switch (sortOrder) {
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
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy,
      orderDirection,
    },
    fetchPolicy: 'cache-and-network',
  });

  const repositories = loading ? undefined : data.repositories;

  return { repositories, loading };
};

export default useRepositories;
