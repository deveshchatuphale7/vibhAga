import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { SiteRoutingModule } from './site-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

import { SiteComponent } from './site.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { NzImageModule } from 'ng-zorro-antd/image';


@NgModule({
  declarations: [
    SiteComponent,
    CreateComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzLayoutModule,
    NzMenuModule,
    NzGridModule,
NzButtonModule,
NzInputModule,
NzSelectModule,
NzModalModule,
NzIconModule,
NzUploadModule,
NzInputNumberModule,
NzSwitchModule,
NzImageModule

  ]
})
export class SiteModule { }
