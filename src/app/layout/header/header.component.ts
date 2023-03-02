import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '@shared/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name!: string;
    constructor(
      public readonly sessionStorageService: SessionStorageService
    ) { }
    
    ngOnInit(): void {
      this.name  = this.sessionStorageService.getUser().name;
    }

}
