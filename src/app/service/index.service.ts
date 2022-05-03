import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Emoji} from "../model/Emoji";

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(public http: HttpClient) { }

  public getVideo(){
    return this.http.get<String[]>("video-service/video/list");
  }

  public sendEmoji(emoji: Emoji) {
    console.log(emoji);
    this.http.post('video-service/video/emoji',emoji).subscribe();
  }
}
