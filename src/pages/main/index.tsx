import HotelList from '@components/main/HotelList';

const MainPage = () => {
  // const client = useQueryClient();
  return (
    <div>
      <h2>헤더 영역</h2>
      {/* <ErrorBoundary
        fallback={({ reset }) => {
          const handleRefetch = () => {
            client.refetchQueries({ queryKey: useHotels.getKey() });
            reset();
          };

          return (
            <h2>
              호텔데이터를 불러오지 못했어요.
              <button onClick={handleRefetch}>다시 불러오기</button>
            </h2>
          );
        }}
      >
        <Suspense fallback={<HotelSkeleton />}>
          <HotelList />
        </Suspense>
      </ErrorBoundary> */}

      <HotelList />

      <h2>풋터 영역</h2>
    </div>
  );
};

export default MainPage;
