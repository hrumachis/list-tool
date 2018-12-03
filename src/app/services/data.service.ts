import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import Utils from '../scripts/utils';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly ROOT_URL = 'https://staticdata.herokuapp.com';

	constructor(private http: HttpClient) { }
	
	getData () {
		let params = new HttpParams().set('_start', "0")
			.set('_end', "15");

		return this.http.get(this.ROOT_URL + "/list", { params, responseType: 'text'  });
	}

	postData () {
		var item = {
			name: Utils.genName(),
			email: Utils.genName() + "i@gmail.com",
			date: Utils.genDate(),
			comment: "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.",
			allowed: false
		};

		return this.http.post(this.ROOT_URL + "/list", item);
	}

	deleteData (index) {
		return this.http.delete(this.ROOT_URL + "/list/" + index);
	}
}
