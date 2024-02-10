import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MappedComponent } from './mapped/mapped.component';
import { FreeviewComponent } from './freeview/freeview.component';

const routes: Routes = [
  { path: 'mapped', component: MappedComponent}
  ,{ path: 'freeview', component: FreeviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
