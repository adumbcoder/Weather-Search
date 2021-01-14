
//link to the OpenWeatherAPI
//search for a city and save the results to a list(with anchors)

//api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
function populateWeather(){
let search = document.querySelector('#search-value');
let apiKey = '{781f26b7b30722bc9d7b5d602eebcb7f}';
let queryURL = 'https://www.openweathermap.org/data/2.5/weather?q=' + search.textContent + '&appid=' + apiKey;


$.ajax({
    url:queryURL,
    method:"GET"
    
}).then(function(response){
    console.log(response);
    // let newCityHome = document.createElement('div');
    // let newCityName = document.createElement('h2')
    // newCityName.textContent = 
})
}


document.addEventListener('click', function(e){
    e.target.match('.search-button')
    populateWeather();
});
//city name, date, an icon for the weather, temperature, humidty, wind speed, UV index

//make sure UV index has 3 diffrent colors (favorable=green, moderate=yellow, severe=red)

//5 day forecast(has date, icon for weather, temp, humidty)

//when you click on the search history, recalls that search

//when dashboard is reopened, last search is kept and opened



