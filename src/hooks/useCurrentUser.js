import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useCurrentUser = (includeReviews) => {
  // eslint-disable-next-line no-unused-vars
  const { data, error, loading, refetch } = useQuery(GET_CURRENT_USER, {
    variables: {
      includeReviews: includeReviews ? includeReviews : false,
    },
    fetchPolicy: 'cache-and-network',
  });

  const currentUser = data ? data.me : null;

  return { currentUser, loading, refetch };
};

export default useCurrentUser;
