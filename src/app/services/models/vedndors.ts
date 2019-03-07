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

    constructor(a: string, b: string, c: string, d: string, e: string, f: string, g: string, h: string, i: string, j: string, k: number) {
        this.identifier = a;
        this.businessType = b;
        this.lob = c;
        this.category = d;
        this.productType = e;
        this.productType = f;
        this.country = g;
        this.buyingMode = h;
        this.paymentTerm = i;
        this.incoterms = j;
        this.formAllocated = k;
    }
}

export class CompanyContact {
    vendor_name: string;
    office_address: string;
    city: string;
    pin_code: number;
    phone: string;
    state: string;
    establishment_year: number;
    website: string;
    company_contact : number;
    others : number;
}

export class Contact {
    contact_person: string;
    email: string;
    designation: string;
    contact_phone: string;
    contact: number;

}

export class CompanyDetails {
    company_type: string;
    industry_type: string;
    vendor_type: string;
    gst: string;
    pan: string;
    ssi: string;
    effective_date: string;
    bank_name: string;
    bank_account_number: string;
    bank_branch: string;
    aadhar: string;
    esic: string;
    tds: string;
    exice: string;
    ifsc: string;
    pf:string;
    company_details: number;
    


}

export class Promoter {
    promoter: string;
}

export class Sales {
    product_supplied : string;
    turnover : string;
    business_percentage : string;
}

export class Manufatureres {
    location :string;
    product_type : string;
    num_of_machines :string;
    monthly_production_capacity: string;
    technical_workers: string;
    certifications: string;


}
export class formData {
    vendor_name: string = '';
    office_address: string = '';;
    city: string = '';;
    pin_code: number;
    phone: string = '';;
    state: string = '';;
    establishment_year: number;
    website: string = '';
    contact_person: string = '';
    email: string = '';
    designation: string = '';
    contact_phone: string = '';
    company_type: string = '';
    industry_type: string = '';
    vendor_type: string = '';
    gst: string = '';
    pan: string = '';
    ssi: string = '';
    effective_date: string = '';
    bank_name: string = '';
    bank_account_number: string = '';
    ifsc: string = '';
    bank_branch: string;
    aadhar: string;
    pf:string;
    esic: string;
    tds: string;
    exice: string;
    company_details : number;
    files: number;
    contact: number;
    company_contact: number;
    others: number;
    promoter: any[] = [];
    sale: any[] = [];
    manufatureres: any[] = [];
}