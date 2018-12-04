import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	// Authentication server ur
	readonly ROOT_URL = 'https://hrumachi.herokuapp.com';
	private loggedInState = false;

	constructor(private http: HttpClient) { }

	setLoggedIn(value: boolean) {
		this.loggedInState = value;
	}

	get isLoggedIn() {
		return this.loggedInState;
	}

	logout () {
		localStorage.removeItem("user");
		this.loggedInState = false;
	}
	
	login (username, password, port) {
		let params = new HttpParams().set('username', username)
			.set('password', password)
			.set('port', port);

		return this.http.get(this.ROOT_URL + "/login", { params, responseType: 'text' });
	}
	
	online() {
		return this.loggedInState;
	}
    
    register (username, password, password2, port) {
		let params = new HttpParams().set('username', username)
            .set('password', password)
            .set('password2', password2)
			.set('port', port);

		return this.http.get(this.ROOT_URL + "/register", { params, responseType: 'text' });
	}
}
