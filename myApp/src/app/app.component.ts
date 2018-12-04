import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  busy: boolean = false;

  constructor(private Auth: AuthService, private Database: DataService, private router: Router) { }

  logout() {
    let self = this;

    if (!this.busy) {
      this.busy = true;

      setTimeout(function() {
          self.busy = false;
          self.Auth.logout();
          self.router.navigate(['login']);
      }, 1000);
    }
  }
}