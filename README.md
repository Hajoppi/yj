## YJ sivu

### Tietokanta
Tietokanta toimii docker containerissa
Luo kuva aluksi

```docker build -t yjdb .```

ja sitten käynnistä se

```docker run --rm -d yjdb```

Varmista, että dockerin ip on kirjattu myös .env-tiedostoon kohtaan PGHOST

### Palvelin
Node toimii hyvin pm2 työkalulla

Käynnistä node palvelin

```pm2 start npm -- start```

Nginx kansiossa on default niminen tiedosto. Kopioi se kansioon /etc/nginx/sites-available

Onneksi olkoon, kaiken pitäisi nyt toimia.
