import { NgClass, NgFor, NgIf} from '@angular/common';
import { Component, Input} from '@angular/core';
import { ElementDesktop} from 'src/app/domain/entities/ElementsOfDesktop.types';
import { typesElements } from 'src/app/domain/entities/typesOfElements.types';

import { DesktopSettingsServices } from 'src/app/infrastructure/services/Desktop.service';

@Component({
  selector: 'desktop-interface',
  templateUrl: './desktop-interface.component.html',
  standalone: true,
  imports: [NgIf, NgClass, NgFor],
  styleUrls: ['./desktop-interface.component.css']
})
export class DesktopInterface{
  constructor (public settings: DesktopSettingsServices) {}

  getValues(map: Map<number, ElementDesktop>){
    return Array.from(map.keys());
}

methodFocusSpan(text: string) {
  console.log(text)
}
  
  
}
