const selectState = document.querySelector('#select-state');
const dataListState = document.querySelector('#state-list');
const searchCity = document.querySelector('#search-city');
const searchBtn = document.querySelector('#search-btn');
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


async function execute() {
  fillDatalist(dataListState, iranStates);
  searchBtn.addEventListener('click', async () => {
    
    
    const cityName = findCityEnglishName(searchCity.value);
    
    if(cityName === ''){
      alert('یافت نشد!');
      return;
    };
    const data = await searchWeather(cityName);
    console.log(await data["main"]["temp"]);
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
    alert('empty!');
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
// {"coord":{"lon":59.6062,"lat":36.297},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":29.08,"feels_like":28.2,"temp_min":29.08,"temp_max":29.08,"pressure":1019,"humidity":34},"visibility":10000,"wind":{"speed":3.09,"deg":140},"clouds":{"all":0},"dt":1689310667,"sys":{"type":1,"id":7485,"country":"IR","sunrise":1689296061,"sunset":1689347998},"timezone":12600,"id":124665,"name":"Mashhad","cod":200}