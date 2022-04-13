import { Component, OnInit,OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { CommonService } from 'src/app/common.service';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  map: any;
  posMarker:any;
  latLang:any
  
  private getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }

  private loadMap(): void {

    this.map = L.map('map').setView([0, 0], 1);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    .on('click', markerOnClick)
    .addTo(this.map);
    // L.marker([51.5, -0.09]).addTo(this.map)
      // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      // .openPopup();

    // var marker = new L.Marker([46.947, 7.4448]).on('click', markerOnClick).addTo(this.map);
    // var marker = L.marker(latlng, {icon: blueIcon}).bindTooltip(feature.properties.count, 
      // {
  // permanent: true, 
  // direction: 'right'
// });

     function markerOnClick(e: any) {
      alert("hi. you clicked the marker at " + e.latlng);
     }
     const icon = L.icon({
      iconUrl: 'assets/images/marker-icon.png',
      shadowUrl: 'assets/images/marker-shadow.png',
      popupAnchor: [13, 0],
    });
     for(let i = 0;i<this.allData.length;i++){
      var marker = L.marker([this.allData[i].lat,this.allData[i].long],{icon}).bindTooltip(this.allData[i].title, {
     permanent: true, 
     direction: 'right'});
     marker.addTo(this.map);
     }

    this.getCurrentPosition()
      .subscribe((position: any) => {
        this.map.flyTo([position.latitude, position.longitude], 13);

        const icon = L.icon({
          iconUrl: 'assets/images/marker-icon.png',
          shadowUrl: 'assets/images/marker-shadow.png',
          popupAnchor: [13, 0],
        });
        this.latLang = position;
        // this.posMarker = L.marker([position.latitude, position.longitude], { icon }); //.bindPopup('Angular Leaflet');
        // this.posMarker.addTo(this.map);
      });

    this.map.on('click', (e: any) => {
       if (this.posMarker){
         this.map.removeLayer(this.posMarker);
        }
      console.log(e.latlng); // e is an event object (MouseEvent in this case)
      // marker = L.marker(e.latlng).addTo(this.map);
      this.latLang = e.latlng;
      this.posMarker = L.marker(e.latlng)
      
      this.posMarker.addTo(this.map);
    });
  }

  allData:any = [];
  private getData(){
    this.common.httpPost("/getData",{}).subscribe((res:any)=>{
      console.log("getData res")
      console.log(res)
      this.allData = res.data.rows;
      this.loadMap();
      // 
    });

  }
  
  constructor(private common:CommonService) { }



  ngOnInit(): void {
   
  }
  public ngAfterViewInit(): void {
    
    this.getData();
  }

  ngOnDestroy(){
    this.map.off();
  this.map.remove();
  }

}
