import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilComponent,
    children: [
      {
        path: '',
        component: VerPerfilComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
