create table guilds (
  guild text not null primary key,
  code text unique not null
);

create table guild_answers (
  id serial not null primary key,
  code text references guilds(code),
  answer text,
  created timestamp with time zone not null default now()
);

insert into guilds (guild, code)
values
  ('AS', 'simulink'),
  ('Inkubio', 'punaruseka'),
  ('MK', 'killoistaperhein'),
  ('TiK', 'value'),
  ('FK', 'epsilon'),
  ('SIK', 'voltti'),
  ('AK', 'pallomeri'),
  ('Athene', 'pallas'),
  ('KIK', 'roottori'),
  ('IK', 'hermanni'),
  ('Prodeko', 'flamingo'),
  ('TF', 'teknologen'),
  ('PT', 'orgaaninen'),
  ('DSDSD', 'bigdata');

create table answers (
  id serial not null primary key,
  answer text not null
);

create table locations (
  guild_code text primary key REFERENCES guilds(code),
  latitude decimal not null,
  longitude decimal not null
);

insert into answers (answer)
values
  ('7s8ffo0vj'), ('2bxjkk9g4'), ('hdtgptsqm');