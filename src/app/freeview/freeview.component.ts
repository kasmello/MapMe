import { Component, ViewChild, ElementRef } from '@angular/core';
import { GlobalService } from '../global.service';
import { Subject } from 'rxjs';
import { fadeInAnimation } from '../animations';


@Component({
  selector: 'app-freeview',
  templateUrl: './freeview.component.html',
  styleUrls: ['./freeview.component.scss'],
  animations: [fadeInAnimation]
})
export class FreeviewComponent {
  @ViewChild('map') mapElement:  ElementRef;
  map: google.maps.Map;
  infoWindows: google.maps.InfoWindow[] = [];
  placeService: google.maps.places.PlacesService;
  markers: google.maps.Marker[] = [];
  constructor (private globalService: GlobalService) {
  }
  ngAfterViewInit() {
    const mapProperties = {
      center: new google.maps.LatLng(-32, 116),
      zoom: 10
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties)
    this.map.addListener("click", ()=> {
      this.infoWindows.forEach((infowindow) => infowindow.close())
    })
    this.activateMarkers();
    
   
  }

  async activateMarkers() {
    this.placeService = await new google.maps.places.PlacesService(this.map);
    await this.globalService.currDestinations.subscribe((destinationList) => {
      this.markers.forEach((marker) => {
        marker.setMap(null);
      })
      this.markers = []
      this.infoWindows = []
      destinationList.forEach((id: string) => {
        this.placeService.getDetails({
            placeId: id,
            fields: ['name','formatted_address','geometry']
          },(result: any,status: string)=> {
          if (status != google.maps.places.PlacesServiceStatus.OK) {
            alert(status);
            return;
          }
          var marker = new google.maps.Marker({
            map: this.map,
            place: {
                placeId: id,
                location: result.geometry.location
            },
            title: result.name
          })
          
          const infowindow = new google.maps.InfoWindow({
            content: `<strong>${result.name}</strong><br>${result.formatted_address}`
          });

          marker.addListener("click", () => {
            this.infoWindows.forEach((infowindow) => infowindow.close())
            infowindow.open(this.map,marker);
          });

          this.markers.push(marker);
          this.infoWindows.push(infowindow);
          
        })
      })
    })
   
  }
    


  
  
  
    
  

  
}


