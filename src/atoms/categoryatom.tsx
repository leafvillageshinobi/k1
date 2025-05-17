import { atom } from 'recoil';
import { Category } from '../types';

export const categoryAtom = atom<Category>({
    key: "categoryAtom",
    default: [], // Initially empty, will be populated from the API
  });