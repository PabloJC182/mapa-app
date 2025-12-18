import { Component, signal } from '@angular/core';
import { MapComponent } from "./components/map/map.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AdminComponent } from "./components/admin/admin.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [MapComponent, HeaderComponent, FooterComponent, AdminComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mapa-app');
}
