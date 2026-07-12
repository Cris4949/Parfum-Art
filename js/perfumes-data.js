// Catálogo de Perfumería — Parfum Art
const PERFUMES = [
  {
    "id": 1,
    "nombre": "Odyssey Mandarin Sky",
    "marca": "Armaf",
    "precio": 475,
    "aroma": "Mandarina, naranja, azafrán, caramelo y haba tonka",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/1.jpg"
  },
  {
    "id": 2,
    "nombre": "Odyssey Mega",
    "marca": "Armaf",
    "precio": 400,
    "aroma": "Cítricos frescos, especias y fondo amaderado ambarado",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/2.jpg"
  },
  {
    "id": 3,
    "nombre": "Odyssey Limoni",
    "marca": "Armaf",
    "precio": 375,
    "aroma": "Limón intenso, bergamota, jazmín y cedro",
    "duracion": "4 - 6 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/3.jpg"
  },
  {
    "id": 4,
    "nombre": "Odyssey Candee",
    "marca": "Armaf",
    "precio": 375,
    "aroma": "Caramelo, frambuesa, jazmín, vainilla y ámbar",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/4.jpg"
  },
  {
    "id": 5,
    "nombre": "Odyssey Artisto",
    "marca": "Armaf",
    "precio": 450,
    "aroma": "Bergamota, notas amaderadas-nuez, salvia, coco, frutas tropicales, canela, ámbar, vainilla y haba tonka",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/5.jpg"
  },
  {
    "id": 6,
    "nombre": "Odyssey Mandarin Sky Vintage",
    "marca": "Armaf",
    "precio": 475,
    "aroma": "Mandarina y cítricos, con notas florales y especias cálidas, sobre ámbar y maderas",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/6.jpg"
  },
  {
    "id": 7,
    "nombre": "Club De Nuit Urban Man Elixir",
    "marca": "Armaf",
    "precio": 500,
    "aroma": "Bergamota, azahar, lavanda, azafrán y ámbar",
    "duracion": "8 Horas",
    "ml": "106 ml",
    "imagen": "images/perfumes/7.jpg"
  },
  {
    "id": 8,
    "nombre": "Club De Nuit Intense Man",
    "marca": "Armaf",
    "precio": 450,
    "aroma": "Manzana, bergamota, grosella negra, piña y limón, con rosa, abedul y jazmín, sobre almizcle, ámbar gris, pachulí y vainilla",
    "duracion": "8 - 10 Horas",
    "ml": "105 ml",
    "imagen": "images/perfumes/8.jpg"
  },
  {
    "id": 9,
    "nombre": "Club De Nuit Bling",
    "marca": "Armaf",
    "precio": 525,
    "aroma": "Cítricos, flor prisma, polvo de estrellas, vainilla y maderas de terciopelo",
    "duracion": "7 - 9 Horas",
    "ml": "75 ml",
    "imagen": "images/perfumes/9.jpg"
  },
  {
    "id": 10,
    "nombre": "Club De Nuit Woman",
    "marca": "Armaf",
    "precio": 450,
    "aroma": "Durazno, toronja, litchi, jazmín, rosa y almizcle",
    "duracion": "6 Horas",
    "ml": "106 ml",
    "imagen": "images/perfumes/10.jpg"
  },
  {
    "id": 11,
    "nombre": "Club De Nuit Maleka",
    "marca": "Armaf",
    "precio": 525,
    "aroma": "Bergamota, azafrán, grosella negra, almizcle y vainilla",
    "duracion": "6 - 8 Horas",
    "ml": "106 ml",
    "imagen": "images/perfumes/11.jpg"
  },
  {
    "id": 12,
    "nombre": "Club De Nuit Iconic Extrait de Parfum",
    "marca": "Armaf",
    "precio": 500,
    "aroma": "Toronja, limón, menta, pimienta rosa, jengibre, incienso y sándalo",
    "duracion": "8 - 10 Horas",
    "ml": "105 ml",
    "imagen": "images/perfumes/12.jpg"
  },
  {
    "id": 13,
    "nombre": "Précieux I Extrait de Parfum",
    "marca": "Armaf",
    "precio": 650,
    "aroma": "Bergamota, piña, pera, caramelo, cuero, ámbar y vainilla",
    "duracion": "12+ Horas",
    "ml": "55 ml",
    "imagen": "images/perfumes/13.jpg"
  },
  {
    "id": 14,
    "nombre": "Précieux IV Eau de Parfum",
    "marca": "Armaf",
    "precio": 650,
    "aroma": "Bergamota, manzana, sal marina, ylang ylang, jazmín, frutos rojos y vainilla",
    "duracion": "6 - 8 Horas",
    "ml": "55 ml",
    "imagen": "images/perfumes/14.jpg"
  },
  {
    "id": 15,
    "nombre": "Asad Elixir",
    "marca": "Lattafa",
    "precio": 500,
    "aroma": "Pimienta rosa, azafrán y toronja, con tabaco, cedro y vainilla, sobre pachulí, olíbano, cashmerán y ámbar seco",
    "duracion": "10 - 12 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/15.jpg"
  },
  {
    "id": 16,
    "nombre": "Yara Elixir",
    "marca": "Lattafa",
    "precio": 500,
    "aroma": "Fresa s'mores y grosella negra, con jazmín y azahar, sobre vainilla, caramelo, ámbar y almizcle",
    "duracion": "8 - 10 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/16.jpg"
  },
  {
    "id": 17,
    "nombre": "Asad",
    "marca": "Lattafa",
    "precio": 400,
    "aroma": "Pimienta negra, tabaco y piña, con pachulí, café e iris, sobre vainilla, ámbar, madera seca, benjuí y láudano",
    "duracion": "8 - 10 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/17.jpg"
  },
  {
    "id": 18,
    "nombre": "Yara Candy",
    "marca": "Lattafa",
    "precio": 400,
    "aroma": "Grosella negra y mandarina verde, con gardenia y caramelo de fresa efervescente, sobre vainilla, almizcle, ámbar y sándalo",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/18.jpg"
  },
  {
    "id": 19,
    "nombre": "Yara Moi",
    "marca": "Lattafa",
    "precio": 400,
    "aroma": "Pera, pimienta rosa y grosella negra, con nardo, jazmín y almendra, sobre vainilla, cashmerán y pachulí",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/19.jpg"
  },
  {
    "id": 20,
    "nombre": "Yara Tous",
    "marca": "Lattafa",
    "precio": 400,
    "aroma": "Mango, coco y maracuyá, con jazmín, heliotropo y azahar, sobre vainilla, almizcle y cashmerán",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/20.jpg"
  },
  {
    "id": 21,
    "nombre": "Saher",
    "marca": "Nusuk",
    "precio": 450,
    "aroma": "Grosella negra, manzana y azafrán, con lirio de los valles, jazmín y rosa damascena, sobre vainilla, almizcle blanco, ámbar gris y durazno",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/21.jpg"
  },
  {
    "id": 22,
    "nombre": "Falak",
    "marca": "Nusuk",
    "precio": 550,
    "aroma": "Azúcar morena, caramelo y galleta, con vainilla, toffee y ámbar, sobre almizcle blanco y praliné",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/22.jpg"
  },
  {
    "id": 23,
    "nombre": "Khamrah",
    "marca": "Lattafa",
    "precio": 430,
    "aroma": "Canela, nuez moscada y bergamota, con dátiles, praliné y tuberosa, sobre vainilla, haba tonka, madera de ámbar, mirra y benjuí",
    "duracion": "10 - 12 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/23.jpg"
  },
  {
    "id": 24,
    "nombre": "Khamrah Qahwa",
    "marca": "Lattafa",
    "precio": 430,
    "aroma": "Canela, cardamomo y jengibre, con praliné, frutos confitados y flores blancas, sobre vainilla, café, haba tonka, benjuí y almizcle",
    "duracion": "10 - 12 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/24.jpg"
  },
  {
    "id": 25,
    "nombre": "Hawas Black",
    "marca": "Rasasi",
    "precio": 475,
    "aroma": "Piña, bergamota y toronja, con pachulí, cedro y jazmín, sobre musgo de roble, maderas y ámbar",
    "duracion": "10+ Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/25.jpg"
  },
  {
    "id": 26,
    "nombre": "Hawas Malibu",
    "marca": "Rasasi",
    "precio": 510,
    "aroma": "Piña, naranja y toronja, con iris, ámbar y lavanda, sobre haba tonka, almizcle, pachulí y cashmerán",
    "duracion": "8 - 10 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/26.jpg"
  },
  {
    "id": 27,
    "nombre": "Hawas Ice",
    "marca": "Rasasi",
    "precio": 510,
    "aroma": "Manzana, bergamota siciliana, limón italiano y anís estrellado, con ciruela, azahar y cardamomo, sobre musgo, almizcle, madera a la deriva y ámbar",
    "duracion": "8 - 10 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/27.jpg"
  },
  {
    "id": 28,
    "nombre": "Hawas Lava Gold",
    "marca": "Rasasi",
    "precio": 550,
    "aroma": "Limón, manzana, toronja y piña, con frambuesa, cuero, oud y azafrán, sobre musgo blanco, pachulí, ámbar y caramelo",
    "duracion": "9 - 11 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/28.jpg"
  },
  {
    "id": 29,
    "nombre": "Art of Universe",
    "marca": "Lattafa",
    "precio": 525,
    "aroma": "Mandarina, bergamota, jengibre y menta, con pera y azahar, sobre almizcle, ámbar y cedro",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/29.jpg"
  },
  {
    "id": 30,
    "nombre": "Musamam White Intense",
    "marca": "Lattafa",
    "precio": 510,
    "aroma": "Especias, bergamota y naranja, con coco, ylang ylang, ambroxan y mahonial, sobre sándalo, almizcle y benjuí",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/30.jpg"
  },
  {
    "id": 31,
    "nombre": "Nebras",
    "marca": "Lattafa",
    "precio": 425,
    "aroma": "Frutos rojos y mandarina, con vainilla, cacao y rosa, sobre azúcar, haba tonka, ámbar y almizcle",
    "duracion": "8 - 10 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/31.jpg"
  },
  {
    "id": 32,
    "nombre": "Le Beau Le Parfum",
    "marca": "Jean Paul Gaultier",
    "precio": 925,
    "aroma": "Piña, iris, jengibre y ciprés, con coco y notas amaderadas, sobre haba tonka, sándalo, ámbar y ámbar gris",
    "duracion": "10 - 12 Horas",
    "ml": "125 ml",
    "imagen": "images/perfumes/32.jpg"
  },
  {
    "id": 33,
    "nombre": "Qaed Al Fursan",
    "marca": "Lattafa",
    "precio": 375,
    "aroma": "Piña y azafrán, con bálsamo de abeto y jazmín, sobre cedro, ámbar y agarwood (oud)",
    "duracion": "6 - 8 Horas",
    "ml": "90 ml",
    "imagen": "images/perfumes/33.jpg"
  },
  {
    "id": 34,
    "nombre": "Fakhar Black",
    "marca": "Lattafa",
    "precio": 400,
    "aroma": "Manzana, bergamota y jengibre, con lavanda, salvia, bayas de enebro y geranio, sobre haba tonka, cedro, madera ambarina y vetiver",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/34.jpg"
  },
  {
    "id": 35,
    "nombre": "Fakhar Platinum",
    "marca": "Lattafa",
    "precio": 400,
    "aroma": "Bergamota, pimienta rosa y cardamomo, con guayaba, lavanda y jengibre, sobre incienso, palo santo y sándalo",
    "duracion": "7 - 9 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/35.jpg"
  },
  {
    "id": 36,
    "nombre": "Bade'e Al Oud Sublime",
    "marca": "Lattafa",
    "precio": 400,
    "aroma": "Manzana, lichi y rosa, con ciruela y jazmín, sobre musgo, vainilla y pachulí",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/36.jpg"
  },
  {
    "id": 37,
    "nombre": "Bade'e Al Oud Amethyst",
    "marca": "Lattafa",
    "precio": 400,
    "aroma": "Pimienta rosa y bergamota, con rosa turca, rosa búlgara y jazmín, sobre agarwood (oud), ámbar y vainilla",
    "duracion": "8 - 10 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/37.jpg"
  },
  {
    "id": 38,
    "nombre": "Bade'e Al Oud Noble Blush",
    "marca": "Lattafa",
    "precio": 400,
    "aroma": "Leche de rosas, con merengue y almendra, sobre vainilla, sándalo y almizcle",
    "duracion": "8 - 10 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/38.jpg"
  },
  {
    "id": 39,
    "nombre": "Rome Pour Homme",
    "marca": "Mast Perfume",
    "precio": 450,
    "aroma": "Geranio y lavanda, con vainilla, salvia y jengibre, sobre vetiver y cedro",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/39.jpg"
  },
  {
    "id": 40,
    "nombre": "Rome Imaginé",
    "marca": "Mast Perfume",
    "precio": 450,
    "aroma": "Bergamota, limón y lavanda, con geranio, pimienta negra, cardamomo y salvia, sobre vetiver, cedro y almizcle",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/40.jpg"
  },
  {
    "id": 41,
    "nombre": "Cool Ace",
    "marca": "Armaf",
    "precio": 390,
    "aroma": "Bergamota y heliotropo, con comino y especias aromáticas, sobre maderas y almizcle",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/41.jpg"
  },
  {
    "id": 42,
    "nombre": "Ameerat Al Arab Sugar Crown",
    "marca": "Asdaaf",
    "precio": 380,
    "aroma": "Naranja amarga, limón y frutos confitados, con jengibre, arándano, durazno, rosa búlgara, azahar de durazno, chicle y canela, sobre ambroxan, almizcle y cedro",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/42.jpg"
  },
  {
    "id": 43,
    "nombre": "His Confession",
    "marca": "Lattafa",
    "precio": 480,
    "aroma": "Canela, lavanda y mandarina, con iris, benjuí, ciprés y mahonial, sobre vainilla, haba tonka, ámbar, incienso, cedro y pachulí",
    "duracion": "8 - 10 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/43.jpg"
  },
  {
    "id": 44,
    "nombre": "Her Confession",
    "marca": "Lattafa",
    "precio": 480,
    "aroma": "Canela y acorde místico, con nardo, jazmín, incienso y mahonial, sobre vainilla, almizcle y haba tonka",
    "duracion": "8 - 10 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/44.jpg"
  },
  {
    "id": 45,
    "nombre": "Khamrah Set 2 Piezas (Perfume + Perfumed Spray)",
    "marca": "Lattafa",
    "precio": 490,
    "aroma": "Canela, nuez moscada y bergamota, con dátiles, praliné y tuberosa, sobre vainilla, haba tonka, madera de ámbar, mirra y benjuí",
    "duracion": "10 - 12 Horas",
    "ml": "100 ml + 200 ml spray",
    "imagen": "images/perfumes/45.jpg"
  },
  {
    "id": 46,
    "nombre": "Asad Set 2 Piezas (Zanzíbar + Clásico)",
    "marca": "Lattafa",
    "precio": 500,
    "aroma": "Zanzíbar: lavanda y pimienta negra, con agua de coco, iris y sal, sobre incienso y vainilla · Clásico: pimienta negra, tabaco y piña, con pachulí, café e iris, sobre vainilla, ámbar y benjuí",
    "duracion": "6 - 8 Horas",
    "ml": "2 x 100 ml",
    "imagen": "images/perfumes/46.jpg"
  },
  {
    "id": 47,
    "nombre": "Royal Amber",
    "marca": "Orientica",
    "precio": 650,
    "aroma": "Bergamota y notas verdes, con melón, piña, notas gourmand y ámbar, sobre maderas, vainilla y almizcle",
    "duracion": "8 - 10 Horas",
    "ml": "80 ml",
    "imagen": "images/perfumes/47.jpg"
  },
  {
    "id": 48,
    "nombre": "Set Q by Dolce & Gabbana 3 Piezas (Perfume + Body Lotion x2)",
    "marca": "Dolce & Gabbana",
    "precio": 900,
    "aroma": "Limón siciliano, naranja sanguina y jazmín, con cereza y heliotropo, sobre almizcle y cedro",
    "duracion": "8 - 10 Horas",
    "ml": "100 ml + 2 lociones",
    "imagen": "images/perfumes/48.jpg"
  },
  {
    "id": 49,
    "nombre": "Set Light Blue Caballero 3 Piezas (Perfume + Shower Gel + Desodorante)",
    "marca": "Dolce & Gabbana",
    "precio": 900,
    "aroma": "Toronja, bergamota, mandarina siciliana y enebro, con pimienta, romero y madera de rosa brasileña, sobre almizcle, incienso y musgo de roble",
    "duracion": "4 - 6 Horas",
    "ml": "125 ml + accesorios",
    "imagen": "images/perfumes/49.jpg"
  },
  {
    "id": 50,
    "nombre": "Yum Yum",
    "marca": "Armaf",
    "precio": 600,
    "aroma": "Bayas silvestres, cereza, naranja y bergamota, con rosa, flores blancas y vainilla, sobre notas empolvadas, almizcle y ámbar",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/50.jpg"
  },
  {
    "id": 51,
    "nombre": "Guess Man Set 3 Piezas (Perfume + Body Spray + Shower Gel)",
    "marca": "Guess",
    "precio": 450,
    "aroma": "Ajenjo, con lavanda, pimienta blanca, jengibre y nuez moscada, sobre abeto, almizcle, sándalo y ámbar",
    "duracion": "4 - 6 Horas",
    "ml": "75 ml + 226 ml + 200 ml",
    "imagen": "images/perfumes/51.jpg"
  },
  {
    "id": 52,
    "nombre": "Fantasy",
    "marca": "Britney Spears",
    "precio": 350,
    "aroma": "Kiwi, lichi rojo y membrillo, con chocolate blanco, ponqué, orquídea y jazmín, sobre almizcle, raíz de lirio y notas amaderadas",
    "duracion": "5 - 7 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/52.jpg"
  },
  {
    "id": 53,
    "nombre": "Mayar Cherry Intense",
    "marca": "Lattafa",
    "precio": 390,
    "aroma": "Fresa y bergamota, con mermelada de cereza y cacao, sobre vainilla, ámbar y pachulí",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/53.jpg"
  },
  {
    "id": 54,
    "nombre": "9pm",
    "marca": "Afnan",
    "precio": 500,
    "aroma": "Manzana, canela, lavanda silvestre y bergamota, con azahar y lirio de los valles, sobre haba tonka, ámbar y almizcle",
    "duracion": "8 - 10 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/54.jpg"
  },
  {
    "id": 55,
    "nombre": "9am Dive",
    "marca": "Afnan",
    "precio": 500,
    "aroma": "Limón, menta, grosella negra y pimienta rosa, con jengibre y manzana, sobre almizcle, ámbar e incienso",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/55.jpg"
  },
  {
    "id": 56,
    "nombre": "9am Pour Femme",
    "marca": "Afnan",
    "precio": 500,
    "aroma": "Limón, mandarina, cardamomo y pimienta rosa, con lavanda, azahar, manzana verde y rosa, sobre almizcle, musgo, cedro y pachulí",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/56.jpg"
  },
  {
    "id": 57,
    "nombre": "9pm Rebel",
    "marca": "Afnan",
    "precio": 500,
    "aroma": "Mandarina, piña y manzana verde, con cedro, musgo de roble y vainilla, sobre caramelo, maderas secas, ámbar gris y almizcle",
    "duracion": "8 - 10 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/57.jpg"
  },
  {
    "id": 58,
    "nombre": "Shaheen Gold",
    "marca": "Lattafa",
    "precio": 475,
    "aroma": "Piña y toronja, con higo y lavanda, sobre vainilla, pachulí y haba tonka",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/58.jpg"
  },
  {
    "id": 59,
    "nombre": "Veneno Blanco",
    "marca": "French Avenue",
    "precio": 550,
    "aroma": "Neroli, leche y bergamota, con flores blancas, flor de tiaré y ylang ylang, sobre coco, vainilla, láudano y madera de guayaco",
    "duracion": "7 - 9 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/59.jpg"
  },
  {
    "id": 60,
    "nombre": "Halloween",
    "marca": "Jesus Del Pozo",
    "precio": 600,
    "aroma": "Violeta, notas marinas, hoja de plátano y petitgrain, con magnolia, tuberosa, violeta y pimienta, sobre incienso, sándalo, vainilla de Madagascar y mirra",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/60.jpg"
  },
  {
    "id": 61,
    "nombre": "Purr",
    "marca": "Katy Perry",
    "precio": 400,
    "aroma": "Durazno, manzana roja, gardenia y bambú, con jazmín, fresia y rosa, sobre vainilla, coco, orquídea, almizcle, ámbar y sándalo",
    "duracion": "5 - 7 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/61.jpg"
  },
  {
    "id": 62,
    "nombre": "LouLou",
    "marca": "Cacharel",
    "precio": 400,
    "aroma": "Ciruela, violeta, casis y anís, con tuberosa, azahar, ylang ylang, heliotropo y flor de tiaré, sobre incienso, vainilla, benjuí, sándalo y almizcle",
    "duracion": "8 - 10 Horas",
    "ml": "50 ml",
    "imagen": "images/perfumes/62.jpg"
  },
  {
    "id": 63,
    "nombre": "Now Women",
    "marca": "Rave",
    "precio": 350,
    "aroma": "Frutos rojos y naranja, con malvavisco, jazmín y lirio de los valles, sobre vainilla, almizcle y musgo",
    "duracion": "6 - 8 Horas",
    "ml": "100 ml",
    "imagen": "images/perfumes/63.jpg"
  },
  {
    "id": 64,
    "nombre": "Rose Éclat Gift Set",
    "marca": "Orientica",
    "precio": 700,
    "aroma": "Durazno, bergamota, toronja y nuez moscada, con rosa, peonía rosa y violeta, sobre ámbar, almizcle, benjuí y vetiver",
    "duracion": "6+ Horas",
    "ml": "80 ml + miniatura",
    "imagen": "images/perfumes/64.jpg"
  },
  {
    "id": 65,
    "nombre": "Le Male Le Parfum",
    "marca": "Jean Paul Gaultier",
    "precio": 825,
    "aroma": "Cardamomo, con lavanda e iris, sobre vainilla, notas orientales y maderas",
    "duracion": "8 - 10 Horas",
    "ml": "75 ml",
    "imagen": "images/perfumes/65.jpg"
  },
  {
    "id": 66,
    "nombre": "Le Male Elixir",
    "marca": "Jean Paul Gaultier",
    "precio": 825,
    "aroma": "Lavanda y menta, con vainilla y benjuí, sobre miel, haba tonka y tabaco",
    "duracion": "10 - 12 Horas",
    "ml": "75 ml",
    "imagen": "images/perfumes/66.jpg"
  },
  {
    "id": 67,
    "nombre": "Club De Nuit Sillage",
    "marca": "Armaf",
    "precio": 525,
    "aroma": "Bergamota, limón, lima, grosella negra, hoja de violeta y jengibre, con rosa, jazmín e iris, sobre ambroxan, almizcle, sándalo y cedro",
    "duracion": "8 - 10 Horas",
    "ml": "105 ml",
    "imagen": "images/perfumes/67.jpg"
  },
  {
    "id": 68,
    "nombre": "Club De Nuit Milestone",
    "marca": "Armaf",
    "precio": 525,
    "aroma": "Notas marinas, frutos rojos y bergamota, con violeta, maderas blancas y sándalo, sobre almizcle, ambroxan y vetiver",
    "duracion": "7 - 9 Horas",
    "ml": "105 ml",
    "imagen": "images/perfumes/68.jpg"
  }
];
