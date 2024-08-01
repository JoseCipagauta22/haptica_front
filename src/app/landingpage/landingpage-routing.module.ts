import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { InfoComponent } from './components/info/info.component';
import { CuestionarioComponent } from './components/cuestionario/cuestionario.component';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { TestComponent } from './components/test/test.component';

let routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'inicio',
        component: InicioComponent
      },
      {
        path: 'inicio/categoria/:id',
        component: InfoComponent
      },
      {
        path: 'inicio/cuestionario',
        component: CuestionarioComponent
      },
      {
        path: 'inicio/resultado',
        component: ResultadoComponent
      },
      {
        path: 'inicio/test',
        component: TestComponent
        // loadChildren: () => import('../users/users.module').then(childRouting => childRouting.UsersModule),
      },

      { path: '**', redirectTo: 'inicio' }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // providers: [
  //   {
  //     provide: ROUTES,
  //     useFactory: (categoriesService: LandingpageService)=>{
  //       let standardRoutes: Routes = categoriesService.miPrueba();
  //       return standardRoutes;
  //     },
  //     multi: true,
  //     deps: [LandingpageService]
  //   }
  // ]
})
export class LandingpageRoutingModule { }
