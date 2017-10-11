import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Business, Gstin } from './../models';

@Injectable()
export class BusinessService {

    constructor(
        private http: Http
    ) { }

    getAllBusiness(): Observable<Business[]> {
        return this.http.get('v1/business')
            .map(this.mapBusinesses);
    }

    addBusiness(busiessDataModel: Business): Observable<Business> {
        return this.http.post('v1/business/add', busiessDataModel)
            .map(this.mapBusiness);
    }

    updateBusiness(busiessDataModel: Business): Observable<Business> {
        return this.http.post('v1/business/update', busiessDataModel)
            .map(this.mapBusiness);
    }

    removeBusiness(businessId: String): Observable<Business> {
        debugger;
        let url = 'v1/business/' + businessId;
        return this.http.delete(url)
            .map((res: Response) => res.json());
    }

    removeGstIn(businessId: String, gstinId: String): Observable<Business> {
        debugger;
        let url = 'v1/business/' + businessId + '/gstin/' + gstinId;
        return this.http.delete(url)
            .map((res: Response) => res.json());
    }

    updateGstin(businessId: String, gstinDataModel: Gstin): Observable<Business> {

        let url = 'v1/business/' + businessId + '/gstin/update';

        return this.http.post(url, gstinDataModel)
            .map(this.mapBusiness);
    }

    //mapping for array
    private mapBusinesses(res: Response): Business[] {
        return res.json().map(r => <Business>({
            id: r._id,
            businessName: r.businessName,
            pan: r.pan,
            logo: r.logo,
            gstins: r.gstins.map(g => <Gstin>({
                id: g._id,
                gstin: g.gstin,
                displayName: g.displayName
            }))
        }));
    }

    //mapping for single object
    private mapBusiness(res: Response): Business {
        debugger;
        let r = res.json();
        let business = <Business>({
            id: r._id,
            businessName: r.businessName,
            pan: r.pan,
            logo: r.logo,
            gstins: r.gstins.map(g => <Gstin>({
                id: g._id,
                gstin: g.gstin,
                displayName: g.displayName
            }))
        });
        return business;
    }
}