import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { InfoComponent } from './components/info/info.component';
import { CuestionarioComponent } from './components/cuestionario/cuestionario.component';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'inicio',
        component: InicioComponent
        // loadChildren: () => import('../customers/customers.module').then(childRouting => childRouting.CustomersModule),
      },
      {
        path: 'inicio/riesgos',
        component: InfoComponent
        // loadChildren: () => import('../users/users.module').then(childRouting => childRouting.UsersModule),
      },

      {
        path: 'inicio/emergencias',
        component: InfoComponent
        // loadChildren: () => import('../users/users.module').then(childRouting => childRouting.UsersModule),
      },

      {
        path: 'inicio/senalizaciones',
        component: InfoComponent
        // loadChildren: () => import('../users/users.module').then(childRouting => childRouting.UsersModule),
      },

      {
        path: 'inicio/cuestionario',
        component: CuestionarioComponent
        // loadChildren: () => import('../users/users.module').then(childRouting => childRouting.UsersModule),
      },

      {
        path: 'inicio/resultado',
        component: ResultadoComponent
        // loadChildren: () => import('../users/users.module').then(childRouting => childRouting.UsersModule),
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
  exports: [RouterModule]
})
export class LandingpageRoutingModule { }
