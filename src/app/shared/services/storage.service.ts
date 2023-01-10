import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@ Injectable()
export class LocalStorageService {

    constructor(@Inject(PLATFORM_ID) private platformId: any) {

    }

    public setItem(name: string, item: string) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(name, item);
        }
    }

    public getItem(name: string) {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(name);
        }

        return '';
    }

    public removeItem(name: string) {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.removeItem(name);
        }
    }



}
