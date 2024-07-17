import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrl: './resultado.component.scss'
})
export class ResultadoComponent {
  constructor(private router: Router) { }

  redirecTo(url:String){
    this.router.navigateByUrl(`inicio/${url}`);
  }
}
