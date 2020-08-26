import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient } from '@angular/common/http';
import { YtService } from './providers/yt.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public playList = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private yt: YtService,
    private httpClient: HttpClient,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getPlayLists();
    });
  }

  ngOnInit() {

  }

  getPlayLists(){
    this.httpClient.get('https://www.googleapis.com/youtube/v3/playlists?key=' + this.yt.apiKey + '&channelId=' + this.yt.channel + '&part=snippet,id&maxResults=20')
    .subscribe((dati) => {
      this.playList = dati['items'];
      this.yt.data = this.playList;
      console.log(this.yt.data);

    }, error => {
      console.log(error);
    });
  }

  sendData(id, title){
    // alert(id + '-' + title);
    this.navCtrl.navigateRoot('folder/' + id);
  }
}
