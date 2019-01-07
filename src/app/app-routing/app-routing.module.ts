import { AdminDashboard2Component } from './../admin/admin-dashboard2/admin-dashboard2.component';
import { AdminDashboard1Component } from './../admin/admin-dashboard1/admin-dashboard1.component';
import { LoginComponentComponent }  from './../login-component/login-component.component';
import {InitvendorComponent} from './../initvendor/initvendor.component';
import {AddUserComponent} from './../add-user/add-user.component';
import {VendorFormComponent} from './../views/vendor-form/vendor-form.component';
import {VendorListComponent} from './../vendor-list/vendor-list.component';
import {VendorDetailsComponent} from './../views/vendor-details/vendor-details.component';
import { CheckGuard } from './../_guards';
import { StarterComponent } from './../starter/starter.component';
import { AdminComponent } from './../admin/admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: LoginComponentComponent, canActivate:[CheckGuard]},
      { path: 'starter', component: StarterComponent  ,
      children: [
        {path: 'initvendor', component: InitvendorComponent},
        {path: 'addUser', component: AddUserComponent},
        {path : 'vendorForm/:id', component :VendorFormComponent},
        {path: 'vendorList', component:VendorListComponent},
        {path: 'vendorDetails/:id', component: VendorDetailsComponent},
      ] },
    ])
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
