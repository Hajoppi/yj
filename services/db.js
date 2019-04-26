const { Pool } = require('pg');
const pool = new Pool();
const db = module.exports = {};


pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const extraClueGuilds = ['AK','FK', 'Inkubio','DSDSD'];

db.final_clue_states = [
  '___________ _______________ _____',
  '__ko__t____ _a___o_____a___ __:15',
  '__ko__t_k__ _as__o___nna__a 2_:15',
  'K_koo_t_ka_ _asi_on__nna_sa 23.15',
  'Kokoontukaa Kasinonrannassa 23.15',
  'Kokoontukaa Kasinonrannassa 23.15'
];

db.final_clue_states_en = [
  '______ __ ____________ __ _____',
  'G____r _t _a__________ __ __:15',
  'G__h_r at _as__onr_n_a a_ 2_:15',
  'G_th_r at Kas__onr_n_a at 23:15',
  'Gather at Kasinonranta at 23:15',
  'Gather at Kasinonranta at 23:15'
];

db.WRONG_ANSWER = 0;
db.SAME_ANSWER = 1;
db.RIGHT_ANSWER = 2;

db.getGuildProgess = async (code) => {
  const res = await pool.query('SELECT answer from guild_answers where code=$1', [code]);
  if (res.rowCount > 5) res.rowCount = 5;
  return res.rowCount;
}

db.getGuildInfo = async (code) => {
  const { rows } = await pool.query('SELECT * from guilds where code=$1', [code]);
  const result = rows[0];
  let buffer = 0;
  let progress = await db.getGuildProgess(code);
  if(extraClueGuilds.indexOf(result.guild) == -1 && progress >= 1) {
    progress += 1;
  }
  if(result.guild == 'DSDSD') {
    result.progress = db.final_clue_states_en[progress];
  } else {
    result.progress = db.final_clue_states[progress];
  }
  return result;
};

db.getAllStatuses = async () => {
  const { rows } = await pool.query('SELECT guild, guilds.code, answer, created FROM guilds LEFT OUTER JOIN guild_answers ON (guilds.code = guild_answers.code) ORDER BY guild asc');
  const result = {};
  rows.forEach( (row) => {
    const object = {
      answer: row.answer,
      created: row.created
    };
    if(object.created === null && !result[row.guild]) {
      result[row.guild] = { code: row.code, answers: [] };
    }
    else if(!result[row.guild]) {
      result[row.guild] = { code: row.code, answers: [object] };
    } else {
      result[row.guild].answers.push(object);
    }
  });
  return result;
};

db.checkAnswer = async (answer, code) => {
  const answerQuery = pool.query('SELECT answer from answers where answer=$1', [answer]);
  const formerAnswersQuery = pool.query('SELECT answer from guild_answers where code=$1', [code]);
  const res = await answerQuery;
  const formerAnswers = await formerAnswersQuery;
  if (res.rowCount < 1) {
    return db.WRONG_ANSWER;
  } else if (!formerAnswers.rows.every( a => a.answer !== answer)) {
    return db.SAME_ANSWER;
  } else {
    return db.RIGHT_ANSWER;
  }
};

db.updateGuildProgress = async (code, answer) => {
  const res = await pool.query('INSERT into guild_answers (code, answer) values ($1, $2)', [code, answer]);
  return res;
};

db.revealClues = async (code) => {
  const q1 = pool.query('INSERT into guild_answers (code, answer) values ($1, $2)', [code, 'revealed']);
  const q2 = pool.query('INSERT into guild_answers (code, answer) values ($1, $2)', [code, 'revealed']);
  const q3 = pool.query('INSERT into guild_answers (code, answer) values ($1, $2)', [code, 'revealed']);
  return await Promise.all([q1, q2, q3]);
}

db.terminate = async () => {
  await pool.end();
};

db.updateGuildLocation = async (data) => {
  console.log(data);
  const query = await pool.query('INSERT INTO locations (guild, latitude, longitude) values ($1, $2, $3)' +
   'ON CONFLICT (guild) DO UPDATE SET latitude = excluded.latitude, longitude = excluded.longitude',
   [data.guild, data.latitude, data.longitude]);
  console.log("Updated GPS coordinates");
  return query;
}

db.getGuildLocations = async () => {
  const { rows } = await pool.query('SELECT * from locations');
  return rows;
}
