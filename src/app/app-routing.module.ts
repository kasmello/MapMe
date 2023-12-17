import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MappedComponent } from './mapped/mapped.component';

const routes: Routes = [
  { path: '', component: HomeComponent}
  ,{ path: 'mapped', component: MappedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
