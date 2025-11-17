import { Component, signal } from '@angular/core';
import { MapComponent } from "./components/map/map.component";

@Component({
  selector: 'app-root',
  imports: [MapComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mapa-app');
}
