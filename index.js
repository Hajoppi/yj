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
    path: '/static/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true,
      }
    }
  });
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
  console.log(dif);
  return dif < 0;
}

server.route({
  method: 'GET',
  path: '/{gc?}',
  handler: async function(request, h) {
    const code = request.params.gc;
    console.log("code is: " + code);
    if (!code) {
      return h.view('error', { err: 'Ei laiteta tällästä', back: 'hidden' })
    }
    try {
      const data = await db.getGuildInfo(code);
      if(!timeOver()) {
        return h.view('index', {
          guild: data.guild,
          gc: code,
          final_clue: data.progress,
          en: data.guild === "DSDSD"
        });
      } else {
        let finalClue = '';
        if(data.guild === "DSDSD") {
          finalClue = db.final_clue_states_en[5];
        } else {
          finalClue = db.final_clue_states[5];
        }
        return h.view('final', {
          guild: data.guild,
          gc: code,
          final_clue: finalClue,
          en: data.guild === "DSDSD",
          shout: data.shout
        });
      }
    } catch(err) {
      console.log(err);
      return h.view('error', { err: 'Ei ihan', back: 'hidden'})
    }
  }
});

server.route({
  method: 'POST',
  path: '/',
  handler: async function(request, h) {
    const answer = request.payload.answer;
    const guildCode = request.payload.gc;
    if(!guildCode || !answer) {
      return h.view('error', { err: 'Ei ihan', back: 'hidden'})
    }
    const checkAnswer = await db.checkAnswer(answer, guildCode);
    if(checkAnswer == db.RIGHT_ANSWER) {
      await db.updateGuildProgress(guildCode, answer);
      return h.redirect('/' + guildCode);
    }else if(checkAnswer == db.SAME_ANSWER){
      return h.view('error', {err: 'Koodi on käytetty', back: 'style="visibility: visible'});
    } else  {
      return h.view('error', {err: 'Koodi on väärin', back: 'style="visibility: visible'});
    }
  }
})

server.route({
  method: 'GET',
  path: '/yojekku19',
  handler: async function(request, h) {
    try {
      const statuses = await db.getAllStatuses();
      return h.view('admin', { statuses: statuses });
    } catch(error) {
      console.log(error);
      return h.view('error', {err: 'Ei onnistunut'})
    }
  }
});

server.route({
  method: 'POST',
  path: '/yojekku19',
  handler: async function(request, h) {
    const guildCode = request.payload.gc;
    await db.revealClues(guildCode);
    console.log(`Revealed clues for ${guildCode}`);
    return h.redirect('/yojekku19');
  }
});

server.route({
  method: 'POST',
  path: '/gps',
  handler: async (request, h) => {
    try {
      const res = await db.updateGuildLocation(request.payload);
      return res;
    } catch(error) {
      console.error(error);
      throw error;
    } 
  }
});

server.route({
  method: 'GET',
  path: '/gps',
  handler: async (request, h) => {
    try {
      const result = await db.getGuildLocations();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
})

init();
