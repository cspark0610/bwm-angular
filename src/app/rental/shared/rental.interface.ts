export interface IRental {
  someData: string;
  isLoaded: boolean;

  implementMe(): string;
}

export class AppStorage<T> {
  // T PUEDE SER CUALQUIER TIPO DE DATO: NUMBER, STRING, OBJECT, ARRAY, etc.
  // caundo haga una nueva instancia de AppStorage, se le pasa el type como parametro , const appStorage = new AppStorage<number>();
  items: T[] = [];

  addItem(item: T): T {
    this.items.push(item);
    return item;
  }
  getItem(index: number): T {
    return this.items[index];
  }

  displayItems(): T[] {
    return this.items.map((item) => {
      console.log(item);
      return item;
    });
  }
}
