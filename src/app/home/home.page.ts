import { Component, ViewChild } from '@angular/core';
import { IonRange } from '@ionic/angular';
import {Howl} from 'howler';
import {BackgroundMode} from '@ionic-native/background-mode/ngx';

export interface Track {
  name: string;
  path: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  playlist: Track[] = [
    {
      name: 'A new beginning',
      path: './assets/mp3/bensound-anewbeginning.mp3'
    },
    {
      name: 'Creative Minds',
      path: './assets/mp3/bensound-creativeminds.mp3'
    },
    {
      name: 'Happy Rock',
      path: './assets/mp3/bensound-happyrock.mp3'
    },
    {
      name: 'Jazz Frenchy',
      path: './assets/mp3/bensound-jazzyfrenchy.mp3'
    },
    {
      name: 'Little Idea',
      path: './assets/mp3/bensound-littleidea.mp3'
    },
    {
      name: 'Ukulele',
      path: './assets/mp3/bensound-ukulele.mp3'
    },
  ]


  activeTrack : Track = null;
  player: Howl;
  isPlaying = false;
  progress = 0;
  @ViewChild('range',{static: false}) range: IonRange;

  constructor(private backgroundMode: BackgroundMode) {}

  start(track: Track){
    this.backgroundMode.enable();
    this.backgroundMode.on("activate").subscribe(() => {
      if(this.player){
        this.player.stop();
      }
      this.player = new Howl({
        src: [track.path],
        onplay: () => {
          console.log('onplay');
          this.isPlaying = true
          this.activeTrack = track;
          this.updateProgress();
        },
        onend: () => {

        }
      });
      this.player.play();
    });
  }

  togglePlayer(pause){
    this.isPlaying = !pause;
    if(pause){
      this.player.pause();
    }
    else{
      this.player.play();
    }
  }

  next(){
    let index = this.playlist.indexOf(this.activeTrack); //find out index of currently playing track
    if(index != this.playlist.length - 1){
      this.start(this.playlist[index + 1]);
    }
    else{
      this.start(this.playlist[0]);
    }
  }

  prev(){
    let index = this.playlist.indexOf(this.activeTrack); //find out index of currently playing track
    if(index > 0){
      this.start(this.playlist[index - 1]);
    }
    else{
      this.start(this.playlist[this.playlist.length - 1]);
    }
  }

  seek(){
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100))
  }

  updateProgress(){
    let seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;
    setTimeout(() => {
      this.updateProgress();
    },1000);
  }

}
