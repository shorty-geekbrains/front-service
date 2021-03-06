import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Emoji} from "../model/Emoji";

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(public http: HttpClient) { }

  public getVideo(){
    return this.http.get<String[]>("video-service/video/amazon");
  }

  public sendEmoji(emoji: Emoji) {
    console.log(emoji);
    this.http.post('video-service/video/emoji',emoji).subscribe();
  }

  public sendFileToServer(formData : FormData) {
    console.log(formData);
    this.http.post('video-service/video/save',formData).subscribe();
  }
}
