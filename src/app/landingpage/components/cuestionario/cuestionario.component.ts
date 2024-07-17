import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrl: './cuestionario.component.scss'
})
export class CuestionarioComponent {

  constructor(private router: Router) { }

  redirecTo(url:String){
    this.router.navigateByUrl(`inicio/${url}`);
  }

}
