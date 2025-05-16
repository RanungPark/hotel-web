import ListRow from '@shared/components/ListRow';
import { Flex, Image, Text } from '@woong-new/ui';
import { useHotels } from './hooks/useHotels';

const HotelList = () => {
  const { data, isLoading } = useHotels();

  if (data == null || isLoading) {
    return <h1>로딩중...</h1>;
  }

  return (
    <div>
      {data.map((hotel) => (
        <ListRow
          key={hotel.id}
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
      ))}
    </div>
  );
};

export default HotelList;
