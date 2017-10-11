import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Item } from './../models';

@Injectable()
export class ItemService {

    constructor(
        private http: Http
    ) { }

    getAllItems(businessId: string): Observable<Item[]> {
        return this.http.get('v1/business/' + businessId + '/item')
            .map(this.mapItems);
    }

    getItem(businessId: string, itemId: string): Observable<Item> {
        return this.http.get('v1/business/' + businessId + '/item/' + itemId)
            .map(this.mapItem);
    }

    addItem(businessId: string, item: Item): Observable<Item> {
        return this.http.post('v1/business/' + businessId + '/item/add', item)
            .map(this.mapItem);        
    }

    updateItem(businessId: string, item: Item): Observable<Item> {
        return this.http.post('v1/business/' + businessId + '/item/update', item)
            .map(this.mapItem);
    }

    private mapItems(res: Response): Item[] {
        return res.json().map(r => <Item>({
            id: r._id,
            itemDescription: r.itemDescription,
            itemType: r.itemType,
            hsnCode: r.hsnCode,
            itemCode: r.itemCode,
            sellingPrice: r.sellingPrice,
            purchasePrice: r.purchasePrice,
            unitOfMeasurement: r.unitOfMeasurement,
            discount: r.discount,
            itemNotes: r.itemNotes
        }));
    }

    private mapItem(res: Response): Item {
        let r = res.json();
        let item = <Item>({
            id: r._id,
            itemDescription: r.itemDescription,
            itemType: r.itemType,
            hsnCode: r.hsnCode,
            itemCode: r.itemCode,
            sellingPrice: r.sellingPrice,
            purchasePrice: r.purchasePrice,
            unitOfMeasurement: r.unitOfMeasurement,
            discount: r.discount,
            itemNotes: r.itemNotes
        });
        return item;
    }
}
