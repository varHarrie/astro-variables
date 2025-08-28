import { type AsyncLocalStorage } from "node:async_hooks";

let storage: AsyncLocalStorage<Record<string, any>> | undefined = undefined;

export function setStorage(value: AsyncLocalStorage<Record<string, any>>) {
  storage = value;
}

export function getStorage() {
  return storage;
}
