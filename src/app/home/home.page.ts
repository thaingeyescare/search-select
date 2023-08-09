import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public users: any[] = [];
  public pureUsers: any[] = [];
  public isLoading: boolean = false;
  public initialSelected: any[] = [];
  public initialSelectedCheckboxes: any[] = [];

  constructor() {
    this.pureUsers = [
      {
        id: 1,
        username: 'goldenkoala410',
      },
      {
        id: 2,
        username: 'smallbird985',
      },
      {
        id: 3,
        username: 'brownfish540',
      },
      {
        id: 4,
        username: 'bigelephant503',
      },
      {
        id: 5,
        username: 'beautifulkoala361',
      },
      {
        id: 6,
        username: 'silverelephant404',
      },
      {
        id: 7,
        username: 'goldenelephant510',
      },
      {
        id: 8,
        username: 'silvergorilla196',
      },
      {
        id: 9,
        username: 'biggorilla322',
      },
      {
        id: 10,
        username: 'redbear614',
      },
      {
        id: 11,
        username: 'yellowduck640',
      },
      {
        id: 12,
        username: 'tinybird877',
      },
      {
        id: 13,
        username: 'yellowwolf551',
      },
      {
        id: 14,
        username: 'tinypanda172',
      },
      {
        id: 15,
        username: 'lazysnake906',
      },
      {
        id: 16,
        username: 'beautifulbutterfly981',
      },
      {
        id: 17,
        username: 'purpleostrich818',
      },
      {
        id: 18,
        username: 'ticklishswan854',
      },
      {
        id: 19,
        username: 'beautifuldog542',
      },
      {
        id: 20,
        username: 'smallleopard952',
      },
      {
        id: 21,
        username: 'bluegorilla445',
      },
      {
        id: 22,
        username: 'tinyfish204',
      },
      {
        id: 23,
        username: 'organicrabbit832',
      },
      {
        id: 24,
        username: 'ticklishbird503',
      },
      {
        id: 25,
        username: 'heavypeacock986',
      },
      {
        id: 26,
        username: 'beautifulduck156',
      },
      {
        id: 27,
        username: 'blackduck663',
      },
      {
        id: 28,
        username: 'purplefish635',
      },
      {
        id: 29,
        username: 'silverlion762',
      },
      {
        id: 30,
        username: 'blackbear100',
      },
      {
        id: 31,
        username: 'smallswan192',
      },
      {
        id: 32,
        username: 'silvermouse222',
      },
      {
        id: 33,
        username: 'heavygorilla341',
      },
      {
        id: 34,
        username: 'organicduck267',
      },
      {
        id: 35,
        username: 'purplepanda581',
      },
      {
        id: 36,
        username: 'brownbear342',
      },
      {
        id: 37,
        username: 'redduck278',
      },
      {
        id: 38,
        username: 'smallcat785',
      },
      {
        id: 39,
        username: 'orangeduck243',
      },
      {
        id: 40,
        username: 'yellowpeacock139',
      },
    ];
    this.users = [...this.pureUsers];
    this.initialSelectedCheckboxes = [
      this.pureUsers[5],
      this.pureUsers[8],
      this.pureUsers[10],
    ];
    this.initialSelected = [[...this.pureUsers][5]];
  }

  selectedChanged(event: any) {
    // Submitted data
    console.log('CHANGED: ', event);
  }

  filter(query: string) {
    // Query length is 3 or more characters long, filter
    if (query && query.length > 2) {
      // Query DB and update users
      // but using pureUsers to filter since no DB yet
      this.isLoading = true;
      setTimeout(() => {
        this.users = [...this.pureUsers].filter(
          (item: any) => item.username.toLowerCase().indexOf(query) >= 0
        );
        this.isLoading = false;
      }, 1000);
    } else {
      // Query is less than 3 characters long, reset array
      this.users = [...this.pureUsers];
    }
  }
}
