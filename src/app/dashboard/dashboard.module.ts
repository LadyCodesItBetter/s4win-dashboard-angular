import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule,
  NbMenuModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbToggleModule,
  NbTreeGridModule,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { ChartsComponent } from './charts/charts.component';
import { BikesComponent } from './transactions/bikes/bikes.component';
import { FramesComponent } from './transactions/frames/frames.component';
import { NftsComponent } from './transactions/nfts/nfts.component';
import {BarComponent} from '../shared/components/charts/bar/bar.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {TransactionService} from '../shared/services/transaction.service';
import {NftService} from '../shared/services/nft.service';
import {GridComponent} from '../shared/components/tables/grid/grid.component';
import {PieComponent} from '../shared/components/charts/pie/pie.component';
import {FormsModule} from '@angular/forms';
import {DateFilterComponent} from '../shared/components/filter/date-filter/date-filter.component';
import {BarGroupedComponent} from '../shared/components/charts/bar-grouped/bar-grouped.component';
import {SettingsComponent} from './settings/settings.component';
import {SmartTableComponent} from '../shared/components/tables/smart-table/smart-table.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {GaugeComponent} from '../shared/components/charts/gauge/gauge.component';
import { DetailComponent } from './transactions/detail/detail.component';

@NgModule({
  imports: [
    NbMenuModule,
    DashboardRoutingModule,
    ThemeModule,
    NbCardModule,
    NgxChartsModule,
    NbTreeGridModule,
    NbButtonModule,
    NbActionsModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbToggleModule,
    FormsModule,
    Ng2SmartTableModule,
    NbTabsetModule,
  ],
  declarations: [
    DashboardComponent,
    HomeComponent,
    ChartsComponent,
    BikesComponent,
    FramesComponent,
    NftsComponent,
    SettingsComponent,

    BarComponent,
    BarGroupedComponent,
    GridComponent,
    PieComponent,
    DateFilterComponent,
    SmartTableComponent,
    GaugeComponent,
    DetailComponent,
  ],
  providers: [
    TransactionService,
    NftService,
  ],
})
export class DashboardModule {
}
