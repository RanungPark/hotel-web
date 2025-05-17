import type { Hotel } from '@models/hotel';
import { getHotels } from '@remote/hotel';
import {
  type InfiniteData,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useCallback } from 'react';

export const useHotels = () => {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useSuspenseInfiniteQuery<
    {
      hotels: Hotel[];
      lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData>;
    },
    Error,
    InfiniteData<{
      hotels: Hotel[];
      lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData>;
    }>,
    ReturnType<typeof useHotels.getKey>,
    QueryDocumentSnapshot<DocumentData, DocumentData> | undefined
  >({
    queryKey: useHotels.getKey(),
    queryFn: ({ pageParam }) => {
      // if (Math.random() < 0.5) {
      //   throw new Error('에러 발생!');
      // }

      return getHotels(pageParam);
    },
    getNextPageParam: snapshot => {
      return snapshot.lastVisible;
    },
    initialPageParam: undefined,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  }, [hasNextPage, isFetching, fetchNextPage]);

  const hotels = data?.pages.map(({ hotels }) => hotels).flat();

  return { data: hotels, loadMore, isFetching, hasNextPage };
};

useHotels.getKey = () => ['hotels'];
