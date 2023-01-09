 export  class CreateItemMainInfo {
    name: string;
    art: string;
    maker: string;
    categor: string;
    subcategor: string;
    price: number;
    itemArt: string; 
    itemMod: string;
    quantity: number;
    constructor() 
        {
            this.name = ''
            this.art = ''
            this.maker = ''
            this.categor = ''
            this.subcategor = ''
            this.price = 0
            this.itemArt = ''
            this.itemMod = ''
            this.quantity = 0
      }
  }

export class CreateFilterList {
    cat: string;
    price: { from: string, upTo: string };
    maker: string[];
    ranting: number;
    actual: string[];
    other: string[];
    constructor(route) {
        this.cat = route.query.categor ? route.query.categor : 'Категория'
        this.price = { from: '', upTo: '' },
        this.ranting = 0
        this.maker = []
        this.actual = []
        this.other = []
    }
}
