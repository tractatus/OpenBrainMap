# OpeBrainMap
OpenBrainMap is a Neuroanatomical information System (NIS) designed primarly for being used with mobile devices.
========================
# How to install

- Begin by installing Node.js
```sh
sudo npm install -g cordova
```
- Then install Cordova using npm.
```sh
sudo npm install -g cordova
```

- Ensure Ionic with command line interface CLI is installed by running:
```sh
sudo npm install -g ionic
```

- Now get OpenBrainMap from github:
```sh
ionic start OpenBrainMap https://github.com/tractatus/OpenBrainMap
cd OpenBrainMap
cordova plugin add org.apache.cordova.geolocation
ionic platform add ios
ionic platform add android
ionic serve
```

 
