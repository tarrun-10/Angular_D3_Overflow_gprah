import { Component, Input, OnChanges, SimpleChange } from "@angular/core";
import { ChartComponent } from "./overflow/overflow";
import { Value } from "../interfaces/Value";
import { ButtonComponent } from "@syncfusion/ej2-angular-buttons";

@Component({
    selector : 'product',
    templateUrl : './product.html', 
  styleUrls: ['./product.css' ]
})

export class productComp{
  i =0
  @Input() Value : Value = {} as Value;
  title = 'over';
  // @ViewChild('btn')
  public btn: ButtonComponent| any;
  addClicked: boolean= false;
  Values:Value[] = [{
    inputVal1  : " ",
    inputVal2  : " ",
  }]
    inputVal11 = "  ";
    inputVal22  = " ";
    handle(event : any){
      this.inputVal11= event.target.value;
    }
    handle2(event : any){
      this.inputVal22= event.target.value;
    }
    add(){
      this.addClicked = true;
      // this.Values[0].inputVal1 = this.inputVal11;
      // this.Values[0].inputVal2 = this.inputVal22;
      const newValue: Value = {
        inputVal1: this.inputVal11,
        inputVal2: this.inputVal22,
      };
  
    this.Values.push(newValue);
  
    // this.Values.pop();
    }

}