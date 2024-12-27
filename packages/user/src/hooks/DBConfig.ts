export const DBConfig = {
  name: "MyDB",
  version: 1,
  objectStoresMeta: [
    {
      store: "feed",
      storeConfig: { keyPath: "feedId", autoIncrement: true },
      storeSchema: [
        { name: "feedId", keypath: "feedId", options: { unique: true } },
        { name: "title", keypath: "title", options: { unique: false } },
        { name: "content", keypath: "content", options: { unique: false } },
        { name: "userName", keypath: "userName", options: { unique: false } },
        { name: "createdAt", keypath: "createdAt", options: { unique: false } },
        { name: "file", keypath: "file", options: { unique: false } },
      ],
    },
  ],
};