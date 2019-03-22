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
function timeOver() {
  const t1 = Date.parse("2019-04-29T23:00+03:00");
  const t2 = Date.now();
  const dif = t1 - t2;
  return dif < 0
}

server.route({
  method: 'GET',
  path: '/',
  handler: async function(request, h) {
    const code = request.query.gc;
    if (!code) {
      return h.view('error', { err: 'Ei laiteta tällästä' })
    }
    try {
      const data = await db.getGuildInfo(code);
      if(timeOver) {
        return h.view('index', {
          guild: data.guild,
          gc: code,
          msg: "sun mutsis",
          final_clue: data.progress,
        });
      } else {
        return h.view('final', {
          guild: data.guild,
          gc: code
        });
      }
    } catch(err) {
      console.log(err);
      return h.view('error', { err: 'Ei ihan'})
    }
  }
});

server.route({
  method: 'POST',
  path: '/',
  handler: async function(request, h) {
    const answer = request.payload.answer;
    const guildCode = request.payload.gc
    if(!guildCode || !answer) {
      return h.view('error', { err: 'Ei ihan'})
    }
    const checkAnswer = await db.checkAnswer(answer, guildCode);
    console.log(checkAnswer);
    if(checkAnswer == db.RIGHT_ANSWER) {
      await db.updateGuildProgress(guildCode, answer);
      return h.redirect('/?gc=' + guildCode);
    }else if(checkAnswer == db.SAME_ANSWER){
      return h.view('error', {err: 'Koodi on käytetty'});
    } else  {
      return h.view('error', {err: 'Koodi on väärin'});
    }
  }
})


init();
