
//link to the OpenWeatherAPI
//search for a city and save the results to a list(with anchors)
//city name, date, an icon for the weather, temperature, humidty, wind speed, UV index
//make sure UV index has 3 diffrent colors (favorable=green, moderate=yellow, severe=red)
//5 day forecast(has date, icon for weather, temp, humidty)
//when you click on the search history, recalls that search
//when dashboard is reopened, last search is kept and opened
window.onload = function() {
    if (localStorage.getItem("key") !== null)
    {
        document.querySelector('#search-value').value = localStorage.getItem('key');
    populateWeather();
    // populateFiveDay();
    // populateHistory();
    }
   
    
  }; 
//api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}

let apiKey = '781f26b7b30722bc9d7b5d602eebcb7f';

function populateWeather(){

let search = document.querySelector('#search-value').value;
let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + search + '&units=imperial&appid=' + apiKey;
const errFunc = function(request, status, error){
    alert('This city was not found!')
    console.log(request);
}

    const call = $.ajax(
        {
        url:queryURL,
        method:"GET",
        error: errFunc
        }
    
            ).then(function(data, status, response )
                {
                console.log( response);
                
                //General data for current data
                let card = document.createElement('div');
                card.className = ('card');
                
                let cardBody = document.createElement('div');
                cardBody.className = ('card-body bg-info');
                
                let cardName = document.createElement('div');
                cardName.className = ('card-title');

                let icon = document.createElement('img')
                icon.className = 'floatRight';
                icon.src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '.png';

                let name = document.createElement('div')
                name.textContent = data.name;
                
                let todaysDate = document.createElement('p');
                todaysDate.className = ('card-text');
                date = new Date();
                let curYear = date.getFullYear();
                let curMonth = date.getMonth() + 1;
                let curDay = date.getDate();
                let todayDate = (curMonth < 10 ? '0' : '') + curMonth + '/' + (curDay < 10 ? '0' : '') + curDay + '/' + curYear;
                todaysDate.textContent = todayDate;
                
                let info = document.createElement('ul');
                info.className = ('details list-group list-group-flush')

                let humidity = document.createElement('li')
                humidity.className = 'list-group-item bg-info';
                humidity.textContent ='Humidty: ' + data.main.humidity + '%';

                let windspd = document.createElement('li');
                windspd.className = 'list-group-item';
                windspd.textContent ='Wind Speed: ' + data.wind.speed + 'mph';

                let temp = document.createElement('li');
                temp.className = 'list-group-item';
                temp.textContent ='Temperature: ' + data.main.temp.toFixed(0) + '°F';

                let nameCont = document.querySelector('.name');
                //append created elements for current Weather
                
                document.querySelector('.forecast').append(card);
                card.append(cardBody);
                cardBody.append(cardName);
                cardName.append(icon);
                cardName.append(name);
                cardBody.append(todaysDate);
                card.append(info);
                //list items to the list 
                document.querySelector('.details').appendChild(temp)
                document.querySelector('.details').appendChild(humidity)
                document.querySelector('.details').appendChild(windspd)

                //get latitude and longitude for uv index
                let lat = data.coord.lat;
                let lon = data.coord.lat;
                let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
                $.ajax(
                    {
                    url:UVQueryURL,
                    method:"GET"
                    }
                        ).then(function(response)
                        {
                            // console.log(response)
                            let uvIndex = document.createElement('li');
                            uvIndex.classList.add('list-group-item');
                            uvIndex.textContent ='UV Index: ' + response[0].value;
                            document.querySelector('.details').appendChild(uvIndex);
                            if(uvIndex => 0 && uvIndex <= 2.99 )
                            {
                                uvIndex.classList.add('bg-success');
                            }
                            else if(uvIndex => 3 && uvIndex <= 4.99)
                            {
                                uvIndex.classList.add('bg-warning');
                            }
                            else
                            {
                                uvIndex.classList.add('bg-danger')
                            }
                        })
                })
        .done(function(){
            populateFiveDay();
        })
    // console.log(status)
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
                // console.log(response);
                for(let i = 1; i < 6; i++)
                {
                    let card = document.createElement('div');
                    card.className = ('card lineUp')

                    let cardBody = document.createElement('div');
                    cardBody.className = ('card-body bg-info')

                    let cardDate = document.createElement('p');
                    cardDate.className = ('fiveDayDate card-text')
                    date = new Date();
                    let curYear = date.getFullYear();
                    let curMonth = date.getMonth() + 1;
                    let curDay = date.getDate() + parseInt([i]);
                    let todayDate = (curMonth < 10 ? '0' : '') + curMonth + '/' + (curDay < 10 ? '0' : '') + curDay + '/' + curYear;
                    cardDate.textContent = todayDate;

                    let icon = document.createElement('img')
                    icon.className = 'center';
                    icon.src = 'https://openweathermap.org/img/wn/' + response.list[i].weather[0].icon + '.png';
                    
                    let infoList = document.createElement('ul')
                    infoList.className = 'fiveDayDetails list-group list-group-flush'

                    let temp = document.createElement('li');
                    temp.className = ('list-group-item')
                    temp.textContent ='Temperature: ' + response.list[i].main.temp.toFixed(0) + '°F'; 

                    let humidity = document.createElement('li')
                    humidity.className = ('list-group-item bg-info')
                    humidity.textContent ='Humidty: ' + response.list[i].main.humidity + '%';

                    

                    document.querySelector('.fiveDay').append(card);
                    card.appendChild(cardBody);
                    cardBody.append(icon);
                    cardBody.appendChild(cardDate);
                    card.appendChild(infoList);
                    infoList.appendChild(temp);
                    infoList.appendChild(humidity);

                }
                }
            )    
            
}

 function populateHistory() {
    localStorage.clear()
    let searchQuery = document.querySelector('#search-value').value;

    let newHistList = document.querySelector('.history');

    let newHistItem = document.createElement('li');
    newHistItem.className = ('list-group-item histItem')
    newHistItem.textContent = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);

    newHistList.appendChild(newHistItem);

    localStorage.setItem('key', searchQuery)
    }
 



document.addEventListener('click', function(e){
    e.preventDefault();
    
    if(e.target.closest('#search-button'))
    {
        console.log(e.target)
    if(document.querySelector('#search-value').value === '' && document.querySelector('#search-value')!== null)
    {
        alert('You must enter a valid location.');
    }
    else
    {
    //empty the div first
    document.querySelector('.forecast').textContent = '';
    document.querySelector('.fiveDay').textContent = '';
    //populate current weather, fiveday and history lists
    populateWeather();
    populateHistory();
    
    }
    };
});


document.addEventListener('click', function(evt) 
        {
            if(evt.target.matches('.histItem')){
                //clear the divs with info in them
                document.querySelector('.forecast').textContent = '';
                document.querySelector('.fiveDay').textContent = '';
                //capture target clicked and search input
                const itemClicked = evt.target.textContent;
                const searchQuery = document.querySelector('#search-value');
                //set the text of the search to the list items
                searchQuery.value = itemClicked;

                //call the functions for the info
                populateWeather();
                
                
            }
        });

        