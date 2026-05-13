import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  addDoc,
  serverTimestamp,
  FirestoreError
} from 'firebase/firestore';
import { db, auth } from './config';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// --- Dress Operations ---

export const getDresses = async (category?: string) => {
  const path = 'dresses';
  try {
    let q = query(collection(db, path), orderBy('createdAt', 'desc'));
    if (category) {
      q = query(q, where('category', '==', category));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
};

export const getDressById = async (id: string) => {
  const path = `dresses/${id}`;
  try {
    const docRef = doc(db, 'dresses', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
};

export const addDress = async (dressData: any) => {
  const path = 'dresses';
  try {
    const docRef = await addDoc(collection(db, path), {
      ...dressData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

export const updateDress = async (id: string, dressData: any) => {
  const path = `dresses/${id}`;
  try {
    const docRef = doc(db, 'dresses', id);
    await updateDoc(docRef, dressData);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
};

export const deleteDress = async (id: string) => {
  const path = `dresses/${id}`;
  try {
    await deleteDoc(doc(db, 'dresses', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};

// --- Rental Operations ---

export const bookRental = async (rentalData: any) => {
  const path = 'rentals';
  try {
    const docRef = await addDoc(collection(db, path), {
      ...rentalData,
      createdAt: serverTimestamp(),
      status: 'pending'
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

// --- Order Operations ---

export const placeOrder = async (orderData: any) => {
  const path = 'orders';
  try {
    const docRef = await addDoc(collection(db, path), {
      ...orderData,
      createdAt: serverTimestamp(),
      status: 'pending'
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};
