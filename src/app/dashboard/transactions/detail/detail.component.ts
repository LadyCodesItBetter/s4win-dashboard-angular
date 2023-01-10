import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../shared/services/storage.service';
import {environment} from '../../../../environments/environment';
declare var $: any;
@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  selectedTransaction: any;
  detailColumns = ['attributeLabel', 'attributeCode'];
  detailTableData: any[] = [];
  polygonTransactionDetailHTML = '';
  tabUrl = null;


  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {
    this.selectedTransaction = this.router.getCurrentNavigation().extras.state;

    const backUrl = this.localStorageService.getItem('backUrl');
    if (!this.selectedTransaction) {
      if (!backUrl) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate([backUrl]);
      }
    } else {
      this.detailTableData =  this.formatData(this.selectedTransaction.attributes);
      this.tabUrl = `${environment.polygonUrl}${this.selectedTransaction.blockchainHash}`;
    }
  }

  ngOnInit(): void {
    if (this.tabUrl) this.scrapePolygonLink(this.tabUrl);
  }

  formatData(data) {
    data.push({
      attributeCode: this.selectedTransaction.tagSerialNumber,
      attributeDescription: this.selectedTransaction.tagSerialNumber,
      attributeLabel: 'Tag Serial Number',
    });

    return data.map(item => ({
      data: {
        ...item,
      },
    }));
  }

  back() {
    const backUrl = this.localStorageService.getItem('backUrl');
    this.router.navigate([backUrl]);
  }

  scrapePolygonLink(polygonUrl) {
    const self = this;
    $.get(polygonUrl, function (dirtyData) {
      const data = dirtyData.replace(/(\r\n|\n|\r)/gm, '');
      const response = $($.parseHTML(data)).find('#home');
      // Open collapsed information
      response.find('#ContentPlaceHolder1_collapseContent').addClass('show');
      // Remove button used for toggle other information
      response.find('#ContentPlaceHolder1_collapsedLink_span').remove();
      // Remove ugly line above the button used to toggle more info
      response.find('#ContentPlaceHolder1_privatenotediv > hr').remove();

      response.find('.fal').remove();
      response.find('.fa-copy, .fa-search-plus').remove();
      response.find('a.mr-1').remove();

      response.find('img[src$=\'/images/svg/shapes/shape-1.svg?v=0.01\']')
        .attr('src', '/assets/images/svg/shape-1.svg');

      const inputData = response.find('#rawinput')[0].innerHTML;
      response.find('#rawtab')[0].innerHTML = self.hex_to_ascii(inputData);

      $(response.find('#rawtab')[0]).addClass('breakWords');
      response.find('#decodetab').remove();

      response.find('#ContentPlaceHolder1_privatenotediv').remove();
      response.find('div#ContentPlaceHolder1_collapseContent.collapse.show').children()[13].remove();

      const wrongNodes = response.find('a');
      for (let i = 0; i < wrongNodes.length; i++) {
        const el = wrongNodes[i];
        const elContent = el.innerHTML;
        const theParagraph = document.createElement('span');
        theParagraph.innerHTML = elContent;
        el.insertAdjacentElement('beforebegin', theParagraph);
        el.remove();

      }
      // Append result to body
      self.polygonTransactionDetailHTML = response.html();
    })
      .fail(function() {
        self.polygonTransactionDetailHTML = '<div class="gray-text m-5"> No data found!</div>';
      });
  }

  hex_to_ascii(hex_text) {
    const hex  = hex_text.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }
}
