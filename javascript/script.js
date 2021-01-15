
//link to the OpenWeatherAPI
//search for a city and save the results to a list(with anchors)

//api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}

let apiKey = '781f26b7b30722bc9d7b5d602eebcb7f';

function populateWeather(){
let search = document.querySelector('#search-value').value;
let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + search + '&units=imperial&appid=' + apiKey;


    $.ajax(
        {
        url:queryURL,
        method:"GET"
        }
            ).then(function(response)
                {
                console.log(response);
                
                //General data for current data
                let newCityHome = document.createElement('div');
                
                let icon = document.createElement('img')
                icon.className = 'floatRight';
                icon.src = 'https://openweathermap.org/img/wn/' + response.weather[0].icon + '.png';
                let name = document.createElement('h2')
                name.textContent = response.name;
                let infoList = document.createElement('ul')
                let temp = document.createElement('li');
                temp.textContent ='Temperature: ' + response.main.temp.toFixed(0) + '°F';
                let todaysDate = document.createElement('p');
                date = new Date();
                let curYear = date.getFullYear();
                let curMonth = date.getMonth() + 1;
                let curDay = date.getDate();
                let todayDate = (curMonth < 10 ? '0' : '') + curMonth + '/' + (curDay < 10 ? '0' : '') + curDay + '/' + curYear;
                todaysDate.textContent = todayDate;
                let humidity = document.createElement('li')
                humidity.textContent ='Humidty: ' + response.main.humidity + '%';
                let windspd = document.createElement('li');
                windspd.textContent ='Wind Speed: ' + response.wind.speed + 'mph';

                //append created elements for current Weather
                document.querySelector('#today').append(newCityHome);
                document.querySelector('#today').append(icon);
                document.querySelector('#today').append(name);
                document.querySelector('#today').append(todaysDate);
                document.querySelector('#today').append(infoList);
                //list items to the list 
                infoList.appendChild(temp)
                infoList.appendChild(humidity)
                infoList.appendChild(windspd)

                //get latitude and longitude for uv index
                let lat = response.coord.lat;
                let lon = response.coord.lat;
                let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
                $.ajax(
                    {
                    url:UVQueryURL,
                    method:"GET"
                    }
                        ).then(function(response)
                        {
                            console.log(response)
                            let uvIndex = document.createElement('li');
                            uvIndex.textContent ='UV Index: ' + response[0].value;
                            infoList.append(uvIndex);
                            if(uvIndex => 0 && uvIndex <= 2.99 )
                            {
                                uvIndex.classList.add('favorable');
                            }
                            else if(uvIndex => 3 && uvIndex <= 4.99)
                            {
                                uvIndex.classList.add('moderate');
                            }
                            else
                            {
                                uvIndex.classList.add('severe')
                            }
                        })
                })
        
    
}

function populateFiveDay() {
    let search = document.querySelector('#search-value').value;
    let queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + search + '&units=imperial&appid=' + apiKey;

    $.ajax(
        {
        url:queryURL,
        method:"GET"
        }
            ).then(function(response)
                {
                console.log(response);
                for(let i = 1; i < 6; i++)
                {
                    let newCityHome = document.createElement('div');
                    
                    let icon = document.createElement('img')
                    icon.className = 'floatRight';
                    icon.src = 'https://openweathermap.org/img/wn/' + response.list[i].weather[0].icon + '.png';
                    
                    let infoList = document.createElement('ul')
                    let temp = document.createElement('li');
                    temp.textContent ='Temperature: ' + response.list[i].main.temp.toFixed(0) + '°F'; 
                    let humidity = document.createElement('li')
                    humidity.textContent ='Humidty: ' + response.list[i].main.humidity + '%'; 
                    let todaysDate = document.createElement('p');
                    date = new Date();
                    let curYear = date.getFullYear();
                    let curMonth = date.getMonth() + 1;
                    let curDay = date.getDate() + parseInt([i]);
                    let todayDate = (curMonth < 10 ? '0' : '') + curMonth + '/' + (curDay < 10 ? '0' : '') + curDay + '/' + curYear;
                    todaysDate.textContent = todayDate;

                    document.querySelector('#forecast').append(newCityHome);
                    newCityHome.appendChild(icon);
                    newCityHome.appendChild(todaysDate);
                    newCityHome.appendChild(infoList);

                    infoList.appendChild(temp)
                    infoList.appendChild(humidity)
                }
                }
            )    

}

function populateHistory() {
    let search = document.querySelector('#search-value').value;
    if(document.querySelectorAll('history').textContent === search ){

    }else{
        
        //search history
        //history list elements
        let anchorEl = document.createElement('li')
        anchorEl.textContent = search;
        anchorEl.classList.add = 'history';
        
        //append created elements
        document.querySelector('.searchHistory').appendChild(anchorEl);
    }
}


document.addEventListener('click', function(e){
    if(e.target.matches('history'))
    {
        if(document.querySelectorAll('history').textContent = search ){

        }else{
        let search = document.querySelector('#search-value').value;
        let newText = e.target;
        //empty the div first
        document.querySelector('#today').textContent = '';
        //set search value to links text
        search = newText.textContent;
        //populate current weather
        populateWeather();
        }
    }
})

document.addEventListener('click', function(e){
    if(e.target.matches('#search-button'))
    {
    
    //empty the div first
    document.querySelector('#today').textContent = '';
    //populate current weather
    populateWeather();
    populateFiveDay();
    populateHistory();
    
    };
});

//city name, date, an icon for the weather, temperature, humidty, wind speed, UV index

//make sure UV index has 3 diffrent colors (favorable=green, moderate=yellow, severe=red)

//5 day forecast(has date, icon for weather, temp, humidty)

//when you click on the search history, recalls that search

//when dashboard is reopened, last search is kept and opened

