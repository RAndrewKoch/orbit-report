import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';
  sourceList: Satellite[];
  displayList: Satellite[];
  typesList: string[] = ['Space Debris', 'Communication', 'Probe', 'Positioning', 'Space Station', 'Telescope'];

  constructor() {
    this.displayList = [];
    this.sourceList = [];

    const satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

    window.fetch(satellitesUrl).then(function(response) {
      response.json().then(function(data) {
        const fetchedSatellites = data.satellites;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < fetchedSatellites.length; i++) {
          // tslint:disable-next-line: prefer-const
          // tslint:disable-next-line: max-line-length
          let satellite: Satellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
          this.sourceList.push(satellite);
          }
        this.displayList = this.sourceList.slice(0);
      }.bind(this));
    }.bind(this));
  }

  search(searchTerm: string): void {
    // tslint:disable-next-line: prefer-const
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.sourceList.length; i++) {
       // tslint:disable-next-line: prefer-const
       let name = this.sourceList[i].name.toLowerCase();
       let type = this.sourceList[i].type.toLowerCase();
       let orbitType = this.sourceList[i].orbitType.toLowerCase();
       if (name.indexOf(searchTerm) >= 0 || type.indexOf(searchTerm) >= 0 || orbitType.indexOf(searchTerm) >= 0) {
          matchingSatellites.push(this.sourceList[i]);
       }
    }
    // assign this.displayList to be the the array of matching satellites
    // this will cause Angular to re-make the table, but now only containing matches
    this.displayList = matchingSatellites;
 }
}
