
load videos into the browser, they get automatically uploaded via WebsSocket to a node.js application, where those assets get transcoded (H264/WebM/OGG).
Then you can  create a composition (=new video), copy videos to the stage, trim them, transform them, stack them and then finally encode them on the server-side using [AviSynth](http://www.avisynth.org) and [ffmpeg](http://www.ffmpeg.org)
Currently each encoding job will produce a H264 encoded video.

Server Side Req:
* node.js
* node-app dependencies (package.json)
* ffmpeg
* avisynth
* mongodb
