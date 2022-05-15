import { useAuth } from 'auth';
import { useQuery } from 'react-query';
import { getTimelinePosts } from '../api/posts';

export const useFeed = () => {
  const { user } = useAuth();
  const { data, status } = useQuery(
    ['feed', user?.id],
    () => getTimelinePosts(user?.id ?? ''),
  );

  return { data, status };
}