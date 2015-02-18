
# Real-time Location Tracking

A webapp for real-time visualization of mobile GPS data unsing Socket.io.
GPS data is sent through web sockets to a web client which plots them in real time on a map.

## How to use
### For the web interface:
```
$ cd realtime-location-tracking/web
$ npm install
$ node index.js
```
And point your browser to `http://localhost:3000/`

HTML, CSS, and Javascript for the web interface can be found in the "master" folder.

## Features
The app will track the locations in real time of multiple users.