
export var Recorder = function (source, cfg) {
  var config = cfg || {};
  var bufferLen = config.bufferLen || 4096;
  var numChannels = config.numChannels || 2;
  this.context = source.context;
  this.node = (this.context.createScriptProcessor ||
    this.context.createJavaScriptNode).call(this.context,
      bufferLen, numChannels, numChannels);
  var worker = new Worker('/recorderWorker.js');
  worker.postMessage({
    command: 'init',
    config: {
      sampleRate: this.context.sampleRate,
      numChannels: numChannels
    }
  });
  var recording = false,
    currCallback;

  this.node.onaudioprocess = function (e) {
    if (!recording) return;
    var buffer = [];
    for (var channel = 0; channel < numChannels; channel++) {
      buffer.push(e.inputBuffer.getChannelData(channel));
    }
    worker.postMessage({
      command: 'record',
      buffer: buffer
    });
  }

  this.configure = function (cfg) {
    for (var prop in cfg) {
      if (cfg.hasOwnProperty(prop)) {
        config[prop] = cfg[prop];
      }
    }
  }

  this.record = function () {
    recording = true;
  }

  this.stop = function () {
    recording = false;
  }

  this.clear = function () {
    worker.postMessage({ command: 'clear' });
  }

  this.getBuffer = function (cb) {
    currCallback = cb || config.callback;
    worker.postMessage({ command: 'getBuffer' })
  }

  this.exportWAV = function (cb, type) {
    currCallback = cb || config.callback;
    type = type || config.type || 'audio/wav';
    if (!currCallback) throw new Error('Callback not set');
    worker.postMessage({
      command: 'exportWAV',
      type: type
    });
  }

  worker.onmessage = function (e) {
    var blob = e.data;
    currCallback(blob);
  }

  source.connect(this.node);
  this.node.connect(this.context.destination);
};

