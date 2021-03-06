import {Component, OnInit} from '@angular/core';
import {IndexService} from "../service/index.service";
import {Emoji} from "../model/Emoji";

export const INDEX = 'index';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  links: String[] = [];

  nowLink: number=0;

  link: String= "";

  private files: any;

  likes: String="";

  likesNumb: number=0;

  isLike: boolean=false;

  constructor(private indexService: IndexService) {  }

  ngOnInit(): void {
    this.indexService.getVideo()
      .subscribe(links => {
        this.links = links;
        this.link = this.links[0];
        this.likes = this.links[this.nowLink+1];
        this.likesNumb = Number(this.likes);
        console.log(this.links)
        console.log(this.likesNumb)
      }, error => {
        console.log(error)
      });
  }

  public nextVideo() {
    this.isLike=false;
    if(this.nowLink==this.links.length-2) {
      return;
    }
    this.nowLink=this.nowLink+2;
    this.link=this.links[this.nowLink];
    this.likes = this.links[this.nowLink+1];
    this.likesNumb = Number(this.likes);

  }

  public prevVideo() {
    this.isLike=false;
    if(this.nowLink==0) {
      return;
    }
    this.nowLink=this.nowLink-2;
    this.link=this.links[this.nowLink];
    this.likes = this.links[this.nowLink+1];
    this.likesNumb = Number(this.likes);
  }

  public sendLike(link: String) {
  if(!this.isLike) {
    this.isLike=true;
    this.likesNumb++;
  }
    this.indexService.sendEmoji(new Emoji(link,1));
  }

  public sendDislike(link: String) {
    if(!this.isLike) {
      this.isLike=true;
      this.likesNumb--;
    }
    this.indexService.sendEmoji(new Emoji(link,-1));
  }

  addVideo(event : any) {
    console.log(event);
    let target = event.target || event.srcElement;
    this.files = target.files;
    if (this.files) {
      let files :FileList = this.files;
      const formData = new FormData();
      formData.append('file', files[0])
      // for(let i = 0; i < files.length; i++){
      //   formData.append('file', files[i]);
      // }
      this.indexService.sendFileToServer(formData);
    }
  }

}
