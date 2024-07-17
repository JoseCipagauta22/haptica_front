import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LandingpageService } from '../../services/landingpage.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {



  constructor(private router: Router, public landingpageService: LandingpageService) { }

  ngOnInit(): void {
    this.landingpageService.getCountries();
  }

  redirecTo(categoria:String){
    this.router.navigateByUrl(`inicio/${categoria}`);
  }
}
