import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LandingpageService } from '../../services/landingpage.service';

@Component({
  selector: 'app-haptica',
  templateUrl: './haptica.component.html',
  styleUrl: './haptica.component.scss'
})
export class HapticaComponent implements OnInit {

  profileForm = this.formBuilder.group({
    selectState: ['']
    // temperature: [''],
    // state: [0],
  });

  constructor(private formBuilder: FormBuilder, public landingpageService: LandingpageService){}

  ngOnInit(){
    this.profileForm.patchValue({
      selectState: '1'
    });
  }

  updateState(){

    console.log('submit', this.profileForm.value.selectState);

    let tempetarure = '0';

    if (this.profileForm.value.selectState == '2') {
      tempetarure = '50'; 
    }

    if (this.profileForm.value.selectState == '3') {
      tempetarure = '15'; 
    }

    this.landingpageService.updateState({temperature: tempetarure, state: Number(this.profileForm.value.selectState)});
    

  }

  

}
