var weather = {
	"clear sky": "Jasná obloha",
	"few clouds": "Malá oblačnosť",
	"scattered clouds": "Oblačno",
	"broken clouds": "Zamračené",
	"shower rain": "Dážď",
	"rain": "Dážď",
	"thunderstorm": "Búrka",
	"snow": "Sneh",
	"mist": "Hmla"
}

function animateLoad(state, ms) {
	if (state) {
		$('.container.hidden').fadeIn(ms).removeClass('hidden');
	} else {
		$('.container').fadeOut(ms).addClass('hidden');
	}
}

function updateDatum() {
	var datum = new Date()
	var rok = datum.getFullYear();
	var mesiac = datum.getMonth() + 1;
	var den = datum.getDate();
	var hodiny = datum.getHours();
	var minuty = datum.getMinutes();
	var sekundy = datum.getSeconds();
	$(".hodiny").html(( hodiny < 10 ? "0" : "" ) + hodiny + ":" + ( minuty < 10 ? "0" : "" ) + minuty + ":" + ( sekundy < 10 ? "0" : "" ) + sekundy);
	$(".rok").html(( den < 10 ? "0" : "" ) + den + "." + ( mesiac < 10 ? "0" : "" ) + mesiac + "." + ( rok < 10 ? "0" : "" ) + rok);				
}

function kelvinToCelsius(kelvin) {
	return kelvin - 273.15;
}

function loadData(data) {
	var city = data.name;
	var country = data.sys.country;
	var temp = kelvinToCelsius(data.main.temp);
	var feels_like = kelvinToCelsius(data.main.feels_like);
	var sunrise = new Date(data.sys.sunrise * 1000);
	var sunset = new Date(data.sys.sunset * 1000);
	var speed = data.wind.speed;
	var icon = data.weather[0].icon;

	$(".city").html(country+ ", " +city);
	$("#temp").html(Math.round(temp*100)/100 + "°C");
	$("#feels_like").html(Math.round(feels_like*100)/100 + "°C");
	$("#pressure").html(data.main.pressure + " hPa");
	$("#humidity").html(data.main.humidity + "%");
	$("#sunrise").html(sunrise.getHours() + ":" + sunrise.getMinutes());
	$("#sunset").html(sunset.getHours() + ":" + sunset.getMinutes());
	$("#speed").html(speed + " m/s");
	$("#weather").html(weather[data.weather[0].description]);

}

function fetchData(city) {
	fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=093ebc22a5faf43187c92d8954d67706')
	.then(response => response.json())
	.then(data => loadData(data));
	animateLoad(true, 2000);
}

fetchData("Dvory nad Žitavou");
updateDatum();
setInterval( updateDatum, 1000);