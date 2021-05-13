import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Track } from '../home/home.page';

declare var SC;
@Injectable({
  providedIn: 'root'
})
export class SoundCloudService {

  private clientId: string = 'TT9Uj7PkasKPYxBlhLNxg2nFm9cLcKmv';
  private tracks: any[] = [];
  private playTrack: number = 0;
  public currentTrack: Track;

  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      SC.initialize({
          client_id: this.clientId
      });
    });
   }

   fetchTracks(bpm: number, genre:string): void {
    SC.get('/tracks', {

      genres: genre,
      bpm: { 
          from: bpm - 5, 
          to: bpm + 5
      },
      filter: 'public'

  }).then((tracks) => {

      console.log(tracks);

      this.tracks = tracks;

      console.log("Playing " + tracks.length + " tracks");

      this.startStreaming();

  });

  }

  startStreaming(){
    this.currentTrack = this.tracks[this.playTrack];

        console.log("Playing track " + this.playTrack);
        console.log(this.currentTrack);

        SC.stream('/tracks/' + this.currentTrack.id).then((player) => {

            player.play();

            player.on('buffering_start', () => {
                console.log('buffering...');
            });

            player.on('buffering_end', () => {
                console.log('party!');
            });

            player.on('finish', () => {

                if(this.playTrack < this.tracks.length - 1){
                    this.playTrack++;
                } else {
                    this.playTrack = 0;
                }

                console.log('time to move on...');
                this.startStreaming();

            });
        });

  }
}
