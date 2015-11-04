function recorderProcess(e) {
    if (recording){
        var left = e.inputBuffer.getChannelData(0);
        ws.send(convertFloat32ToInt16(left));
    }
}

function convertFloat32ToInt16(buffer) {
    l = buffer.length;
    buf = new Int16Array(l);
    while (l--) {
        buf[l] = Math.min(1, buffer[l])*0x7FFF;
    }
    return buf.buffer;
}

var ws = new WebSocket('ws://127.0.0.1:5000/microphone');

ws.onopen = function(evt) {
    console.log('Connected to websocket.');

    ws.send("sample rate:" + sampleRate);

    navigator.getUserMedia({audio: true, video: false},
            initializeRecorder, function(e) {
                console.log('No live audio input: ' + e);
            });
}
