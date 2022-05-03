import {Component, OnInit} from '@angular/core';
import {IndexService} from "../service/index.service";
import {Emoji} from "../model/Emoji";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  links: String[] = [];

  nowLink: number=0;

  link: String= "";

  constructor(private indexService: IndexService) {  }

  ngOnInit(): void {
    this.indexService.getVideo()
      .subscribe(links => {
        this.links = links;
        this.link = this.links[0];
      }, error => {
        console.log(error)
      });
  }

  public nextVideo() {
    if(this.nowLink==this.links.length-1) {
      return;
    }
    this.nowLink++;
    this.link=this.links[this.nowLink];

  }

  public prevVideo() {
    if(this.nowLink==0) {
      return;
    }
    this.nowLink--;
    this.link=this.links[this.nowLink];
  }

  public sendLike(link: String) {
    this.indexService.sendEmoji(new Emoji(link,1));
  }

  public sendDislike(link: String) {
    this.indexService.sendEmoji(new Emoji(link,-1));
  }

}
