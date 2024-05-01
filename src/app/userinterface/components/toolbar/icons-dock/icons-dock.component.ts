import { Component, OnInit } from "@angular/core";
import { typesElements } from "src/app/domain/entities/typesOfElements.types";
import { DesktopSettingsServices } from "src/app/infrastructure/services/Desktop.service";
import { ProgramService } from "src/app/infrastructure/services/Program.service";

@Component({
    selector: 'dock-icon',
    template: '<div (click)="animate($event)" (click)="open_program()" class="dock-icon"><span class="tooltip">{{tooltip}}</span><img [src]="icon" [attr.alt]="tooltip"></div>',
    styleUrls: ['./dock-icons.component.css'],
    standalone: true,
    inputs: ['tooltip', 'icon', 'alt', 'type', 'name', 'path']
  })

  export class IconsDockComponent implements OnInit {

    constructor (
      public system: DesktopSettingsServices,
      public programService: ProgramService
      ) {}
    
    ngOnInit(): void {
      
      if (this.name)
      this.icon = this.system.getPathWithName(this.name);
      
    }


    /**
     * Système Programme
     * 
     * Liste de programs
     * 
     * programs.get("explorer") => FileExplorer();
     * programs.get("textedit") => TextEdit();
     */
    type: typesElements | undefined;
    icon: string | undefined;
    name: string | undefined;
    tooltip: string | undefined;
    desktopElements = typesElements;
    path: string | undefined;
    
    open_program () {
      if (!this.name) return;
      this.programService.start(this.name, {
        path: "C"
      });
    }
    
    animate(event: Event) {
        (event.target as HTMLElement).classList.add("animated")
        setTimeout(() => {
        (event.target as HTMLElement).classList.remove("animated")
        }, 1000)
    }
    
  }