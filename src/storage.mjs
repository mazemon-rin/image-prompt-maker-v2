const DB_NAME = 'image-prompt-maker-v2';
const DB_VERSION = 1;
const stores = ['drafts', 'projects', 'history', 'favorites'];

export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => stores.forEach((name) => { if (!request.result.objectStoreNames.contains(name)) request.result.createObjectStore(name, { keyPath: 'id' }); });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function put(store, value) { const db = await openDatabase(); return new Promise((resolve, reject) => { const tx = db.transaction(store, 'readwrite'); tx.objectStore(store).put(value); tx.oncomplete = () => resolve(value); tx.onerror = () => reject(tx.error); }); }
export async function getAll(store) { const db = await openDatabase(); return new Promise((resolve, reject) => { const req = db.transaction(store).objectStore(store).getAll(); req.onsuccess = () => resolve(req.result); req.onerror = () => reject(req.error); }); }
export async function remove(store, id) { const db = await openDatabase(); return new Promise((resolve, reject) => { const tx = db.transaction(store, 'readwrite'); tx.objectStore(store).delete(id); tx.oncomplete = resolve; tx.onerror = () => reject(tx.error); }); }
export async function exportData() { const result = {}; for (const store of stores) result[store] = await getAll(store); return { schemaVersion: 1, exportedAt: new Date().toISOString(), stores: result }; }
export function validateBackupPayload(payload) { if (!payload || payload.schemaVersion !== 1 || !payload.stores || typeof payload.stores !== 'object') throw new Error('Unsupported or invalid backup'); return true; }
export async function importData(payload) { validateBackupPayload(payload); for (const store of stores) for (const value of payload.stores[store] || []) await put(store, value); return true; }
export { DB_NAME, DB_VERSION, stores };
