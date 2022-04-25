create table guilds (
  guild text not null primary key,
  code text unique not null,
  shout text not null
);

create table guild_answers (
  id serial not null primary key,
  code text references guilds(code),
  answer text,
  created timestamp with time zone not null default now()
);

insert into guilds (guild, code, shout)
values
  ('DSDSD', 'bigdata', 'yöllinen'),
  ('PT', 'orgaaninen', 'teekkarikansa'),
  ('Inkubio', 'ayrshire', 'kutsuu'),
  ('Athene', 'pallas', 'suurta'),
  ('AS', 'simulink', 'arvoa'),
  ('TiK', 'paniikki', 'kantavaa'),
  ('Prodeko', 'flamingo', 'toimitusta'),
  ('FK', 'nabla', 'luoksemme'),
  ('SIK', 'elamasiretki', 'kertomaan'),
  ('KIK', 'keskipakosaadin', 'meille'),
  ('IK', 'hermanni', 'ilosanaa'),
  ('AK', 'kulma-aurinko', 'yön'),
  ('MK', 'tuomasveturi', 'pimeydestä'),
  ('TF', 'sommarochsol', 'valoon!');

create table answers (
  id serial not null primary key,
  answer text not null
);

create table locations (
  guild text primary key REFERENCES guilds(guild),
  latitude decimal not null,
  longitude decimal not null
);

insert into answers (answer)
values
  ('7s8ffo0vj'), ('2bxjkk9g4'), ('hdtgptsqm'), ('djdofnbod');