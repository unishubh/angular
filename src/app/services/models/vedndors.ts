export class Vendors {
    identifier: string;
    businessType: string;
    lob: string;
    category: string;
    productType: string;
    type: string;
    country: string;
    buyingMode: string;
    paymentTerm: string;
    incoterms: string;
    formAllocated: number;

    constructor(a:string,b:string, c: string, d: string, e: string, f:string, g:string, h:string, i:string, j:string, k:number) {
        this.identifier = a;
        this.businessType = b;
        this.lob = c;
        this.category = d;
        this.productType = e;
        this.productType = f;
        this.country =g;
        this.buyingMode = h;
        this.paymentTerm =i;
        this.incoterms = j;
        this.formAllocated =k;
    }
}

