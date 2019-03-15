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

server.route({
  method: 'GET',
  path: '/',
  handler: async function(request, h) {
    const code = request.query.gc;
    if (!code) {
      return h.view('error', { err: 'Ei laiteta tällästä' })
    }
    try {
      const data = await db.getGuildStatus(code);
      return h.view('index', {
        guild: data.guild,
        gc: data.gc,
        msg: "sun mutsis",
      });
    } catch(err) {
      return h.view('error', { err: 'Koodi väärin '})
    }
  }
});

server.route({
  method: 'POST',
  path: '/',
  handler: async function(request, h) {
    const postObj = request.payload;
    const code = request.payload.code;
    console.log(code);
    return h.redirect('/');
  }
})


init();
