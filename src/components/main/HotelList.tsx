import ListRow from '@shared/components/ListRow';
import { Flex, Image, Text } from '@woong-new/ui';
import { useHotels } from './hooks/useHotels';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Fragment } from 'react/jsx-runtime';
import Spacing from '@shared/components/Spacing';
import withAsyncBoundary from '@shared/hocs/withAsyncBoundary';
import HotelSkeleton from '@components/main/HotelSkeleton';

const HotelList = () => {
  const { data, loadMore, hasNextPage } = useHotels();

  return (
    <div>
      <InfiniteScroll
        dataLength={data.length}
        hasMore={hasNextPage}
        loader={<HotelSkeleton size={4} />}
        next={loadMore}
        scrollThreshold={'100px'}
      >
        {data.map((hotel, idx) => (
          <Fragment key={hotel.id}>
            <ListRow
              contents={
                <ListRow.Texts title={hotel.name} subTitle={hotel.comment} />
              }
              right={
                <Flex direction="column">
                  <Flex direction="column">
                    <Image src={hotel.image} />
                  </Flex>
                  <Text size="t6">{hotel.price}</Text>
                </Flex>
              }
            />
            {data.length - 1 === idx ? null : <Spacing />}
          </Fragment>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default withAsyncBoundary(HotelList, {
  rejectedFallback: () => <h1>에러가 발생했어요</h1>,
  pendingFallback: <HotelSkeleton />,
});
