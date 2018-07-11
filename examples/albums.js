global.fetch = require('node-fetch');

import {
  searchAlbums
} from '../src/main';

const albums = searchAlbums('Incubus');

albums.then(data => console.log(data));

//Executar o exemplo: ..\node_modules\.bin\babel-node.cmd albums.js
