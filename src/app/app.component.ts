import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { DockerComponent } from './userinterface/components/toolbar/dock.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [NgIf, RouterLink, RouterOutlet, DockerComponent]
})
export class AppComponent {

  constructor () {}

}
