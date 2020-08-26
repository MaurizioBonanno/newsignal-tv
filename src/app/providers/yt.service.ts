
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YtService {

  apiKey = 'AIzaSyBBBXu3kwI3sbGm9Xdl5_k9WUTq6JuyUmc';
  channel = 'UCxsvpdcgljtxZLz6_78sXZQ';
  public data = [];

  constructor(private httpClient: HttpClient, private httpNative: HTTP ) {
  }

  getBrowserData(){
    this.httpClient.get('https://www.googleapis.com/youtube/v3/playlists?key=' + this.apiKey + '&channelId=' + this.channel + '&part=snippet,id&maxResults=20')
    .subscribe((dati) => {
      this.data = dati['items'];
      console.log(this.data);
    }, error => {
      console.log(error);
    });
  }

  getData(){
    return this.data;
  }
}
