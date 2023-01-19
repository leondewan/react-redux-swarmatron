
export const Recorder = (source, cfg) => {
  const config = cfg || {};
  const bufferLen = config.bufferLen || 4096;
  const numChannels = config.numChannels || 2;
  const { context = {} } = source;
  const node = (context.createScriptProcessor ||
    context.createJavaScriptNode).call(context,
      bufferLen, numChannels, numChannels);
  const worker = new Worker('/recorderWorker.js');
  worker.postMessage({
    command: 'init',
    config: {
      sampleRate: context.sampleRate,
      numChannels: numChannels
    }
  });
  let recording = false;
  let currCallback;

  node.onaudioprocess = e => {
    if (!recording) return;
    const buffer = [];
    for (let channel = 0; channel < numChannels; channel++) {
      buffer.push(e.inputBuffer.getChannelData(channel));
    }
    worker.postMessage({
      command: 'record',
      buffer: buffer
    });
  }
  const _recorder = {
    record() {
      recording = true;
    },
    stop() {
      recording = false;
    },
    clear() {
      worker.postMessage({ command: 'clear' });
    },
    getBuffer(cb) {
      currCallback = cb || config.callback;
      worker.postMessage({ command: 'getBuffer' })
    },
    exportWAV(cb, type) {
      currCallback = cb || config.callback;
      type = type || config.type || 'audio/wav';
      if (!currCallback) throw new Error('Callback not set');
      worker.postMessage({
        command: 'exportWAV',
        type: type
      });
    }
  }

  worker.onmessage = function (e) {
    var blob = e.data;
    currCallback(blob);
  }

  source.connect(node);
  node.connect(context.destination);
  return _recorder;
};

