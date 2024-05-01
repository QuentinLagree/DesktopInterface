import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { DockerComponent } from './userinterface/components/toolbar/dock.component';
import { ContextMenuComponent } from './userinterface/components/context-menu/context-menu.component';
import { DesktopInterface } from "./userinterface/components/desktop-interface/desktop-interface.component";
import { DesktopSettingsServices } from './infrastructure/services/Desktop.service';
import { SelectComponentComponent } from './userinterface/components/select-component/select-component.component';
import { ProgramService } from './infrastructure/services/Program.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NgIf, RouterLink, RouterOutlet, DockerComponent, ContextMenuComponent, DesktopInterface, SelectComponentComponent]
})
export class AppComponent implements OnInit {

  isSelectedMode: boolean = false;

  constructor (public settings: DesktopSettingsServices, public programs: ProgramService) {}
  ngOnInit(): void {
    this.settings.onLoad();
    this.programs.onLoad();
  }

  @HostListener('window:mousedown', ['$event'])
  MouseOver(event: MouseEvent) {

    this.isSelectedMode = true;

    
    
  }

  showContextMenu(event: Event) {
    event.preventDefault();
    
  }



  
}
