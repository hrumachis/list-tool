# Application
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

* Live demo version can be found here [Demo](https://listtool.herokuapp.com)<br/>
* REST API for static data [JSONServer](https://staticdata.herokuapp.com)<br/>
    GitHub: https://github.com/hrumachis/json-server

## Running localy
Inside "myApp" directory run `ng serve` for a dev server.<br/>
Navigate to `http://localhost:4200/`.

## Running remotly (Heroku)
Inside master directory open command prompt <br /><br />
Install heroku `npm install -g heroku`<br/>
Login into heroku account `heroku login`<br/>
If successfully loged in create new heroku application  `heroku create newappname`<br/><br />
Deploy myApp to heroku<br/>
`git init`<br/>
`heroku git:remote -a newappname`<br/>
`git add .`<br/>
`git commit -m "first deploy"`<br/>
`git push heroku master`<br/>
<br/>
Now after the work is committed, we just need to run:<br/>
`npm run deploy`<br/>

## Build
Run `ng build` to build the project.<br/>
The build artifacts will be stored in the `dist/` directory.<br/>
Use the `--prod` flag for a production build.