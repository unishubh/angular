import { AdminDashboard2Component } from './../admin/admin-dashboard2/admin-dashboard2.component';
import { AdminDashboard1Component } from './../admin/admin-dashboard1/admin-dashboard1.component';
import { LoginComponentComponent }  from './../login-component/login-component.component';
import {InitvendorComponent} from './../initvendor/initvendor.component';
import {AddUserComponent} from './../add-user/add-user.component';
import {VendorFormComponent} from './../views/vendor-form/vendor-form.component';
import {VendorListComponent} from './../vendor-list/vendor-list.component';
import {VendorDetailsComponent} from './../views/vendor-details/vendor-details.component';
import {InhousevendorsComponent} from './../views/inhousevendors/inhousevendors.component';
import {ListCoComponent} from './../views/list-co/list-co.component';
import {HistoryComponent} from './../views/history/history.component';
import {FormComponent} from './../views/form/form.component';
import {UserlistComponent} from './../views/userlist/userlist.component';
import {CompanyContactComponent} from './../views/forms/company-contact/company-contact.component';
import {CompanyDetailsComponent} from './../views/forms/company-details/company-details.component';
import {OthersComponent} from './../views/forms/others/others.component';
import {ContactComponent} from './../views/forms/contact/contact.component';
import {FilesComponent} from './../views/forms/files/files.component';


import { CheckGuard } from './../_guards';
import { StarterComponent } from './../starter/starter.component';
import { AdminComponent } from './../admin/admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyContact } from '../services/models/vedndors';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: LoginComponentComponent, canActivate:[CheckGuard]},
      {path: 'form/:id/:update', component : FormComponent},
      { path: 'starter', component: StarterComponent  ,
      children: [
        {path: 'initInhousevendor', component: InhousevendorsComponent},
        {path: 'initvendor', component: InitvendorComponent},
        {path: 'addUser', component: AddUserComponent},
        {path : 'vendorForm/:id/:update', component :VendorFormComponent},
        {path: 'vendorList', component:VendorListComponent},
        {path: 'vendorDetails/:id', component: VendorDetailsComponent},
        {path: 'list/:type/:level', component: ListCoComponent},
        {path: 'history', component: HistoryComponent},
        {path: 'companyContact/:identifier/:update', component: CompanyContactComponent},
        {path: 'companyDetails/:identifier/:update', component: CompanyDetailsComponent},
        {path: 'others/:identifier/:update', component: OthersComponent},
        {path: 'contact/:identifier/:update', component: ContactComponent},
        {path: 'files/:identifier/:update', component: FilesComponent},

        
        {path: 'userList', component : UserlistComponent},
      ] },
    ],  {useHash : true})
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
