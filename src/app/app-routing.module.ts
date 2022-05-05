import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {INDEX, IndexComponent} from "./index/index.component";
import {LOGIN_URL, LoginPageComponent} from "./login-page/login-page.component";
import {REGISTER_URL, RegisterPageComponent} from "./register-page/register-page.component";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: INDEX},
  {path: INDEX, component: IndexComponent},
  {path: LOGIN_URL, component: LoginPageComponent},
  {path: REGISTER_URL, component: RegisterPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
