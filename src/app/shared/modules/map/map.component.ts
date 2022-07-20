import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import tt from '@tomtom-international/web-sdk-maps';
import { Subject } from 'rxjs';
import { MapService } from './map.service';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements OnInit, OnDestroy {
  private readonly API_KEY = 'EnbJILF8heVHveI38Q6OVEZQ4Po4AdqS';
  @Input('location') location: string;
  @Input('mapNotifier') mapNotifier: Subject<string>;
  private map: any;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.createMap();
    this.getGeoPosition(this.location);
    if (this.mapNotifier) {
      this.mapNotifier.subscribe((location) => {
        this.getGeoPosition(location);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.mapNotifier) {
      this.mapNotifier.unsubscribe();
    }
  }

  private createMap() {
    const map = tt.map({
      key: this.API_KEY,
      container: 'bwm-map',
      style: 'tomtom://vector/1/basic-main',
    });
    map.addControl(new tt.NavigationControl());
  }

  private getGeoPosition(location: string) {
    this.mapService.getGeoPosition(location, this.API_KEY).subscribe({
      next: (position) => {
        this.mapService.initMap(this.map, position);
      },
      error: (error: Error) => {
        this.mapService.centerMap(this.map, { lat: 0, lon: 0 });
        this.mapService.addPopupToMap(this.map, error.message);
      },
    });
  }
}
