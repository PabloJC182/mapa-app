import {
  AfterViewInit,
  Component,
  OnDestroy
} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit, OnDestroy {
  ;
  // Coordenadas de Antigua (ejemplo)
  private readonly initialLat = 14.5586;
  private readonly initialLng = -90.7296;
  private readonly initialZoom = 15;
  private readonly DrenajeSantaAnaLat = 14.548126;
  private readonly DrenajeSantaAnaLng = -90.723977;
  private readonly EscuelaSanMateoLat = 14.577813;
  private readonly EscuelaSanMateoLng = -90.694745;
  private map!: L.Map;
  private markersLayer!: L.LayerGroup;

  selectedCoords: L.LatLng | null = null;
  searchText = '';

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  // Inicialización general del mapa
  private initMap(): void {
    this.map = L.map('map', {
      center: [this.initialLat, this.initialLng],
      zoom: this.initialZoom,
      zoomControl: false // agregaremos uno personalizado
    });

    // Capa base OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Control de zoom (posición similar al mockup, arriba derecha)
    L.control
      .zoom({
        position: 'topright'
      })
      .addTo(this.map);

    // Capa para agrupar marcadores
    this.markersLayer = L.layerGroup().addTo(this.map);

    // Marcador inicial (Parqueo Encinos)
    this.addMarker(this.DrenajeSantaAnaLat, this.DrenajeSantaAnaLng, 'Mejoramiento de Drenaje en Santa Ana');
    this.addMarker(this.EscuelaSanMateoLat, this.EscuelaSanMateoLng, 'Escuela de San Mateo Milpas Altas');

    // Evento click para obtener coordenadas
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      this.selectedCoords = event.latlng;
      console.log('Coordenadas clicadas:', lat, lng);

      // Opcional: agregar un marcador donde se hace click
      // this.addMarker(lat, lng, 'Nuevo punto');
    });
  }

  /**
   * Crea y agrega un marcador al mapa con el estilo de icono por defecto
   * (tomando las imágenes desde assets/leaflet).
   */
  addMarker(lat: number, lng: number, title?: string): void {
    const icon = L.icon({
      iconUrl: 'assets/leaflet/parking.svg',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const marker = L.marker([lat, lng], { icon });

    if (title) {
      marker.bindPopup(`<strong>${title}</strong>\n <br>
        Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}<br>`);
    }

    marker.addTo(this.markersLayer);
  }

  /**
   * Ejemplo para centrar el mapa en el marcador inicial (vinculado al botón
   * "Explorar mapa en vivo").
   */
  centerOnInitialMarker(): void {
    if (this.map) {
      this.map.setView([this.initialLat, this.initialLng], this.initialZoom, {
        animate: true
      });
    }
  }
}
