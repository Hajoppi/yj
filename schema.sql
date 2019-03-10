create table guild_statuses (
  guild text not null primary key,
  code text unique not null,
  status int not null default 0,
  first_time timestamp,
  second_time timestamp,
  third_time timestamp,
  fourth_time timestamp,
  fifth_time timestamp
);

insert into guild_statuses (guild, code)
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
  ('PT', 'orgaaninen'
);

create table answers (
  id serial not null primary key,
  answer text not null
);

insert into answers (answer)
values
  ('7s8ffo0vj'), ('2bxjkk9g4'), ('hdtgptsqm');
