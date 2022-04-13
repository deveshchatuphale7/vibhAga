import { Component, OnInit,ViewChild, ElementRef, NgZone,OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
// import { MapsAPILoader } from '@agm/core';
import { Observable, Subscriber } from 'rxjs';
import * as L from 'leaflet';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  uploadForm:any;
  fileList: any[] = [
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // },
    // {
    //   uid: '-2',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // },
    // {
    //   uid: '-3',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // },
    // {
    //   uid: '-4',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // },
    // {
    //   uid: '-xxx',
    //   percent: 50,
    //   name: 'image.png',
    //   status: 'uploading',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // },
    // {
    //   uid: '-5',
    //   name: 'image.png',
    //   status: 'error'
    // }
  ];
  previewImage: string | undefined = '';
  previewVisible = false;

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

     function markerOnClick(e: any) {
      alert("hi. you clicked the marker at " + e.latlng);
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
        console.log(this.latLang)
        this.posMarker = L.marker([position.latitude, position.longitude], { icon }); //.bindPopup('Angular Leaflet');
        this.posMarker.addTo(this.map);
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


  handlePreview = async (file: any): Promise<void> => {
    // console.log(this.fileList);
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  submitData = async() => {
    // var image = this.getBase64(this.fileList[0])
    console.log(this.fileList);
    var images = this.fileList.map(d=>{
      console.log(d);
      return d.thumbUrl});

    this.common.httpPost("/addData",{...this.uploadForm.value ,...{"loc":this.latLang},...{"file":images}}).subscribe((res:any)=>{

    })
  }

  constructor(private fb:FormBuilder,  private ngZone: NgZone,private common:CommonService) { }

  ngOnInit(): void {
    L.Icon.Default.imagePath = "assets/"

    this.uploadForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price:[0, []],
      // donateOrSell:['', []],
      // tags:[[], []],
      pictures: [[], []],
      isDonate:[false,[]]
      
    });

    // this.mapsAPILoader.load().then(() => {
    //   this.setCurrentLocation();
    //   this.geoCoder = new google.maps.Geocoder;
    // });

  }
  public ngAfterViewInit(): void {
    this.loadMap();
  }

  ngOnDestroy(){
    this.map.off();
  this.map.remove();
  }

}
