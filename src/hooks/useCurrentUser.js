import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useCurrentUser = () => {
  // eslint-disable-next-line no-unused-vars
  const { data, error, loading } = useQuery(GET_CURRENT_USER);

  const currentUser = data.me;

  return { currentUser, loading };
};

export default useCurrentUser;
