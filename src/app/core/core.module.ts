import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  declarations: [],
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule,
    CommonModule
  ]
})
export class CoreModule { }
