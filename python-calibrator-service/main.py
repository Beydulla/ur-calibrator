from flask import Flask, request
from flask_restful import Api
import threading
import os

from Common.HttpClient import sendFile
from Service.UR5calibrationscript import StartUR5Calibration

app = Flask(__name__)
api = Api(app)


@app.route('/', methods=['GET'])
def home():
    return "<h1>Robot Calibration</h1>"


@app.route('/upload/<projectId>', methods=['POST'])
def upload_file(projectId):
    f = request.files['file']
    filename = f.filename
    filepath = 'resources/input/' + str(projectId) + '/' + filename
    if not os.path.exists(os.path.dirname(filepath)):
        os.makedirs(os.path.dirname(filepath))
    f.save(filepath)
    f.close()
    thr = threading.Thread(target=StartUR5Calibration, args=(projectId, filename,))
    thr.start()
    return 'Calibration started'


@app.route('/test', methods=['GET'])
def test():
    get(1, '')
    return 'successful'


@app.route('/post', methods=['GET'])
def postt():
    sendFile(181)
    return 'successful'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5002')
