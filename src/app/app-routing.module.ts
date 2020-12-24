import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './Main/create/create.component';
import { ListComponent } from './Main/list/list.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'create', component: CreateComponent },
  { path: 'create/:id', component: CreateComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
