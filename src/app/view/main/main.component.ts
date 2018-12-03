import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    modal: boolean = false;
	busy: boolean = true;
    list: Array<any> = [];
    currentIndex: number
    currentId: string;
    busyModal: boolean = false;
    busyLogout: boolean = false;
    gridView: boolean = false;

    constructor(private Auth: AuthService, private Database: DataService, private router: Router) { }

    ngOnInit() {
        let self = this;
        this.gridView = localStorage.getItem("grid-view") == 'true';

		document.getElementById("create-button").onclick = function() {
			self.put(this);
        };
        
        document.getElementById("logout-button").onclick = function() {
			self.logout(this);
		};

		this.Database.getData().subscribe((data) => {
			console.log(data);
			self.list = JSON.parse(data);
			self.busy = false;
		});
    }
    
    toggleView() {
        this.gridView = !this.gridView;
        localStorage.setItem("grid-view", String(this.gridView));
    }

    logout(elm) {
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

	put(elm) {
        let self = this;

		elm.setAttribute("busy", "true");
		this.Database.postData().subscribe((data) => {
			setTimeout(() => {
				self.list.push(data);
				elm.removeAttribute("busy");
				console.log(data);
			}, 600);
		});
    }
    
    openModal(id, index) {
        this.modal = true;
        this.currentId = id;
        this.currentIndex = index;
    }

    closeModal() {
        this.modal = false;
    }

	delete() {
        if (!this.busyModal) {
            let self = this;
            this.busyModal = true;
            
            this.Database.deleteData(this.currentId).subscribe((data) => {
                console.log(data);
                setTimeout(() => {
                    self.closeModal();
                    self.list.splice(self.currentIndex, 1);
                    self.busyModal = false;
                }, 600);
            });
        }
    }
}
