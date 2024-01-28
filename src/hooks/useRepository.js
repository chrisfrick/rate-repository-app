import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

const useRepository = (repositoryId) => {
  // eslint-disable-next-line no-unused-vars
  const { data, error, loading } = useQuery(GET_REPOSITORY_BY_ID, {
    variables: { repositoryId },
    fetchPolicy: 'cache-and-network',
  });

  const repository = loading ? undefined : data.repository;

  return { repository, loading };
};

export default useRepository;
