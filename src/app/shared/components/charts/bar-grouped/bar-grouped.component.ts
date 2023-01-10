import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 'ngx-bar-grouped',
  templateUrl: './bar-grouped.component.html',
  styleUrls: ['./bar-grouped.component.scss'],
})
export class BarGroupedComponent implements OnDestroy {
  @Input('option') chartOption: any = [];
  @Input('data') data: any[] = [];

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }

  colorScheme: any;
  themeSubscription: any;
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Status';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Quantity';
  legendTitle: string = 'Products';
  view: any[] = [1270, 600];


  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}
