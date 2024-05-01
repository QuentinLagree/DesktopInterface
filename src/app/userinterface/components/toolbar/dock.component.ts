import { Component, ElementRef, AfterViewInit, Inject, ViewChild, ViewChildren } from '@angular/core';
import { DOCUMENT, } from '@angular/common';
import { IconsDockComponent } from "./icons-dock/icons-dock.component";
import { typesElements } from 'src/app/domain/entities/typesOfElements.types';

const ICON_SIZE = 64
const SCALE_MAX = 1

enum DIRECTION {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right"
}

class Dock {

  root: HTMLElement;
  iconSize: number;

  constructor(element: HTMLElement) {
    this.root = element;
    this.iconSize = ICON_SIZE;
  }


}

@Component({
    selector: 'docker',
    templateUrl: './dock.component.html',
    styleUrls: ['./dock.component.css'],
    standalone: true,
    imports: [IconsDockComponent]
})
export class DockerComponent implements AfterViewInit {

  mousePosition: number = 0;
  constructor(@Inject(DOCUMENT) private document: Document) { }

  desktopElements = typesElements;

  @ViewChild("dock") private dock: ElementRef<HTMLElement> | undefined;
  @ViewChildren("dock") private icons: HTMLCollection | undefined;

  ngAfterViewInit(): void {
    if (!this.dock) {
      throw new Error(`L'élement 'dock' n'est pas défini ou introuvable dans la page HTML.`)
    };
    this.icons = this.dock.nativeElement.children;
    new Dock(this.dock.nativeElement);
  }

  handleMouseEnter() {
    this.dock?.nativeElement.classList.add('animated');
    window.setTimeout(() => this.dock?.nativeElement.classList.remove('animated'), 100)
  }
  
  handleMouseLeave () {
    this.dock?.nativeElement.classList.add('animated');
    if (!this.icons) throw new Error(`L'élément 'icons' n'est pas défini ou est introuvable dans la page HTML`)
    Array.from(this.icons).forEach(icon => (icon as HTMLElement).style.removeProperty('transform'))
    this.dock?.nativeElement.style.setProperty('width', `auto`)
  }

  handleMouseMove(mouseEvent: MouseEvent) {
    if (!this.dock) {
      throw new Error(`L'élement 'dockclasse' n'est pas défini ou introuvable dans la page HTML.`)
    };
    if (!this.icons) throw new Error(`L'élément 'icons' n'est pas défini ou est introuvable dans la page HTML`)
    this.mousePosition = this.getMousePosition(mouseEvent, this.dock.nativeElement)
    this.scaleElements(this.mousePosition, this.icons);
  }

  private getMousePosition(mouseEvent: MouseEvent, dock: HTMLElement): number {
    return this.setMaxAndMin([0, dock.children.length], (mouseEvent.clientX - dock.offsetLeft) / ICON_SIZE)
  }

  private setMaxAndMin([min, max]: number[], value: number): number {
    return Math.max(min, Math.min(value, max))
  }

  private scaleElements(mousePosition: number, icons: HTMLCollection) {
    Array.from(icons).forEach((icon, index) => {
      const center: number = index + 0.5
      const distanceFromPointer: number = this.mousePosition - center
      const scale: number = this.scalingElementsWithMathFunction(distanceFromPointer) * SCALE_MAX;
      (icon as HTMLElement).style.setProperty('transform', `scale(${scale + SCALE_MAX})`)
    })
    this.moveElementWithOffset(Math.floor(this.mousePosition))
  }

  private moveElementWithOffset(selectedIndex: number) {
    selectedIndex = (selectedIndex == this.icons?.length) ? this.icons?.length - 1 : selectedIndex; 
    const centerOffset = this.mousePosition - selectedIndex - 0.5;
    let baseOffset: number = this.scaleFromDirection(selectedIndex, DIRECTION.CENTER, -centerOffset * ICON_SIZE);
    let offset: number = baseOffset * (0.5 - centerOffset)
    const icons: HTMLCollection | undefined = this.icons;
    if (!icons) throw new Error(`L'élément 'icons' n'est pas défini ou est introuvable dans la page HTML`)
    for (let i = selectedIndex + 1; i < icons.length; i++) {
  if (i > icons.length) return;
      offset += this.scaleFromDirection(i, DIRECTION.LEFT, offset)
    }
    offset = baseOffset * (0.5 + centerOffset)
    for (let i = selectedIndex - 1; i >= 0; i--) {
      offset += this.scaleFromDirection(i, DIRECTION.RIGHT, -offset)
    }
  }


  private scaleFromDirection(index: number, direction: DIRECTION, offset: number) {
    const icons: HTMLCollection | undefined = this.icons;
    if (!icons) throw new Error(`L'élément 'icons' n'est pas défini ou est introuvable dans la page HTML`)
    const center: number = index + 0.5
    const distanceFromPointer: number = this.mousePosition - center
    const scale: number = this.scalingElementsWithMathFunction(distanceFromPointer) * SCALE_MAX;
    const icon = icons[index];
      (icon as HTMLElement).style.setProperty('transform', `translateX(${offset}px) scale(${scale + 1})`);
      (icon as HTMLElement).style.setProperty('transform-origin', `${direction} bottom`);
    return scale * ICON_SIZE
  }

  private scalingElementsWithMathFunction(distance: number): number {
    return Math.max(Math.min(-0.07 * Math.pow(distance, 2) + 0.92, 1), 0)
  }

}

