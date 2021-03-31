// var requestURL = './../LinearThermalsSys.json';
var request = new XMLHttpRequest();

request.open('GET', './../LinearThermalsSys.json');

request.responseType = 'json';
request.send();

request.onload = function() {
    var JsonFile = request.response;
    document.getElementById("msg1").value = JsonFile.hightemp;
    document.getElementById("msg2").value = JsonFile.highrpm;
}