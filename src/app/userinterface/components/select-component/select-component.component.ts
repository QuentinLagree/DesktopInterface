import { Component } from '@angular/core';

@Component({
  selector: 'select-component',
  template: '<span class="selected-elements"></span>',
  inputs: ['start', 'end'],
  standalone: true
})
export class SelectComponentComponent {

  start: number | undefined;
  end: number | undefined;
  
}
