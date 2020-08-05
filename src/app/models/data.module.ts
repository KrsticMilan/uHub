export interface Data {
  $id: string;
  id: string;
  items: [Item];
  menu: string;
}

export interface Item {
  $id: string;
  Duration: string;
  id: string;
  Length: number;
  Name: string;
  Quantity: number;
  Width: number;
}
