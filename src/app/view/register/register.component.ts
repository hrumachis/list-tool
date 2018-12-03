import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Utils from '../../scripts/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    username: string = "";
    password: string = "";
    password2: string = "";
	port: string = "";
	showInfo: Number;
    infoText: string = "";
    errorText: Array<string> = [];
    success: boolean = false;
    posts: any;
    busy: boolean = false;

    constructor(private Auth: AuthService, private router: Router) { }

    ngOnInit() {
    }

    submit(e) {
        let self = this;

        if (!this.busy) {
            this.busy = true;
            
            this.Auth.register(this.username, this.password, this.password2, this.port).subscribe(data => {
                let result = JSON.parse(data);
                console.log(result);
    
                if (result.success) {
                    localStorage.setItem('user', JSON.stringify({
                        username: self.username,
                        password: self.password,
                        port: self.port,
                        time: Utils.getTime()
                    }));

                    self.success = true;
                    self.errorText = [];

                    setTimeout(function() {
                        self.busy = false;
                        self.Auth.setLoggedIn(true);
                        self.router.navigate(['']);
                    }, 2000);
                    console.log("hey");
                } else {
                    self.errorText = result.messages;
                    self.success = false;
                    self.busy = false;
                }
            }, error => {
                self.errorText = ["Can't connect to server"];
                self.busy = false;
            });
        }
    }

	inputUsername(e) {
		this.showInfo = 0;

		if (e.key != "Backspace" && e.key != "Enter") {
			if (!e.key.match(/^[A-Za-z]+$/)) {
				this.infoMessage("Username contain only letters", 1, e);
			} else if (this.username.length >= 20 && !this.isAllTextSelected(this.username)) {
				this.infoMessage("Username maximum length is 20 letters", 1, e);
			}
		}
	}

	inputPassword(e) {
		this.showInfo = 0;

		if (e.key != "Backspace" && e.key != "Enter") {
			if (this.password.length >= 20 && !this.isAllTextSelected(this.password)) {
				this.infoMessage("Password maximum length is 20 symbols", 2, e);
			}
		}
    }
    
    inputPassword2(e) {
		this.showInfo = 0;

		if (e.key != "Backspace" && e.key != "Enter") {
			if (this.password2.length >= 20 && !this.isAllTextSelected(this.password2)) {
				this.infoMessage("Password maximum length is 20 symbols", 3, e);
			}
		}
	}

	inputPort(e) {
        this.showInfo = 0;

		if (e.key != "Backspace" && e.key != "Enter") {
			if (!e.key.match(/^[0-9]+$/)) {
				this.infoMessage("Port contain only numbers", 4, e);
			} else if (this.port.length >= 5 && !this.isAllTextSelected(this.port)) {
				this.infoMessage("Port maximum length is 5 numbers", 4, e);
			}
		}
    }

    isAllTextSelected(text) {
        return text == window.getSelection().toString();
    }
    
	exitFocus() {
		console.log("exit focus");
		this.showInfo = 0;
	}

	private infoMessage(text, which, e) {
		this.showInfo = which;
		this.infoText = text;
		e.preventDefault();
	}
}
