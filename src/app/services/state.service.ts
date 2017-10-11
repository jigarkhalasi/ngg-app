import { Injectable } from '@angular/core';

import { State } from './../models';

@Injectable()
export class StateService {

  states: State[];

  constructor() {
    this.states = [
      { stateCode: '24', stateName: 'Gujarat' },
      { stateCode: '01', stateName: 'Jammu & Kashmir' }
    ];
  }

  getAll(): State[] {
    return this.states;
  }

  get(stateCode: string): State {
    let state: State;
   
    state = this.states.find(s => s.stateCode == stateCode);   

    return state;
  }
}
