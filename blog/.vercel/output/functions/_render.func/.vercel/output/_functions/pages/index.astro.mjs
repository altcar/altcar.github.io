import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as createAstro, e as renderComponent, F as Fragment, s as spreadAttributes } from '../chunks/astro/server_BPc0yOUv.mjs';
import { getFirestore, query, collection, orderBy, startAfter, limit, getDocs, getCountFromServer, where, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { isSupported, getAnalytics } from 'firebase/analytics';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const firebaseConfig = {
  apiKey: "AIzaSyC1GK_crBQhnKxG84KwbHGR-7HobHF4EmE",
  authDomain: "mywebsiteisawe.firebaseapp.com",
  projectId: "mywebsiteisawe",
  storageBucket: "mywebsiteisawe.firebasestorage.app",
  messagingSenderId: "109060293279",
  appId: "1:109060293279:web:9f07d1827c305ddb7d58aa",
  measurementId: "G-RG5MCZ9ETE"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

const getData = async (pageSize, lastVisible) => {
  let q;
  if (lastVisible) {
    q = query(collection(db, "blog"), orderBy("reference"), orderBy("title"), startAfter(lastVisible), limit(pageSize));
  } else {
    q = query(collection(db, "blog"), orderBy("reference"), orderBy("title"), limit(pageSize));
  }
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc2) => ({ id: doc2.id, ...doc2.data() }));
  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  const reorderedData = [];
  const dataMap = /* @__PURE__ */ new Map();
  data.forEach((doc2) => {
    dataMap.set(doc2.id, doc2);
  });
  const processedDocs = /* @__PURE__ */ new Set();
  data.forEach((doc2) => {
    if (!doc2.reference && !processedDocs.has(doc2.id)) {
      reorderedData.push({ ...doc2, parentCount: 0 });
      processedDocs.add(doc2.id);
      appendChildren(doc2.id, reorderedData, dataMap, processedDocs, 1);
    }
  });
  function appendChildren(parentId, reorderedData2, dataMap2, processedDocs2, parentCount) {
    dataMap2.forEach((doc2, id) => {
      const childreference = doc2.reference["_key"]?.["path"]["segments"][doc2.reference["_key"]["path"]["segments"].length - 1];
      if (childreference === parentId && !processedDocs2.has(id)) {
        reorderedData2.push({ ...doc2, parentCount });
        processedDocs2.add(id);
        appendChildren(id, reorderedData2, dataMap2, processedDocs2, parentCount + 1);
      }
    });
  }
  return { data: reorderedData, lastDoc };
};
const getTotalCount = async () => {
  const coll = collection(db, "blog");
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
};
const getAllTags = async () => {
  const q = query(collection(db, "blog"));
  const querySnapshot = await getDocs(q);
  const tagsSet = /* @__PURE__ */ new Set();
  querySnapshot.forEach((doc2) => {
    const data = doc2.data();
    if (Array.isArray(data.tag)) {
      data.tag.forEach((tag) => tagsSet.add(tag));
    }
  });
  return Array.from(tagsSet);
};
const getTopTags = async (topN = 3) => {
  const q = query(collection(db, "blog"));
  const querySnapshot = await getDocs(q);
  const tagCount = {};
  querySnapshot.forEach((doc2) => {
    const data = doc2.data();
    if (Array.isArray(data.tag)) {
      data.tag.forEach((tag) => {
        if (tagCount[tag]) {
          tagCount[tag]++;
        } else {
          tagCount[tag] = 1;
        }
      });
    }
  });
  const sortedTags = Object.entries(tagCount).sort(([, a], [, b]) => b - a).slice(0, topN).map(([tag]) => tag);
  return sortedTags;
};
const getDocumentsByTag = async (tag) => {
  const q = query(collection(db, "blog"), where("tag", "array-contains", tag));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc2) => {
    const docData = doc2.data();
    return { id: doc2.id, title: docData.title, ...docData };
  });
  return data;
};
const getDocumentById = async (id) => {
  const docRef = doc(db, "blog", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null;
  }
};

const $$Astro$1 = createAstro();
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { currentPage, totalPages, onPageChange } = Astro2.props;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return renderTemplate`${maybeRenderHead()}<nav data-astro-cid-d776pwuy> <ul data-astro-cid-d776pwuy> ${pages.map((page) => (
    //onClick={() => onPageChange(page)}
    renderTemplate`<li data-astro-cid-d776pwuy> <a${addAttribute(`/?page=${page}`, "href")}${addAttribute(page === currentPage ? "active" : "", "class")} data-astro-cid-d776pwuy> ${page} </a> </li>`
  ))} </ul> </nav> `;
}, "/home/hey/devdrive/altcar/blog/src/components/Pagination.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const pageSize = 10;
  const currentPage = parseInt(Astro2.url.searchParams.get("page") || "1", 10);
  const postId = Astro2.url.searchParams.get("postid");
  let lastVisible = void 0;
  if (currentPage > 1) {
    const previousData = await getData(pageSize * (currentPage - 1));
    lastVisible = previousData.lastDoc;
  }
  const { data, lastDoc } = await getData(pageSize, lastVisible);
  const totalPages = Math.ceil(await getTotalCount() / pageSize);
  const onPageChange = (page) => {
    window.location.href = `/?page=${page}`;
  };
  const selectedTag = "python";
  const documentsByTag = await getDocumentsByTag(selectedTag);
  await getTopTags();
  const tags = await getAllTags();
  let postContent = null;
  if (postId) {
    postContent = await getDocumentById(postId);
  }
  return renderTemplate`${maybeRenderHead()}<ul> ${data.map((item) => {
    const prefix = "-" + " ".repeat(item.parentCount);
    return renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "key": item.id }, { "default": ($$result2) => renderTemplate` <a${addAttribute(`/?page=${currentPage}&postid=${item.id}`, "href")}> <li${addAttribute({ paddingLeft: `${item.parentCount * 20}px` }, "style")}> ${prefix} ${item.title} </li> </a> ` })}`;
  })} </ul> <ul> ${tags.map((item) => renderTemplate`<li${spreadAttributes({ key: item })}>${item}</li>`)} </ul> ${renderComponent($$result, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "onPageChange": onPageChange })} <h2>Documents with Tag: ${selectedTag}</h2> <ul> ${documentsByTag.map((item) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "key": item.id }, { "default": ($$result2) => renderTemplate` <li>${item.title}</li> // Adjust according to your data structure
` })}`)} </ul> ${postContent && renderTemplate`<div> <h2>Post Content</h2> <p>${postContent.title}</p> <p>${postContent.context}</p> </div>`}`;
}, "/home/hey/devdrive/altcar/blog/src/pages/index.astro", void 0);

const $$file = "/home/hey/devdrive/altcar/blog/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
