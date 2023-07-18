
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component, AfterViewInit, ElementRef, Input, ViewChild, HostListener } from '@angular/core';
import * as d3 from 'd3';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

interface DataPoint {
  x: number;
  y: number;
}

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})
export class KpiComponent implements AfterViewInit {
  @ViewChild('container') container: any;
  @ViewChild('svg') svg: any;
  @Input() data: any[] = [
    { x: new Date('2023-07-01'), y: 0.8 },
    { x: new Date('2023-07-02'), y: 0.7 },
    { x: new Date('2023-07-03'), y: 0.9 },
    { x: new Date('2023-07-04'), y: 0.6 },
    { x: new Date('2023-07-05'), y: 0.75 }];
  @Input() title: string = 'Accuracy';
  @Input() xLabel: string = 'Date';
  @Input() x: string = 'x';
  @Input() y: string = 'y';
  @Input() description: string = '';
  faInfoCircle = faInfoCircle;
  dateFormat = d3.timeFormat('%Y-%m-%d');
  value: any = {};
  baseline: number = 0.5;
  upperLimit: number = 0.5;
  lowerLimit: number = 0.5;
  trend: string = 'flat';
  lastDate: string = '';
  // timestamp:string = '';
  trendData: DataPoint[] = [];

  constructor(private elementRef: ElementRef) { }
  ngOnInit(): void {
    
    
    this.trendData = this.data.map(d => ({ x: d[this.x], y: d[this.y] }));

    if (this.trendData.length > 1) {
      this.value = this.trendData[this.trendData.length - 1];
      this.baseline = this.trendData[0].y;
      this.trend = this.value.y > this.baseline ? 'up' : this.value.y < this.baseline ? 'down' : 'flat';
    }


  }
 

  @HostListener('window:resize', ['$event'])
  ngAfterViewInit(): void {
    if (!this.svg)
      return;

    const svg = d3.select(this.svg.nativeElement);
    svg.selectAll('*').remove();
    const container = this.container.nativeElement.getBoundingClientRect();
    const width = container.width;
    const height = container.height
    svg.attr('width', width).attr('height', height);
    const data: DataPoint[] = this.trendData;
    const margin = { top: 5, right: 5, bottom: 30, left: 30 };

    let xScale: d3.ScaleTime<number, number> | d3.ScaleLinear<number, number>;
    if (this.xLabel === 'Date') {
      xScale = d3.scaleTime()
        .domain(d3.extent(data, (d: DataPoint) => d.x) as [number, number])
        .range([margin.left, width - margin.right]);
    } else {
      xScale = d3.scaleLinear()
        .domain(d3.extent(data, (d: DataPoint) => d.x) as [number, number])
        .range([margin.left, width - margin.right]);

    }
    const yExtent = d3.extent(data, (d: DataPoint) => d.y) as [number, number];
    const yScale = d3.scaleLinear()
      .domain([Math.floor(yExtent[0] * 10000) / 10000, Math.ceil(yExtent[1] * 10000) / 10000])
      .range([height - margin.bottom, margin.top]);
      const xAxis = d3.axisBottom(xScale).ticks(3).tickFormat((d: any) => this.dateFormat(d));
    const yAxis = d3.axisLeft(yScale).ticks(2).tickFormat(d3.format('.1f'));

    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis);

    const line = d3.line<DataPoint>().curve(d3.curveMonotoneX)
      .x((d: DataPoint) => xScale(d.x))
      .y((d: DataPoint) => yScale(d.y))


    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line);
    const baseLine = svg.append('line')
      .attr('class', 'baseline')
      .attr('x1', 25)
      .attr('x2', width)
      .attr('y1', yScale(this.baseline))
      .attr('y2', yScale(this.baseline));
    const upperLimit = svg.append('line')
      .attr('class', 'upper-limit')
      .attr('x1', 25)
      .attr('x2', width)
      .attr('y1', yScale(this.upperLimit))
      .attr('y2', yScale(this.upperLimit));
    const lowerLimit = svg.append('line')
      .attr('class', 'lower-limit')
      .attr('x1', 25)
      .attr('x2', width)
      .attr('y1', yScale(this.lowerLimit))
      .attr('y2', yScale(this.lowerLimit));
    const dots = svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d: DataPoint) => xScale(d.x))
      .attr('cy', (d: DataPoint) => yScale(d.y))
      .attr('r', 4)
      .append('title')
      .text((d: DataPoint) => `${this.xLabel}: ${typeof d.x === 'number' ? d.x : this.dateFormat(d.x as any)}
${this.title}: ${d.y.toFixed(4)}`);
  }
}


