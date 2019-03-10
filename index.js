'use strict';

const Hapi = require('hapi');
const db = require('./services/db');

const server = Hapi.server({
  port: process.env.PORT || 3001,
  host: 'localhost',
  routes: {
    cors: true
  }
});

const init = async () => {
  await server.register(require('vision'));
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


init();

server.route({
  method: 'GET',
  path: '/',
  handler: async function(request, h) {
    return h.view('index', { placeholder: 'asd'});
  }
});
