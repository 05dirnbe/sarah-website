module.exports = {
  "title": "Sarah's Lab",
  "company": "Sarah Lindner",
  "version": "1.0.1",
  "url": "https://www.sarahslab.net",
  "baseurl": "",
  "repo": "https://github.com/sarah-lindner/sarahslab-website",
  "comments": false,
  "author": {
    "name": "Sarah Lindner",
    "email": "sarah.lindner@uni-graz.at",
    "linkedin": "https://at.linkedin.com/in/sarah-lindner-0a7973171",
    "card": "https://online.uni-graz.at/kfu_online/visitenkarte.show_vcard?pPersonenId=B0BB96B40B8F88C7&pPersonenGruppe=3",
    "courses":"https://online.uni-graz.at/kfu_online/wblvangebot.wbshowlvoffer?ppersonnr=72850",
  },
  "adress": {
    "room": {
      name: "Room 0005010230",
      url: "https://online.uni-graz.at/kfu_online/ris.einzelraum?raumkey=104482"
    },
    "lab": {
      url: "https://online.uni-graz.at/kfu_online/ris.ris?corg=14158&pQuellGeogrBTypNr=5&pZielGeogrBTypNr=5&pZielGeogrBerNr=5770001&pRaumNr=104624&pActionFlag=A&pShowEinzelraum=J#"
    },
    "name": "653 Institut für Physik",
    "street": "Universitätsplatz 5",
    "city": "8010 Graz",
    "country": "Austria",
  },
  "env": process.env.ELEVENTY_ENV || "not_development",
  "og_locale": "en_US"
}
