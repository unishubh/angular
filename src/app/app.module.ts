import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { StarterComponent } from './starter/starter.component';
import { StarterHeaderComponent } from './starter/starter-header/starter-header.component';
import { StarterLeftSideComponent } from './starter/starter-left-side/starter-left-side.component';
import { StarterContentComponent } from './starter/starter-content/starter-content.component';
import { StarterFooterComponent } from './starter/starter-footer/starter-footer.component';
import { StarterControlSidebarComponent } from './starter/starter-control-sidebar/starter-control-sidebar.component';
import { CheckGuard} from './_guards/check.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminLeftSideComponent } from './admin/admin-left-side/admin-left-side.component';
import { AdminContentComponent } from './admin/admin-content/admin-content.component';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
import { AdminControlSidebarComponent } from './admin/admin-control-sidebar/admin-control-sidebar.component';
import { AdminDashboard1Component } from './admin/admin-dashboard1/admin-dashboard1.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { InitvendorComponent } from './initvendor/initvendor.component';
import { AddUserComponent } from './add-user/add-user.component';

import {LoginService} from './services/login.service';
import { VendorFormComponent } from './views/vendor-form/vendor-form.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { VendorDetailsComponent } from './views/vendor-details/vendor-details.component';
import {InhousevendorsComponent} from './views/inhousevendors/inhousevendors.component';
import { ListCoComponent } from './views/list-co/list-co.component';
import { HistoryComponent } from './views/history/history.component';
import { FormChecksService } from './services/form-checks.service';
import { FormComponent } from './views/form/form.component';
import { UserlistComponent } from './views/userlist/userlist.component';
import { CompanyContactComponent } from './views/forms/company-contact/company-contact.component';
import { FormDataService } from './services/form-data.service';
import { CompanyDetailsComponent } from './views/forms/company-details/company-details.component';
import { ContactComponent } from './views/forms/contact/contact.component';
import { OthersComponent } from './views/forms/others/others.component';
import { FilesComponent } from './views/forms/files/files.component';
import { BranchComponent } from './views/forms/branch/branch.component';


@NgModule({
  declarations: [
    AppComponent,
    StarterComponent,
    StarterHeaderComponent,
    StarterLeftSideComponent,
    StarterContentComponent,
    StarterFooterComponent,
    StarterControlSidebarComponent,
    LoginComponentComponent,
    InitvendorComponent,
    AddUserComponent,
    VendorFormComponent,
    VendorListComponent,
    VendorDetailsComponent,
    InhousevendorsComponent,
    ListCoComponent,
    HistoryComponent,
    FormComponent,
    UserlistComponent,
    CompanyContactComponent,
    CompanyDetailsComponent,
    ContactComponent,
    OthersComponent,
    FilesComponent,
    BranchComponent,
   
  
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    ReactiveFormsModule
  ],
  providers: [ 
    CheckGuard,
    LoginService,
    FormChecksService,
    FormDataService,
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
