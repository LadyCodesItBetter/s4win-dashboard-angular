import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';

import { Subject } from 'rxjs';
import {NbAuthResult, NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
  ];

  currentTheme = 'default';

  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authService: NbAuthService,
    private router: Router,
    private readonly userService: UserService,
  ) {
    menuService.onItemClick().subscribe((value) => {
      if (value.item.title.toLowerCase() === 'logout') {
        this.logout();
      }
    });
  }

  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
    const mail = this.user.myLimeUID;
    this.user.name = mail.split('.')[0];
    this.user.surname = mail.split('.')[1].split('@')[0];
    this.user.role = this.user.roles[1];
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logout() {
    this.authService.logout('email')
      .subscribe((result: NbAuthResult) => {
        this.router.navigate(['/auth']);
      });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }
}
