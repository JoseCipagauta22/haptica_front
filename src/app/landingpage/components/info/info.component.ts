import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit{

  constructor(private router: Router) { }

  ngOnInit(): void {
    window.scroll(0,0);
  }

  redirecTo(){
    this.router.navigateByUrl('inicio');
  }

  
}
