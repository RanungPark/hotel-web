import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  type DocumentData,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import { fireStore } from './firebase';
import { COLLECTIONS } from '@constants/collections';
import type { Hotel } from '@models/hotel';

export const getHotels = async (
  pageParams?: QueryDocumentSnapshot<DocumentData, DocumentData>
) => {
  const hotelQuery =
    pageParams == null
      ? query(collection(fireStore, COLLECTIONS.HOTELS), limit(10))
      : query(
          collection(fireStore, COLLECTIONS.HOTELS),
          startAfter(pageParams),
          limit(10)
        );

  const snapshot = await getDocs(hotelQuery);

  const lastVisible = snapshot.docs[snapshot.docs.length - 1];

  const hotels = snapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Hotel;
  });

  return { hotels, lastVisible };
};
