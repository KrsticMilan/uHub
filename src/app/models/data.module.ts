import { iteratee } from 'lodash';

export interface RawData {
  $id: string;
  id: string;
  items: RawItem[];
  menu: string;
}

export interface RawItem {
  $id: string;
  Duration: string;
  id: string;
  Length: number;
  Name: string;
  Quantity: number;
  Width: number;
}

export interface Item {
  h: number;
  w: number;
  name: string;
  rotate?: boolean;
  fit?: any;
}

export interface Round {
  fit: Item[];
  name: string;
}
