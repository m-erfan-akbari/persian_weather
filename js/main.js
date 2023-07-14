const selectState = document.querySelector('#select-state');
const dataListState = document.querySelector('#state-list');
const searchCity = document.querySelector('#search-city');
const searchBtn = document.querySelector('#search-btn');
const form = document.querySelector('form');

const iranStates = {
  'Tabriz': 'تبریز',
  'Urmia': 'ارومیه',
  'Ardabil': 'اردبیل',
  'Isfahan': 'اصفهان',
  'Karaj': 'کرج',
  'Ilam': 'ایلام',
  'Bushehr': 'بوشهر',
  'Tehran': 'تهران',
  'Shahrekord': 'شهرکرد',
  'Birjand': 'بیرجند',
  'Mashhad': 'مشهد',
  'Bojnurd': 'بجنورد',
  'Ahvaz': 'اهواز',
  'Zanjan': 'زنجان',
  'Semnan': 'سمنان',
  'Zahedan': 'زاهدان',
  'Shiraz': 'شیراز',
  'Qazvin': 'قزوین',
  'Qom': 'قم',
  'Sanandaj': 'سنندج',
  'Kerman': 'کرمان',
  'Kermanshah': 'کرمانشاه',
  'Yasuj': 'یاسوج',
  'Gorgan': 'گرگان',
  'Rasht': 'رشت',
  'Khorramabad': 'خرم‌آباد',
  'Sari': 'ساری',
  'Arak': 'اراک',
  'Bandar Abbas': 'بندر عباس',
  'Hamadan': 'همدان',
  'Yazd': 'یزد'
}
// addEventListener('submit')
form.addEventListener('submit', (e) => {
  e.preventDefault();
})

async function execute() {
  fillDatalist(dataListState, iranStates);
  searchBtn.addEventListener('click', async (e) => {
    const cityName = findCityEnglishName(searchCity.value);

    const data = await searchWeather(cityName);
    if(data['cod'] == 404){
      errorNotifiction('خطا در دریافت اطلاعات.');
      return;
    }
    const dataSimplified = await cityInfo(data);
    setWeatherToDOM(dataSimplified);
  })
}

execute();

function fillDatalist(selectContainer, obj) {
  for (const key in obj) {
    const value = iranStates[key];
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.setAttribute('data-value', key);
    selectContainer.appendChild(optionElement);
  }
}

function findCityEnglishName(perianName) {
  let cityName = '';
  if(perianName === ''){
    errorNotifiction('نام شهر را وارد کنید!');
    cityName = '';
  }
  for (const key in iranStates) {
    const element = iranStates[key];
    if(element === perianName){
      return key;
    }
  }
  return '';
}

async function searchWeather(city) {
  const apiKey = 'cfbdccebe58f79a4e1c5de3700f4f8d5';
  const apiURL = 'https://api.openweathermap.org/data/2.5/weather?&units=metric';
  let apiWeather = `${apiURL}&appid=${apiKey}&q=${city}`;
  const res = await fetch(apiWeather);
  return await res.json();
}

// Converting an object to data simplified
async function cityInfo(object) {
  const temperature = await object["main"]["temp"];
  const weather = await object["weather"][0]["main"];
  const humidity = await object["main"]["humidity"];
  const wind = await object["wind"]["speed"];
  const sunrise = convertObjectToStringTime(convertUnixTime(await object["sys"]["sunrise"]));
  const sunset = convertObjectToStringTime(convertUnixTime(await object["sys"]["sunset"]));
  const city = await object["name"];

  return({
    temperature, humidity, wind, sunrise, sunset, city, weather
  })
}

function setWeatherToDOM(object) {
  //variables
  const weatherImage  = document.querySelector('#weather-image');
  const textTemperature  = document.querySelector('#text-temperature');
  const textCity  = document.querySelector('#text-city');
  const textWind  = document.querySelector('#text-wind');
  const textHumidity  = document.querySelector('#text-humidity');
  const textSunrise  = document.querySelector('#text-sunrise');
  const textSunset  = document.querySelector('#text-sunset');

  textTemperature.textContent = `${Math.round(object["temperature"])}°c`;
  textCity.textContent = iranStates[object["city"]] || object["city"];
  textWind.textContent = `${object["wind"]} km/h`;
  textHumidity.textContent = `${object["humidity"]}%`;
  textSunrise.textContent = `${object["sunrise"]}`;
  textSunset.textContent = `${object["sunset"]}`;

  switch (object["weather"]) {
    case 'Clouds':
      weatherImage.src = '../images/clouds.png'
      break;
    case 'Clear':
      weatherImage.src = '../images/clear.png'
      break;
    case 'Rain':
      weatherImage.src = '../images/rain.png'
      break;
    case 'Drizzle':
      weatherImage.src = '../images/drizzle.png'
      break;
    case 'Mist':
      weatherImage.src = '../images/mist.png'
      break;
    default:
      break;
  }
}

 function errorNotifiction(errorMessage) {
  const toastLiveExample = document.getElementById('liveToast');
  const toastBody = document.querySelector('#toast-message');

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBody.textContent = errorMessage;
  toastBootstrap.show();
}

// ----------------------------------------------------------------------------
// utilities

// Converting single digit numbers to two digit numbers
// ex: '4' => '04'
function changeDigit(number){
  const strNum = typeof number === 'string' ? number : String(number);
  return strNum.length > 1 ? strNum : '0' + strNum;
}

// Coverting unix time to normal time
// input unix number time & output hour, minute, second as an object
function convertUnixTime(unixTime) {
  const date = new Date(unixTime * 1000);
  const hours = changeDigit(date.getHours());
  const minutes = changeDigit(date.getMinutes());
  const seconds = changeDigit(date.getSeconds());
  
  return ({
    hours, minutes, seconds
  })
}

// Convertin a time object to string time
function convertObjectToStringTime(obj) {
  return(`${obj["hours"]}:${obj["minutes"]}`);
}