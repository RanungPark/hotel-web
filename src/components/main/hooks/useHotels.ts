import { getHotels } from '@remote/hotel';
import { useQuery } from '@tanstack/react-query';

export const useHotels = () => {
  return useQuery({
    queryKey: useHotels.getKey(),
    queryFn: () => {
      if (Math.random() < 0.5) {
        throw new Error('에러 발생!');
      }

      return getHotels();
    },
    throwOnError: true,
  });
};

useHotels.getKey = () => ['hotels'];
