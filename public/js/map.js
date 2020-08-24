"use strict";
const skullIcon = './img/skull.png'
const planeIcon = './img/air_crash.png'
const jak = `https://ic.pics.livejournal.com/oldman_va/76382386/249053/249053_600.jpg`
const il = `https://hibiny.pro/files/img/oblomki-frontovogo-bombardirovschika-il-28-1.jpg`
const junkers = `https://hibiny.pro/files/img/Junkers-Ju-88-dvigatel.jpg`
const dyatlov = `https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Dyatlov_Pass_incident_02.jpg/280px-Dyatlov_Pass_incident_02.jpg`
const alertMessage = `<br><a class="edit-link" href="form">Исправить неточность</a>`
const elbr = `https://scontent-arn2-2.cdninstagram.com/v/t51.2885-15/e35/33473462_2084754981781016_1160338921716973568_n.jpg?_nc_ht=scontent-arn2-2.cdninstagram.com&_nc_cat=108&_nc_ohc=OxbU2KBZZ2AAX_qwSer&oh=863fd0f6a8dee9d7fe41228aa666a778&oe=5F4D6EEB`

// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
let map;

//markers of disasters
let disMarkers = [];
let crshMarkers = [];
//info bubbles for disasters
let infoDisasterBubble = [];
let infoCrashesBubble = [];


//data base
const disastersData = [
  {
    lat: 67.672922,
    lng: 33.692794,
    info: `<h3>Лавина</h3><p>20.12.2008<br>При сходе лавины погиб лыжник,<br> 35-летний Валерий Соловьев.<br>${alertMessage}</p>`
  },
  {
    lat: 67.665913,
    lng: 33.685362,
    info: `<h3>Лавина</h3><p>3.01.2013. На горе Кукис, в ЛО №40 («Валерин» кулуар) в результате схода лавины погибли двое горнолыжников из Санкт-Петербурга. Несмотря на предупреждения спасателей о повышенной степени лавинной опасности, они отправились кататься на необорудованных склонах и спровоцировали сход лавины.<br>${alertMessage} </p>`
  },
  {
    lat: 67.803912,
    lng: 33.527273,
    info: `<h3>Обрушение карниза</h3><p>11.03.1977. Студенты группы МЭИ поднялись на пер. Ферсмана и оставили записку, которая была снята группой из Ленинграда (рук. Дойников). 10.03 пришли на станцию Имандра и купили 4 билета до Москвы на 11.11. Консультировались с московскими туристами о пути подъёма на перевал Северный Чоргорр и спуска с него. 11.11 оставили рюкзаки на вокзале и ушли на лыжах к перевалу. Последний раз их видели около 11.00. Один из предполагаемых вариантов их действий: поднялись на перевал. Желая посмотреть путь спуска, неосмотрительно вышли на карниз, обрушили и вместе с ним упали на склон, вызвав лавину. Поисковые работы проводились с 14.03 до конца месяца. Тела были найдены весной в нижней части лощины.<br>${alertMessage}</p>`
  },
  {lat: 61.7541,
    lng: 59.4628, 
    info: `<h3>Гибель группы Дятлова</h3><img src=${dyatlov}><p>2.02.1959<br>Группа из девяти туристов под руководством Игоря Дятлова, совершавшая лыжный поход по Северному Уралу, погибла в полном составе. В память о погибшей тургруппе расположенный неподалёку перевал получил название «перевал Дятлова», из-за чего в современных источниках происшествие часто ассоциируется с этим перевалом. <br>${alertMessage}</p>`
  },
  {
    lat: 67.739882,
    lng: 33.339601,
    info: `<h3>Заблудился, не было тёплых вещей</h3><p>11.08.2002. В Хибинских горах погиб турист-москвич, приехавший в составе группы из пяти студентов-однокашников. Пятеро москвичей - одна супружеская пара, парень с девушкой и их друг - решили отдохнуть от столичной суеты в северных горах. Роковой ошибкой стало то, что поездку свою они воспринимали только как развлечение, к серьезным испытаниям не готовились. Трудно поверить, но у них с собой не было ни карты местности, ни даже компаса. При восхождении на вершину Арсеньева они заблудились в тумане, двое спустились в лагерь, остальные долго блуждали, надеясь все же выйти на вершину горы. Здесь, метрах в 250 oт тура горы Юмечорр, один из юношей отстал. По словам его друзей, они пытались найти его, но на крики он не отзывался, а увидеть его было невозможно из-за тумана. Как бы там ни было, друзья-товарищи спустились вниз в лагерь и легли спать. Лишь на утро старший группы позвонил в Москву с известием о том, что их товарищ потерялся.<br>${alertMessage}</p>`
  },


  
];

const crashesData = [{
    lat: 67.664781,
    lng: 33.494081,
    info: `<h3>Место катастрофы самолёта Як-28П</h3><img src=${jak}> <p>Перехватчик Як-28П Гвардейского 174 ИАП ПВО - потерпел катастрофу 1 октября 1974 года. Числился без вести пропавшим. Найден в 2011 г. Пилот ст.л-т Александр Ледяев, штурман - к-н Юрий Саенко. Найдены и опознаны в 2011 году.<br>${alertMessage}</p>`
  },
  {
    lat: 67.638360,
    lng: 33.429761,
    info: `<h3>Место катастрофы многоцелевого самолёта-фоторазведчика Junkers Ju 88</h3><img src=${junkers}> <p>Многоцелевой самолёт-фоторазведчик Юнкерс-88 из II./KG 30 "Adler" (бортовой номер 4D+AN, заводской номер 7378) пропал без вести в районе Кировска.<br>${alertMessage}</p>`
  },
  {
    lat: 67.757532,
    lng: 33.488454,
    info:`<h3>Место катастрофы фронтового бомбардировщика Ил-28</h3><img src=${il}> <p>Катастрофа произошла 11 сентября 1959 года, по документам экипаж считается пропавшим без вести. Лётчик и штурман - ст. лейтенанты, один из них 1930 г.р., стрелок-радист - солдат срочной службы. Только в 03.10.2009 забрали останки экипажа с горы, передали их в военкомат. Их имена пока неизвестны.<br>${alertMessage}</p>`
  },
  {
    lat: 43.352836,
    lng: 42.404319,
    info:`<h3>Место катастрофы советского бомбардировщика ДБ-3</h3><img style="width:250px;height:250px;" src=${elbr}> <p>30 декабря 1942 был сбит советский самолет, который вылетел на боевое задание из Кутаиси в район Сальского железнодорожного узла. Через Сальск шли немецкие эшелоны с боевой техникой и снарядами под Сталинград. Останки экипажа и обломки самолета были обнаружены поисковой группой только в 1996г.<br>${alertMessage}</p>`
  },
  {
    lat: 67.832870,
    lng: 33.826239,
    info:`<h3>Место катастрофы истребителя-перехватчика Су-15ТМ</h3><img src=https://hibiny.pro/files/img/mesto-katastrofy-istrebitelya-perehvatchika-su-15tm.jpg> <p>Разбился в 1987 году в условиях облачности в горах. Лётчик, командир эскадрильи подполковник Варламов, в этой катастрофе погиб.<br>${alertMessage}</p>`
  },





  
]

function initMap() {
  const centerPosition = {
    lat: 67.672922,
    lng: 33.692794
  };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: centerPosition,
    mapTypeId: "terrain"
  });

  
  // Adds a marker at the center of the map.
  addMarker();
}


// Adds a marker to the map and push to the array.
function addMarker() {
  //adding markers of disaster with info bubbles
  for (let i = 0; i < disastersData.length; i++) {

    const marker1 = new google.maps.Marker({
      position: {
        lat: disastersData[i].lat,
        lng: disastersData[i].lng,
      },
      map: map,
      icon: skullIcon,
    });
    
    disMarkers.push(marker1);

    // bubble info create
    let info1 = new google.maps.InfoWindow({
      content: disastersData[i].info
    });

    infoDisasterBubble.push(info1)

    disMarkers[i].addListener('click', () => {
      infoDisasterBubble[i].open(map, disMarkers[i])
    });

  }

  //adding markers of Air Crashes with info bubbles
  for (let i = 0; i < crashesData.length; i++) {

    const marker1 = new google.maps.Marker({
      position: {
        lat: crashesData[i].lat,
        lng: crashesData[i].lng,
      },
      map: map,
      icon: planeIcon,
    });
    crshMarkers.push(marker1);

    // bubble info create
    let info1 = new google.maps.InfoWindow({
      content: crashesData[i].info,
      
    });

    infoCrashesBubble.push(info1)

    crshMarkers[i].addListener('click', () => {      
      infoCrashesBubble[i].open(map, crshMarkers[i])
    });

    
    
  }

}



// Sets the map on First group markers in the array.
function setMapOnFirstGroup(map) {
  for (let i = 0; i < disMarkers.length; i++) {
    disMarkers[i].setMap(map);
  }
}

// Sets the map on Second group markers in the array.
function setMapOnSecondGroup(map) {
  for (let i = 0; i < crshMarkers.length; i++) {
    crshMarkers[i].setMap(map);
  }
}

// Removes the First group markers from the map, but keeps them in the array.
function clearMarkersFirstGroup() {
  setMapOnFirstGroup(null);
}

// Removes the Second group markers from the map, but keeps them in the array.
function clearMarkersSecondGroup() {
  setMapOnSecondGroup(null);
}


// Shows any markers currently in the array.
function showMarkersFirstGroup() {
  setMapOnFirstGroup(map);
}

// Shows any markers currently in the array.
function showMarkersSecondGroup() {
  setMapOnSecondGroup(map);
}

