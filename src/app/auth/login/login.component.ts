import { Component, OnInit } from '@angular/core';
import { login } from 'src/app/interfaces/Login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:login = {
    email : "",
    password :  ""
  }

  constructor(){}
  ngOnInit(): void {
    
  }
  submit(){
    alert(this.form);
  }
}
