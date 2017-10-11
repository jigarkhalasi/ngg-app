export class Item {
    constructor(
        public id: string,
        public itemDescription: string,
        public itemType: string,
        public hsnCode: string,
        public itemCode: string,
        public sellingPrice: number,
        public purchasePrice: number,
        public unitOfMeasurement: string,
        public discount: number,
        public itemNotes: string
    ) {

    }
}

/* {
    "id": "00000000-0000-0000-0000-000000000000",
    "itemDescription": "string",
    "itemType": 0,
    "hsnCode": "string",
    "itemCode": 0,
    "sellingPrice": 0,
    "purchagePrice": 0,
    "unitOfMeasurement": "string",
    "discount": 0,
    "itemNotes": "string",
    "isActive": true,
    "businessId": "00000000-0000-0000-0000-000000000000"
  } */