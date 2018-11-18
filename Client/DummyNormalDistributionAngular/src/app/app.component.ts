import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { NormalService } from './shared/services/normal/normal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  val: number;
  dataCollection: Array<{ values: number[] }> = [];
  data = [{
    iteration: 1,
    value: 0.0539909665131881
  },
  {
    iteration: 2,
    value: 0.0656158147746766
  },
  {
    iteration: 3,
    value: 0.0789501583008941
  },
  {
    iteration: 4,
    value: 0.0940490773768869
  },
  {
    iteration: 5,
    value: 0.110920834679456
  },
  {
    iteration: 6,
    value: 0.129517595665892
  },
  {
    iteration: 7,
    value: 0.149727465635745
  },
  {
    iteration: 8,
    value: 0.171368592047807
  },
  {
    iteration: 9,
    value: 0.194186054983213
  },
  {
    iteration: 10,
    value: 0.217852177032551
  },
  {
    iteration: 11,
    value: 0.241970724519143
  },
  {
    iteration: 12,
    value: 0.266085249898755
  },
  {
    iteration: 13,
    value: 0.289691552761483
  },
  {
    iteration: 14,
    value: 0.312253933366761
  },
  {
    iteration: 15,
    value: 0.3332246028918
  },
  {
    iteration: 16,
    value: 0.3520653267643
  },
  {
    iteration: 17,
    value: 0.368270140303323
  },
  {
    iteration: 18,
    value: 0.381387815460524
  },
  {
    iteration: 19,
    value: 0.391042693975456
  },
  {
    iteration: 20,
    value: 0.396952547477012
  },
  {
    iteration: 21,
    value: 0.398942280401433
  },
  {
    iteration: 22,
    value: 0.396952547477012
  },
  {
    iteration: 23,
    value: 0.391042693975456
  },
  {
    iteration: 24,
    value: 0.381387815460524
  },
  {
    iteration: 25,
    value: 0.368270140303323
  },
  {
    iteration: 26,
    value: 0.3520653267643
  },
  {
    iteration: 27,
    value: 0.3332246028918
  },
  {
    iteration: 28,
    value: 0.312253933366761
  },
  {
    iteration: 29,
    value: 0.289691552761483
  },
  {
    iteration: 30,
    value: 0.266085249898755
  },
  {
    iteration: 31,
    value: 0.241970724519143
  },
  {
    iteration: 32,
    value: 0.217852177032551
  },
  {
    iteration: 33,
    value: 0.194186054983213
  },
  {
    iteration: 34,
    value: 0.171368592047807
  },
  {
    iteration: 35,
    value: 0.149727465635745
  },
  {
    iteration: 36,
    value: 0.129517595665892
  },
  {
    iteration: 37,
    value: 0.110920834679456
  },
  {
    iteration: 38,
    value: 0.0940490773768869
  },
  {
    iteration: 39,
    value: 0.0789501583008941
  },
  {
    iteration: 40,
    value: 0.0656158147746766
  },
  {
    iteration: 41,
    value: 0.0539909665131881
  }
  ];
  interval;

  constructor(private normalService: NormalService) { }

  ngOnInit(): void {
    // this.draw(this.data);
  }

  start() {
    this.startPolling();
  }

  startPolling() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    let counter = 0;
    this.interval = setInterval(() => {
      // do your thing
      const subc = this.normalService.getNormals().subscribe(result => {
        console.log(result);
        this.addCollection(result);
        this.drawFromCollection();
        subc.unsubscribe();
      }, error => {
        console.error(error);
        subc.unsubscribe();
      });

      counter++;
      if (counter === 10) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  addCollection(values: number[]) {
    this.dataCollection.push({ values: values });
  }

  onNormalSelected(normal, index) {
    this.normalService.restart(normal).subscribe(data => {

    });
    console.log(normal, index);
  }

  drawFromCollection() {
    const data = this.dataCollection
      .map((d, i) => ({ iteration: i, value: d.values[0] }));
    this.draw(data);
  }

  draw(data: Array<{ iteration: number, value: number }>) {
    console.log(data);
    const margin = {
      top: 10,
      right: 10,
      bottom: 20,
      left: 25
    };
    const width = 550 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    // set the ranges
    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    // define the line
    const valueline = d3.line()
      .x(function (d: any) {
        return x(d.iteration);
      })
      .y(function (d: any) {
        return y(d.value);
      });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3.select('svg')
      .attr('width', (width + margin.left + margin.right) + '%')
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')');

    // format the data
    data.forEach(function (d) {
      d.iteration = +d.iteration;
      d.value = +d.value;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function (d) {
      return d.iteration;
    }));
    y.domain([0, d3.max(data, function (d) {
      return d.value;
    })]);

    // Add the valueline path.
    svg.append('path')
      .data([data])
      .attr('class', 'line')
      .attr('d', <any>valueline)
      .style('stroke', (d, i) => color(i.toString()))
      .style('fill', 'none')
      .style('stroke-width', '2px');


    // Add the X Axis
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append('g')
      .call(d3.axisLeft(y));


  }
}
