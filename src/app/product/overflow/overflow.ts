import { Value } from '../../interfaces/Value';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import data from './overflow.json'
@Component({
  selector: 'app-chart',
  template: '<svg width="600" height="250"></svg>',
  styleUrls: ['./overflow.css']
})
export class ChartComponent implements OnInit {
  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number= 960;
  private height: number= 500;
  private g: any;
  private parseDate: any;
  private color: any;
  private x: any;
  private y: any;
  private z: any;
  private area: any;


  constructor() { }
  ngOnInit(): void {
    const svg = d3.select("svg");
    this.width = +svg.attr("width") - this.margin.left - this.margin.right;
    this.height = +svg.attr("height") - this.margin.top - this.margin.bottom;
    this.g = svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    svg.attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);


    this.parseDate = d3.timeParse("%Y/%m/%d %H:%M");
  
    this.color = d3.scaleOrdinal()
      .domain(["PVkW", "TBLkW"])
      .range(["rgba(249, 208, 87, 0.7)", "rgba(54, 174, 175, 0.65)"]);
  
    this.x = d3.scaleTime().range([0, this.width]);
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.z = this.color;

    
    this.area = d3.area()
      .curve(d3.curveMonotoneX)
      .x((d: any) => this.x(d.date))
      .y0(this.y(0))
      .y1((d: any) => this.y(d.kW));
  
    const manualData = data;
  
    const columns = Object.keys(manualData[0]).filter(key => key !== "date");
  
    const sources = columns.map((id) => ({
      id,
      values: manualData.map((d) => ({ date: this.parseDate(d.date), kW: d[id as keyof typeof d] }))
    }));
  
    this.x.domain(d3.extent(manualData, (d: any) => this.parseDate(d.date)));
    this.y.domain([
      0,
      d3.max(sources, (c: any) => d3.max(c.values, (d: any) => d.kW))
    ]);
    this.z.domain(columns);
  
    this.g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.x));
  
    this.g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(this.y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Power, kW");
  
    const source = this.g.selectAll(".area")
      .data(sources)
      .enter().append("g")
      .attr("class", (d: any) => `area ${d.id}`);
  
    source.append("path")
      .attr("d", (d: any) => this.area(d.values))
      .style("fill", (d: any) => this.z(d.id));
  }
  private type(d: any, _: any, columns: any[]): any {
    d.date = this.parseDate(d.date);
    for (let i = 1, n = columns.length, c; i < n; ++i) {
      d[c = columns[i]] = +d[c];
    }
    return d;
  }
}

