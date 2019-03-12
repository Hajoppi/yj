'use strict';

const Hapi = require('hapi');
const db = require('./services/db');
const Path = require('path');


const server = Hapi.server({
  port: process.env.PORT || 3001,
  host: 'localhost',
  routes: {
    cors: true
  },
  routes: {
    files: {
      relativeTo: Path.join(__dirname, 'public')
    }
  }
});

const init = async () => {
  await server.register(require('vision'));
  await server.register(require('inert'));
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true,
      }
    }
  })
  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views',
    partialsPath: './views/partials',
    layoutPath: 'views/layout',
    layout: 'default'
  });
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

function getCountdownTime() {
  var t1 = Date.parse("2017-04-29T23:00+03:00");
  var t2 = Date.now();
  var dif = t1 - t2;
  var seconds = Math.floor(dif / 1000 % 60);
  var minutes = Math.floor(dif / 1000 / 60 % 60);
  var hours = Math.floor(dif / 1000 / 3600);
  var days = minutes / 24;

  if (dif < 0){
    return {'hours': '00', 'minutes': '00', 'seconds': '00'};
  }

  if(hours < 10) { hours = '0'+ hours;}
  if(minutes < 10) { minutes = '0'+ minutes;}
  if(seconds < 10) { seconds = '0'+ seconds;}
  return {'hours': hours, 'minutes': minutes, 'seconds': seconds};
}

server.route({
  method: 'GET',
  path: '/',
  handler: async function(request, h) {
    return h.view('index', { placeholder: 'asd'});
  }
});



init();
