import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { addFolder, addTextFile } from 'src/app/domain/usecases/ElementsAction';
import { DesktopSettingsServices } from 'src/app/infrastructure/services/Desktop.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  standalone: true,
  imports: [NgIf, NgClass],
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent {


  constructor (public settings: DesktopSettingsServices) {}

  size: string = this.settings.getDisplayIconSize();
  indexOfElementDesktop: number = 0;
  
  
  @ViewChild('contextMenu') contextMenu: ElementRef | undefined;
  @ViewChildren('subMenu') subMenu: QueryList<ElementRef> | undefined;
  
  @HostListener('document:contextmenu', ['$event'])
  public openContextMenu(event: MouseEvent): void {
    
    if (!event.target) return;
    this.getIndex(event.target)

    event.preventDefault();
    if (!this.contextMenu) throw new Error(`Le 'context-menu' n'éxiste pas!`);
    (this.contextMenu.nativeElement as HTMLElement).style.visibility = `visible`;
    (this.contextMenu.nativeElement as HTMLElement).style.transform = `scale(0)`;
    if (!this.subMenu) throw new Error(`Aucun sous-menu n'est trouvable dans la page HTML`);
    if (event.target == (this.contextMenu.nativeElement as HTMLElement)) return;


    let x = event.clientX, y = event.clientY;

    let windowsWidth = window.innerWidth;
    let contextMenuWidth = (this.contextMenu.nativeElement as HTMLElement).offsetWidth;
    let windowsHeight = window.innerHeight;
    let contextMenuHeight = (this.contextMenu.nativeElement as HTMLElement).offsetHeight;

    this.subMenu.forEach((menu) => {
      if (x > (windowsWidth - contextMenuWidth - (menu.nativeElement as HTMLElement).offsetWidth)) {
        (menu.nativeElement as HTMLElement).style.left = '-200px'
      } else {
        (menu.nativeElement as HTMLElement).style.left = '';
        (menu.nativeElement as HTMLElement).style.right = '-200px'
      }

      if (y > windowsHeight - contextMenuHeight  - (menu.nativeElement as HTMLElement).offsetHeight ) {
        (menu.nativeElement as HTMLElement).style.top = `${-((menu.nativeElement as HTMLElement).offsetHeight) + 35 * 2}px`
      } else {
        (menu.nativeElement as HTMLElement).style.top = '-35px'
      }
    })

    
    
    x = x > windowsWidth - contextMenuWidth ? windowsWidth - contextMenuWidth : x; 
    y = y > windowsHeight - contextMenuHeight ? windowsHeight - contextMenuHeight : y; 
    (this.contextMenu.nativeElement as HTMLElement).style.left = `${x}px`;
    (this.contextMenu.nativeElement as HTMLElement).style.top = `${y}px`;
    (this.contextMenu.nativeElement as HTMLElement).style.transform = `scale(1)`;
    
    
  }

  @HostListener('document:click', ['$event'])
  public closeContextMenu(event: MouseEvent): void {
    if (!this.contextMenu) throw new Error(`Le 'context-menu' n'éxiste pas!`);
    (this.contextMenu.nativeElement as HTMLElement).style.transform = `scale(0)`;
    (this.contextMenu.nativeElement as HTMLElement).style.visibility = `hidden`;
    return;
  }


  private getIndex(el: EventTarget) {
    if (!(el as HTMLElement).classList.contains("desktop__icon")) return;
    
    const element = (el as HTMLElement)
    const desktop = element.parentNode;

    if (!desktop) return;

    this.indexOfElementDesktop = Array.from(desktop.children).indexOf(element)
  }
  
  public newFolderAction () {
    addFolder(this.indexOfElementDesktop, this.settings.getElementsOnDesktop())
  }

  public newFileAction () {
    addTextFile(this.indexOfElementDesktop, this.settings.getElementsOnDesktop())
  }
  
}
