from flask import Flask
from threading import Thread

import time
app = Flask(__name__)

class DummyThread(Thread):
    index = 0.0

    def run(self):
        i = -5
        while i < 5:
            print('start sleep' + str(i))
            time.sleep(1)
            print('stop sleep' + str(i))
            i = i + 0.01
            self.index = i

    def getIndex(self):
        return str(self.index)

dummyThread = DummyThread()
dummyThread.start()

@app.route('/')
def index():
    return dummyThread.getIndex()

if __name__ == '__main__':
    app.run(debug=True)

