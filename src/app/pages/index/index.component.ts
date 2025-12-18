import { Component } from '@angular/core';
import { AdminComponent } from "../../components/admin/admin.component";
import { HeaderComponent } from "../../components/header/header.component";
import { MapComponent } from "../../components/map/map.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-index',
  imports: [AdminComponent, HeaderComponent, MapComponent, FooterComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {

}
