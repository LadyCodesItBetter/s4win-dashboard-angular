import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 'ngx-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})
export class PieComponent implements OnDestroy {
  @Input('option') chartOption: any = [];
  @Input('data') data: any[] = [];
  @Input('explodeSlices') explodeSlices: boolean = false;
  @Input('showLabels') showLabels: boolean = true;
  @Input('doughnut') doughnut: boolean = false;
  @Input('arcWidth') arcWidth: number = undefined;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }

  showLegend = false;
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'Country';
  yAxisLabel = 'Population';
  colorScheme: any;
  themeSubscription: any;


  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}
