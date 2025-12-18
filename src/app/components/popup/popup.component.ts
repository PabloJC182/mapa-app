import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
})

export class PopupInfoComponent {

  @Input() data: any;

  openWaze() {
    window.open(`https://waze.com/ul?ll=${this.data.lat},${this.data.lng}`, '_blank');
  }

  openGoogle() {
    window.open(`https://www.google.com/maps/search/?api=1&query=${this.data.lat},${this.data.lng}`, '_blank');
  }

  openMaps() {
    this.openGoogle();
  }
}
