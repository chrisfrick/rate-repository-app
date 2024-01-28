import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';

const SingleRepositoryView = () => {
  const { repositoryId } = useParams();
  const { repository } = useRepository(repositoryId);

  return repository ? (
    <RepositoryItem repository={repository} showOpenButton />
  ) : null;
};

export default SingleRepositoryView;
