import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {HomeComponent} from './home/home.component';
import {ChartsComponent} from './charts/charts.component';
import {BikesComponent} from './transactions/bikes/bikes.component';
import {FramesComponent} from './transactions/frames/frames.component';
import {NftsComponent} from './transactions/nfts/nfts.component';
import {SettingsComponent} from './settings/settings.component';
import {DetailComponent} from './transactions/detail/detail.component';
// import {NotFoundComponent} from '../pages/miscellaneous/not-found/not-found.component';


const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    {
      path: '',
      component: HomeComponent,
    },
    {
      path: 'charts',
      component: ChartsComponent,
    },
    {
      path: 'transaction/bikes',
      component: BikesComponent,
    },
    {
      path: 'transaction/bikes/detail',
      component: DetailComponent,
    },
    {
      path: 'transaction/frames',
      component: FramesComponent,
    },
    {
      path: 'transaction/frames/detail',
      component: DetailComponent,
    },
    {
      path: 'transaction/nfts',
      component: NftsComponent,
    },
    {
      path: 'transaction/nfts/detail',
      component: DetailComponent,
    },
    {
      path: 'settings',
      component: SettingsComponent,
    },
    // {
    //   path: '**',
    //   component: NotFoundComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
