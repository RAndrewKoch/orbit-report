import { Component, OnInit, Input } from '@angular/core';
import { Satellite } from '../satellite';

@Component({
  selector: 'app-orbit-counts',
  templateUrl: './orbit-counts.component.html',
  styleUrls: ['./orbit-counts.component.css']
})
export class OrbitCountsComponent implements OnInit {
  @Input() satellites: Satellite[];
  @Input() types;

  constructor() {
  }

  ngOnInit() {
  }



  countType(satellites, type) {
    let count = 0;
    for (let satellite of satellites) {
      if (satellite.type === type) {
        count += 1;
      }
    }
    return count;
  }
}
