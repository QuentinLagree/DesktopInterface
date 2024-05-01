import { Injectable, OnInit } from '@angular/core';
import displayIconService from './displayIcon.service';
import { ElementDesktop, FolderElement } from 'src/app/domain/entities/ElementsOfDesktop.types';
import { typesElements } from 'src/app/domain/entities/typesOfElements.types';
import { ProgramManager } from '../Program/ProgramManager';



@Injectable({
  providedIn: 'root'
})



export class DesktopSettingsServices {
  
  iconSizeOfDisplay: string = displayIconService.MEDIUM;
  filterIconInDesktop: string = "nom"
  ElementsOfDesktop: Map<number, ElementDesktop> = new Map<number, ElementDesktop>();

  onLoad() {
    for (let i = 0; i <= 200; i++) {
      this.ElementsOfDesktop.set(i, new ElementDesktop("", typesElements.NULL, ""));
    }   
    this.ElementsOfDesktop.set(0, new FolderElement("Dossier"))
  }

  public add(index: number) {
    this.ElementsOfDesktop.set(index, new FolderElement("Nouveau dossier"))
  }
  
  public getFilterIcon() : string {
    return this.filterIconInDesktop;
  }

  public getPathWithName (program_name: string): string {
    return `/assets/dock-images/${program_name}.png`
  }
  

  public setFilterIcon(size : string) {
    this.filterIconInDesktop = size;
  }

  public getDisplayIconSize() : string {
    return this.iconSizeOfDisplay;
  }

  
  public setDisplayIconSize(size : string) {
    this.iconSizeOfDisplay = size;
  }

  public getElementsOnDesktop (): Map<number, ElementDesktop> {
    return this.ElementsOfDesktop
  }
}
