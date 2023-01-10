import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  selectedOptionHome: String = 'days';
  selectedOptionOther: String = 'days';
  selectedMaxNumbOfRowHome: number = 10;
  selectedMaxNumbOfRowOther: number = 10;
  defaultDateRangeHome: number = 2;
  defaultDateRangeOther: number = 2;

  user: any;
  disabledButton: boolean = false;

  public constructor(
    private readonly userService: UserService,
    private toastrService: NbToastrService,
  ) {}


  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
    if (this.user && this.user.userSettings) {
      this.selectedMaxNumbOfRowHome = this.user.userSettings.homePage.nRowsPerTable;
      this.defaultDateRangeHome = this.user.userSettings.homePage.defaultDateRange;
      this.selectedOptionHome = this.user.userSettings.homePage.defaultDateRangeUnit;

      this.selectedMaxNumbOfRowOther = this.user.userSettings.allPages.nRowsPerTable;
      this.defaultDateRangeOther = this.user.userSettings.allPages.defaultDateRange;
      this.selectedOptionOther = this.user.userSettings.allPages.defaultDateRangeUnit;
    }
  }

  saveSettings() {
    const body = this.user;
    body.userSettings = {
      homePage: {
        nRowsPerTable: this.selectedMaxNumbOfRowHome,
        defaultDateRange: this.defaultDateRangeHome,
        defaultDateRangeUnit: this.selectedOptionHome.toLowerCase(),
      },
      allPages: {
        nRowsPerTable: this.selectedMaxNumbOfRowOther,
        defaultDateRange: this.defaultDateRangeOther,
        defaultDateRangeUnit: this.selectedOptionOther.toLowerCase(),
      },
    };
    this.disabledButton = true;
    this.userService.saveSettings(body).then((user) => {
      if (user && user.userSettings) {
        this.toastrService.show('success', `Settings correctly saved!`, { status: 'success'});
        this.disabledButton = false;
      } else {
        this.toastrService.show('error', `Something went wrong!`, { status: 'error'});
        this.disabledButton = false;
      }
    });
  }
}
