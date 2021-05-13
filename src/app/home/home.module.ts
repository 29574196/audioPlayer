import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { StreamingAudioOptions, StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  exports:[BackgroundMode,StreamingMedia],

  declarations: [HomePage]
})
export class HomePageModule {}
