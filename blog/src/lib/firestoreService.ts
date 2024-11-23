// src/lib/firestoreService.ts
import { collection, getDocs, query, orderBy, limit, startAfter, where,doc, getDoc, type DocumentData, QueryDocumentSnapshot, getCountFromServer } from "firebase/firestore";
import { db } from "./firebaseConfig";
export const getData = async (pageSize: number, lastVisible?: QueryDocumentSnapshot<DocumentData>) => {
  let q;
  if (lastVisible) {
    q = query(collection(db, "blog"), orderBy("reference"), orderBy("title"), startAfter(lastVisible), limit(pageSize));
  } else {
    q = query(collection(db, "blog"), orderBy("reference"), orderBy("title"), limit(pageSize));
  }

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc: { id: any; data: () => any; }) => ({ id: doc.id, ...doc.data() }));
  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

  // Reorder data to ensure child documents come after their parent documents
  const reorderedData: DocumentData[] = [];
  const dataMap = new Map<string, any>();

  data.forEach(doc => {
    dataMap.set(doc.id, doc);
  });

  const processedDocs = new Set<string>();

  data.forEach(doc => {
    if (!doc.reference && !processedDocs.has(doc.id)) {      
      reorderedData.push({ ...doc, parentCount: 0 });
      processedDocs.add(doc.id);
      appendChildren(doc.id, reorderedData, dataMap, processedDocs, 1);
    }
  });

  function appendChildren(parentId: string, reorderedData: any[], dataMap: Map<string, any>, processedDocs: Set<string>, parentCount: number) {
    dataMap.forEach((doc, id) => {
      const childreference = doc.reference["_key"]?.["path"]["segments"][doc.reference["_key"]["path"]["segments"].length-1];
      if (childreference === parentId && !processedDocs.has(id)) {
        reorderedData.push({ ...doc, parentCount });
        processedDocs.add(id);
        appendChildren(id, reorderedData, dataMap, processedDocs, parentCount + 1);
      }
    });
  }
  // console.log(reorderedData);
  return { data: reorderedData, lastDoc };
};


export const getTotalCount = async () => {
  const coll = collection(db, "blog");
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
};


export const getAllTags = async () => {
  const q = query(collection(db, "blog"));
  const querySnapshot = await getDocs(q);
  const tagsSet = new Set<string>();

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (Array.isArray(data.tag)) {
      data.tag.forEach((tag: string) => tagsSet.add(tag));
    }
  });

  return Array.from(tagsSet);
};


export const getTopTags = async (topN: number = 3) => {
  const q = query(collection(db, "blog"));
  const querySnapshot = await getDocs(q);
  const tagCount: { [key: string]: number } = {};

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (Array.isArray(data.tag)) {
      data.tag.forEach((tag: string) => {
        if (tagCount[tag]) {
          tagCount[tag]++;
        } else {
          tagCount[tag] = 1;
        }
      });
    }
  });
  const sortedTags = Object.entries(tagCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, topN)
    .map(([tag]) => tag);

  return sortedTags;
};

export const getDocumentsByTag = async (tag: string) => {
  const q = query(collection(db, "blog"), where("tag", "array-contains", tag));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
    const docData = doc.data();
    return { id: doc.id, title: docData.title as string, ...docData };
  });
  return data;
};
export const getDocumentById = async (id: string) => {
  const docRef = doc(db, "blog", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null;
  }
}



const regex = /(?<=\/)[^\/]+$/;