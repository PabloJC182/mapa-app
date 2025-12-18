import {
  Component,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import * as L from 'leaflet';
import { FormsModule } from '@angular/forms';
interface AdminPoint {
  name: string;
  lat: number;
  lng: number;
}

interface AdminLine {
  points: L.LatLng[];
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements AfterViewInit, OnDestroy {

  map!: L.Map;

  points: AdminPoint[] = [];
  lines: AdminLine[] = [];

  newPoint: AdminPoint = {
    name: '',
    lat: 14.558,
    lng: -90.73
  };

  newLinePoints: L.LatLng[] = [];

  markersLayer = L.layerGroup();
  linesLayer = L.layerGroup();

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    this.map = L.map('admin-map', {
      center: [14.5586, -90.7296],
      zoom: 15,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

    this.markersLayer.addTo(this.map);
    this.linesLayer.addTo(this.map);

    // Evento para crear líneas
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.newLinePoints.push(e.latlng);

      const tempMarker = L.circleMarker(e.latlng, {
        radius: 5,
        color: '#0077ff',
        fillColor: '#0077ff',
        fillOpacity: 0.9
      });

      tempMarker.addTo(this.linesLayer);
    });
  }

  createPoint(): void {
    if (!this.newPoint.name) return;

    this.points.push({ ...this.newPoint });
    this.addMarker(this.newPoint);

    this.newPoint = { name: '', lat: 14.558, lng: -90.73 };
  }

  addMarker(p: AdminPoint): void {
    const icon = L.icon({
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });

    L.marker([p.lat, p.lng], { icon })
      .bindPopup(`<strong>${p.name}</strong>`)
      .addTo(this.markersLayer);
  }

  deletePoint(point: AdminPoint): void {
    this.points = this.points.filter(p => p !== point);
    this.refreshMap();
  }

  saveLine(): void {
    if (this.newLinePoints.length < 2) return;

    const line: AdminLine = {
      points: [...this.newLinePoints]
    };

    this.lines.push(line);

    L.polyline(line.points, { color: '#f5b700', weight: 5 })
      .addTo(this.linesLayer);

    this.newLinePoints = [];
  }

  deleteLine(index: number): void {
    this.lines.splice(index, 1);
    this.refreshMap();
  }

  private refreshMap(): void {
    this.markersLayer.clearLayers();
    this.linesLayer.clearLayers();

    for (const p of this.points) {
      this.addMarker(p);
    }

    for (const l of this.lines) {
      L.polyline(l.points, { color: '#f5b700', weight: 5 })
        .addTo(this.linesLayer);
    }
  }
}
