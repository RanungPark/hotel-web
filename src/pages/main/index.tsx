import { COLLECTIONS } from '@constants/collections';
import { fireStore } from '@remote/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const MainPage = () => {
  const [hotels, setHotels] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState()

  useEffect(() => {
    setIsLoading(true);

    getDocs(collection(fireStore, COLLECTIONS.HOTELS))
      .then(snapshot => {
        const hotelsData = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setHotels(hotelsData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading === true || hotels === null) {
    return <h1>로딩중...</h1>;
  }

  return <div></div>;
};

export default MainPage;
