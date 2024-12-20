export const openDB = (dbName: string, storeName: string): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1); // 데이터베이스 이름과 버전을 지정

    request.onupgradeneeded = () => {
      const db = request.result;

      // 객체 저장소(Object Store)가 없으면 생성
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
        console.log(`오브젝트 스토어 '${storeName}' 생성 완료`);
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      console.log(`IndexedDB 연결 성공: ${dbName}`);
      resolve(db); // 성공 시 데이터베이스 객체를 반환
    };

    request.onerror = (event) => {
      console.error("IndexedDB 연결 실패:", event);
      reject(event); // 실패 시 에러를 반환
    };
  });
};