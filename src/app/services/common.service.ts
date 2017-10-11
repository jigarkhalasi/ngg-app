import { Injectable } from '@angular/core';

import { Business, Gstin } from './../models';
import { StateService } from './state.service';

@Injectable()
export class CommonService {

  constructor(
    private stateService: StateService
  ) { }

  getItemTypes() {
    return [
      { value: 'G', text: 'Goods' },
      { value: 'S', text: 'Services ' }
    ];
  }

  getUnitOfMeasurements() {
    return [
      { value: 'BOU', text: 'BOU' },
      { value: 'Bag', text: 'Bag' },
      { value: 'Bags', text: 'Bags' },
      { value: 'Bails', text: 'Bails' },
      { value: 'Bottles', text: 'Bottles' },
      { value: 'Boxes', text: 'Boxes' },
      { value: 'Buckles', text: 'Buckles' },
      { value: 'Bulk', text: 'Bulk' },
      { value: 'Bunches', text: 'Bunches' },
      { value: 'Bundles', text: 'Bundles' },
      { value: 'Cans', text: 'Cans' },
      { value: 'Centimeter', text: 'Centimeter' },
      { value: 'Chest', text: 'Chest' },
      { value: 'Coils', text: 'Coils' },
      { value: 'Collies', text: 'Collies' },
      { value: 'Crates', text: 'Crates' },
      { value: 'Cubic Centimeter', text: 'Cubic Centimeter' },
      { value: 'Cubic Feet', text: 'Cubic Feet' },
      { value: 'Cubic Inches', text: 'Cubic Inches' },
      { value: 'Cubic Meter', text: 'Cubic Meter' },
      { value: 'Cubic Meters', text: 'Cubic Meters' },
      { value: 'Cylinder', text: 'Cylinder' },
      { value: 'Days', text: 'Days' },
      { value: 'Decameter Square', text: 'Decameter Square' },
      { value: 'Dozen', text: 'Dozen' },
      { value: 'Drums', text: 'Drums' },
      { value: 'Feet', text: 'Feet' },
      { value: 'Flasks', text: 'Flasks' },
      { value: 'Grams', text: 'Grams' },
      { value: 'Great Britain Ton', text: 'Great Britain Ton' },
      { value: 'Great Gross', text: 'Great Gross' },
      { value: 'Gross', text: 'Gross' },
      { value: 'Gross Yards', text: 'Gross Yards' },
      { value: 'Habbuck', text: 'Habbuck' },
      { value: 'Hanks', text: 'Hanks' },
      { value: 'Hours', text: 'Hours' },
      { value: 'Inches', text: 'Inches' },
      { value: 'Jotta', text: 'Jotta' },
      { value: 'Kilograms', text: 'Kilograms' },
      { value: 'Kilometers', text: 'Kilometers' },
      { value: 'Liters', text: 'Liters' },
      { value: 'Logs', text: 'Logs' },
      { value: 'Lots', text: 'Lots' },
      { value: 'Meter', text: 'Meter' },
      { value: 'Metric Ton', text: 'Metric Ton' },
      { value: 'Milligrams', text: 'Milligrams' },
      { value: 'Millilitre', text: 'Millilitre' },
      { value: 'Millimeter', text: 'Millimeter' },
      { value: 'Numbers', text: 'Numbers' },
      { value: 'Odds', text: 'Odds' },
      { value: 'Others', text: 'Others' },
      { value: 'Packs', text: 'Packs' },
      { value: 'Pails', text: 'Pails' },
      { value: 'Pallets', text: 'Pallets' },
      { value: 'Pieces', text: 'Pieces' },
      { value: 'Pounds', text: 'Pounds' },
      { value: 'Quintal', text: 'Quintal' },
      { value: 'Reels', text: 'Reels' },
      { value: 'Rolls', text: 'Rolls' },
      { value: 'Sets', text: 'Sets' },
      { value: 'Sheets', text: 'Sheets' },
      { value: 'Slabs', text: 'Slabs' },
      { value: 'Square Centimeters', text: 'Square Centimeters' },
      { value: 'Square Feet', text: 'Square Feet' },
      { value: 'Square Inches', text: 'Square Inches' },
      { value: 'Square Meter', text: 'Square Meter' },
      { value: 'Square Yards', text: 'Square Yards' },
      { value: 'Steel Blocks', text: 'Steel Blocks' },
      { value: 'Tables', text: 'Tables' },
      { value: 'Tablets', text: 'Tablets' },
      { value: 'Ten Gross', text: 'Ten Gross' },
      { value: 'Thousands', text: 'Thousands' },
      { value: 'Tins', text: 'Tins' },
      { value: 'Tola', text: 'Tola' },
      { value: 'Trunk', text: 'Trunk' },
      { value: 'Tubes', text: 'Tubes' },
      { value: 'US Gallons', text: 'US Gallons' },
      { value: 'Units', text: 'Units' },
      { value: 'Vials', text: 'Vials' },
      { value: 'Wooden Cases', text: 'Wooden Cases' },
      { value: 'Yards', text: 'Yards' }      
    ]
  }

  getAdvancedSettingsForInvoice() {
    return [
      { value: 1, text: 'None' },
      { value: 2, text: 'Reverse Charge' }
    ];
  }

  getGstSlabs() {
    let slabs = [
      { value: 0, text: '0' },
      { value: 0.25, text: '0.25' },
      { value: 3, text: '3' },
      { value: 5, text: '5' },
      { value: 12, text: '12' },
      { value: 18, text: '18' },
      { value: 28, text: '28' }
    ];

    return slabs;
  }

  getGstSlabsAsHalf() {
    let slabs = [
      { value: 0, text: '0' },
      { value: 0.125, text: '0.125' },
      { value: 1.5, text: '1.5' },
      { value: 2.5, text: '2.5' },
      { value: 6, text: '6' },
      { value: 9, text: '9' },
      { value: 14, text: '14' }
    ];

    return slabs;
  }

  getStateFromGstin(gstin: string) {

    let states = this.stateService.getAll();

    let state = states.find(s => s.stateCode == gstin.substr(0, 2));
      
    return state;
  }

  getCurrentBusiness() {
    let business = localStorage.getItem('gst-current-business');
    return JSON.parse(business);
  }
  setCurrentBusiness(business: Business) {
    localStorage.setItem('gst-current-business', JSON.stringify(business));
  }
  getCurrentGstin() {
    let gstin = localStorage.getItem('gst-current-gstin');
    return JSON.parse(gstin);
  }
  setCurrentGstin(gstin: Gstin) {
    localStorage.setItem('gst-current-gstin', JSON.stringify(gstin));
  }
}
