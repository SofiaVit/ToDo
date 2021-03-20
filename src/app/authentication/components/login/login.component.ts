import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthDetailsModule} from "../../auth-details.module";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {NavigationExtras, Router} from "@angular/router";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authenticationAlertClosed = true;
  authDetails = new AuthDetailsModule();
  @ViewChild('staticAlert', {static: false}) authenticationAlert: NgbAlert;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  authenticateLogin() {
    if(this.authService.isAuthenticated(this.authDetails)) {
      localStorage.setItem('isAuthenticated', "true");
      this.router.navigate(['welcome'], this.createNavigationExtras())
    }
    else{
      this.authenticationAlertClosed = false;
      setTimeout(() => this.authenticationAlert.close(), 10000);
    }
  }

  createNavigationExtras(): NavigationExtras{
    let navigationExtras: NavigationExtras = {
      queryParams: {
        userName: this.authDetails.userName
      }
    }
    return navigationExtras;
  }
}


