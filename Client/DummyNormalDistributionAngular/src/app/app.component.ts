import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { NormalService } from './shared/services/normal/normal.service';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  statusMessage: string;
  dataCollection: Array<{ values: number[] }> = [];
  interval;
  lineArr = [];
  chart: any;
  normals = [
    {
      mean: 0,
      dev: 1,
      title: 'Standard deviation'
    },
    {
      mean: 0.51,
      dev: 1.5,
      title: 'Something important'
    },
    {
      dev: 0.2,
      mean: 1.1,
      title: 'Very important'
    },
    {
      dev: 0.3,
      mean: 0.9,
      title: 'Is important too'
    },
    {
      dev: 0.5,
      mean: 1.2,
      title: 'And this one'
    }
  ];

  constructor(private normalService: NormalService) { }

  ngOnInit() {
    this.chart = this.realTimeLineChart();
    // this.start();
  }

  start() {
    if (!this.interval) {
      this.startPolling();
    }
    this.normalService.start(this.normals).subscribe(response => {
      if (response.ok) {
        this.startPolling();
      }
    }, error => {
      console.log(error);
      this.restart();
    });
  }

  restart() {
    this.normalService.restart(this.normals).subscribe(console.log);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.normalService.stop().subscribe(response => {
      console.log(response);
    });
  }

  onNormalSelected(normal, index) {
    this.normals = this.normals.map((e, i) => {
      if (i === index) {
        normal.title = e.title;
        return normal;
      }
      return e;
    });
    this.normalService.restart(normal).subscribe(data => {

    });
    console.log(this.normals, normal, index);
  }

  private startPolling() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    window.setInterval(this.draw.bind(this), 1000);
  }

  private draw() {
    const subc = this.normalService.getNormals().subscribe(result => {
      const now = new Date();
      const lineData = {
        time: now,
        a: result[0],
        b: result[1],
        c: result[2],
        d: result[3],
        e: result[4]
      };

      this.lineArr.push(lineData);

      if (this.lineArr.length > 100) {
        this.lineArr.shift();
      }

      d3.select('#chart').datum(this.lineArr).call(this.chart);
      subc.unsubscribe();

    }, error => {
      console.error(error);
      subc.unsubscribe();
    });

  }

  private realTimeLineChart() {
    let margin = { top: 20, right: 20, bottom: 20, left: 20 },
      width = 500,
      height = 400,
      duration = 500,
      color = d3.schemeCategory10;

    function chart(selection): any {
      // Based on https://bl.ocks.org/mbostock/3884955
      selection.each(function (data) {
        data = ['a', 'b', 'c', 'd', 'e']
          .map(function (c) {
            return {
              label: c,
              values: data.map(function (d) {
                return { time: +d.time, value: d[c] };
              })
            };
          });

        const t = d3.transition().duration(duration).ease(d3.easeLinear),
          x = d3.scaleTime().rangeRound([0, width - margin.left - margin.right]),
          y = d3.scaleLinear().rangeRound([height - margin.top - margin.bottom, 0]),
          z = d3.scaleOrdinal(color);

        const xMin = +d3.min(data, (c: any) => d3.min(c.values, (d: any) => d.time));
        const xMax = new Date(new Date(d3.max(data, (c: any) => {
          return d3.max(c.values, (d: any) => d.time);
        })).getTime() - (duration * 2));

        x.domain([xMin, xMax]);
        y.domain([
          +d3.min(data, (c: any) => d3.min(c.values, (d: any) => d.value)),
          +d3.max(data, function (c: any) { return d3.max(c.values, function (d: any) { return d.value; }); })
        ]);
        z.domain(data.map(function (c) { return c.label; }));

        const line = d3.line()
          .curve(d3.curveBasis)
          .x(function (d: any) { return x(d.time); })
          .y(function (d: any) { return y(d.value); });

        const _svg = d3.select(this).selectAll('svg').data([data]);
        const gEnter = _svg.enter().append('svg').append('g');
        gEnter.append('g').attr('class', 'axis x');
        gEnter.append('g').attr('class', 'axis y');
        gEnter.append('defs').append('clipPath')
          .attr('id', 'clip')
          .append('rect')
          .attr('width', width - margin.left - margin.right)
          .attr('height', height - margin.top - margin.bottom);
        gEnter.append('g')
          .attr('class', 'lines')
          .attr('clip-path', 'url(#clip)')
          .selectAll('.data').data(data).enter()
          .append('path')
          .attr('class', 'data');

        const legendEnter = gEnter.append('g')
          .attr('class', 'legend')
          .attr('transform', 'translate(' + (width - margin.right - margin.left - 75) + ',25)');
        legendEnter.append('rect')
          .attr('width', 50)
          .attr('height', 75)
          .attr('fill', '#ffffff')
          .attr('fill-opacity', 0.7);
        legendEnter.selectAll('text')
          .data(data).enter()
          .append('text')
          .attr('y', function (d, i) { return (i * 20) + 25; })
          .attr('x', 5)
          .attr('fill', function (d: any) { return z(d.label); });

        const svg = selection.select('svg');
        svg.attr('width', width).attr('height', height);
        const g = svg.select('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        g.select('g.axis.x')
          .attr('transform', 'translate(0,' + (height - margin.bottom - margin.top) + ')')
          .transition(t)
          .call(d3.axisBottom(x).ticks(5));
        g.select('g.axis.y')
          .transition(t)
          .attr('class', 'axis y')
          .call(d3.axisLeft(y));

        g.select('defs clipPath rect')
          .transition(t)
          .attr('width', width - margin.left - margin.right)
          .attr('height', height - margin.top - margin.right);

        g.selectAll('g path.data')
          .data(data)
          .style('stroke', function (d) { return z(d.label); })
          .style('stroke-width', 1)
          .style('fill', 'none')
          .transition()
          .duration(duration)
          .ease(d3.easeLinear)
          .on('start', tick);

        g.selectAll('g .legend text')
          .data(data)
          .text(function (d) {
            return d.label.toUpperCase() + ': ' + d.values[d.values.length - 1].value;
          });

        // For transitions https://bl.ocks.org/mbostock/1642874
        function tick() {
          d3.select(this)
            .attr('d', function (d: any) { return line(d.values); })
            .attr('transform', null);

          const xMinLess = new Date(new Date(xMin).getTime() - duration);
          d3.active(this)
            .attr('transform', 'translate(' + x(xMinLess) + ',0)')
            .transition()
            .on('start', tick);
        }
      });
    }

    chart['margin'] = function (_: any) {
      if (!arguments.length) { return margin; }
      margin = _;
      return chart;
    };

    chart['width'] = function (_) {
      if (!arguments.length) { return width; }
      width = _;
      return chart;
    };

    chart['height'] = function (_) {
      if (!arguments.length) { return height; }
      height = _;
      return chart;
    };

    chart['color'] = function (_) {
      if (!arguments.length) { return color; }
      color = _;
      return chart;
    };

    chart['duration'] = function (_) {
      if (!arguments.length) { return duration; }
      duration = _;
      return chart;
    };

    return chart;
  }
}
