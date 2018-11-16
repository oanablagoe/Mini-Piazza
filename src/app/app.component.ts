import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'post';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAfvcR_bla_JGfFhkWteoptYIYC51uH-uM',
      authDomain: 'mini-piazza.firebaseapp.com',
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
