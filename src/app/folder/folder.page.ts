import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YtService } from '../providers/yt.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { HelperService } from '../providers/helper.service';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public title = 'Titolo';
  playList = [];

  constructor(private activatedRoute: ActivatedRoute, private yt: YtService,
              private httpClient: HttpClient, private navCtrl: NavController,
              private youTubeVideoplayer: YoutubeVideoPlayer,
              private helper: HelperService) {
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.folder){
      if (this.folder === 'Inbox'){

      }else{
                  console.log('folder:' + this.folder);
                  this.getDataPlaylist();
      }
    }
  }

  getDataPlaylist(){
    this.httpClient.get('https://www.googleapis.com/youtube/v3/playlistItems?key=' + this.yt.apiKey + '&playlistId=' + this.folder + '&part=snippet,id&maxResults=20')
    .subscribe((dati) => {
      this.playList = dati['items'];
      console.log(this.playList);
    });
  }

  startVideo(id){
    console.log('id:' + id);
    if (this.helper.isNativePlatform()){
     this.youTubeVideoplayer.openVideo(id);
    }else{
      window.open('https://www.youtube.com/watch?v=' + id);
    }
  }


}
