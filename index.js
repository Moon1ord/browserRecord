const {BrowserWindow, app} = require('electron');
var fs = require('fs');

var record_period = 300; //Intervals between writing data in the file
var record_time = null; //You can specify the time of recording or leave it null
var urlToRecord = 'https://github.com'; //Url to record

let generated_name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); //randomly generated name
let my_file = './behaviours/'+ generated_name + '.txt'; //path to collect files


app.on('ready', () => {
	const {screen} = require ('electron');
	const win = new BrowserWindow({width: 1280, height: 1024, webPreferences : {nodeIntegration: true}});
	
	win.loadURL(urlToRecord).then(async() => {

		var keep_recoring = true;
		
		if(record_time != null){
			setTimeout(function () {
				keep_recoring = false;
			}, record_time);
		}

		setInterval(()=>{
			if(keep_recoring){
				BrowserWindow.
				mouse_position = screen.getCursorScreenPoint();
				fs.appendFile(my_file, '{ x: ' + mouse_position.x + ', y: ' + mouse_position.y + '}\n'  ,function(err){
					if(err) throw err;
				});
			} else{
				win.close();
			}	
		}, record_period)
	});
});
