# Web application

from flask import Flask, request, abort, render_template, redirect, make_response
from flask.ext.uwsgi_websocket import GeventWebSocket
import numpy

app = Flask(__name__)

#ws = GeventWebSocket(app)


#@ws.route('/microphone') 
def audio(ws):
    first = True
    sample_rate = 0

    while True:
        msg = ws.receive()

        if first and msg is not None:
            sample_rate = 0 # Parse sample rate
        elif msg is not None:
            # Audio array is 16bit
            audio_array = numpy.fromBuffer(msg, 'i2')
        else:
            break

@app.route('/')
def dashboard():
    render_template('dashboard.html')

if __name__ == "__main__":
    app.debug = False
    app.run(host='127.0.0.1')
