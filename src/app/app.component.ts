import { Component, OnInit } from '@angular/core';
import {ContentsService} from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public dataSets = [];
  public dataPathSets = [];
  public contents:object = [];
  constructor(private contentService: ContentsService) {}

  public ngOnInit(): void {
    this.getContents();
  }

  public getContents(): void {
    this.contentService.getRootContents().subscribe((data)=> {
      this.contents = data;
    });
  }

  public getData(name, path, isDirectory): void {
    if(!isDirectory) {
        this.contentService.downloadFile(path).subscribe((data) => {
          window.open(data.cloudElementsLink, '_blank');
        })
    } else {
      this.contentService.dataPathSets.push(path);
      console.log(this.contentService.dataPathSets);
      this.contentService.getFolderContents(path).subscribe((data)=> {
        this.contents = data;
      });
    }

  }

  public back(): void {
    if(this.contentService.dataPathSets.length > 0) {
      this.contentService.dataPathSets.pop();
    }
    this.contentService.getFolderContents(this.contentService.dataPathSets[this.contentService.dataPathSets.length -1]).subscribe((data)=> {
      this.contents = data;
    });
  }
}
