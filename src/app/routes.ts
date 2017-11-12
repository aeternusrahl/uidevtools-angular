import {Route} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { EpochTimeComponent } from './epoch-time/epoch-time.component';
import { Base64Component } from './base64/base64.component';
import { URLEncodeComponent } from './urlencode/urlencode.component';

export const AppRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'epoch-time',
    component: EpochTimeComponent
  },
  {
    path: 'base64',
    component: Base64Component
  },
  {
    path: 'uri',
    component: URLEncodeComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
