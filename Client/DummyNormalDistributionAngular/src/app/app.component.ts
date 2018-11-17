import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  val: number;

  ngOnInit(): void {
    let dataset = [
      0.0539909665131881,
      0.0656158147746766,
      0.0789501583008941,
      0.0940490773768869,
      0.110920834679456,
      0.129517595665892,
      0.149727465635745,
      0.171368592047807,
      0.194186054983213,
      0.217852177032551,
      0.241970724519143,
      0.266085249898755,
      0.289691552761483,
      0.312253933366761,
      0.3332246028918,
      0.3520653267643,
      0.368270140303323,
      0.381387815460524,
      0.391042693975456,
      0.396952547477012,
      0.398942280401433,
      0.396952547477012,
      0.391042693975456,
      0.381387815460524,
      0.368270140303323,
      0.3520653267643,
      0.3332246028918,
      0.312253933366761,
      0.289691552761483,
      0.266085249898755,
      0.241970724519143,
      0.217852177032551,
      0.194186054983213,
      0.171368592047807,
      0.149727465635745,
      0.129517595665892,
      0.110920834679456,
      0.0940490773768869,
      0.0789501583008941,
      0.0656158147746766,
      0.0539909665131881
    ];

    dataset = dataset.map(number => number * 350);

    const svgWidth = 500;
    const svgHeight = 300;
    const barPadding = 5;
    const barWidth = (svgWidth / dataset.length);

    const svg = d3.select('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    const chart = svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('y', function (number) {
        return svgHeight - number;
      })
      .attr('height', function (number) {
        return number;
      })
      .attr('width', barWidth - barPadding)
      .attr('transform', function (number, index) {
        console.log(number, index);
        const translate = [barWidth * index, 0];
        return 'translate(' + translate + ')';
      });
  }



  handleChange(e) {

    // console.log(e);
  }

  valueSelected(e) {
    console.log(e);
  }

}
