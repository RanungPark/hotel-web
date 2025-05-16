import { collection, getDocs } from 'firebase/firestore';
import { fireStore } from './firebase';
import { COLLECTIONS } from '@constants/collections';
import type { Hotel } from '@models/hotel';

export const getHotels = async () => {
  const snapshot = await getDocs(collection(fireStore, COLLECTIONS.HOTELS));

  const hotels = snapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Hotel;
  });

  return hotels;
};
