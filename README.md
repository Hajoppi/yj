## YJ sivu


### Käyttöönotto
- Päivitä tarvittavat koodit schema.sql tiedostoon
- Päivitä paljastus aika `index.js` -> `timeOver()`-> `t1` muuttujaan.
- Päivitä paljastus aika `public/main.js` ->`getCountdownTime()`-> `t1` muuttujaan.
- Admin sivusto on `/yojekku19` sen voi muuttaa `index.js` - tiedostosta, sekä admin.html tiedostosta.

### Tietokanta
Tietokanta toimii docker containerissa
Luo kuva aluksi

```docker-compose up```

### Palvelin
Nginx kansiossa on default niminen tiedosto. Kopioi se kansioon /etc/nginx/sites-available

Huom certbotilla kannattaa luoda ssl certit, jotta GPS trackaaminen onnistuu


Onneksi olkoon, kaiken pitäisi nyt toimia.
