from flask import Flask
from flask import request
from flask import jsonify
from typing import List
import json
from DummyThreads.NormalThreadManager import NormalThreadManager
from DummyThreads.DummyThread import DummyThread
from Models.ItemNormal import ItemNormal

app = Flask(__name__)

thread_manager = NormalThreadManager()


@app.route('/', methods=['GET'])
def index():
    return 'Started'


@app.route('/start', methods=['POST'])
def start():
    for element in generate_list(request.json):
        var_mean = element.get_mean()
        var_dev = element.get_standard_dev()
        thread_manager.add_thread(DummyThread(var_mean, var_dev))
        print(var_mean, var_dev)

    thread_manager.run()
    return jsonify(request.json)


@app.route('/restart', methods=['POST'])
def restart():
    for element in generate_list(request.json):
        var_mean = element.get_mean()
        var_dev = element.get_standard_dev()
        print(var_mean, var_dev)

    thread_manager.restart(var_mean, var_dev)
    return jsonify(request.json)


@app.route('/get_normals', methods=['GET'])
def get_normals():
    return jsonify(thread_manager.get_normals())


def generate_list(json_value: json) -> List[ItemNormal]:
    normal_list: List[ItemNormal] = []
    for element in json_value:
        normal_list.append(ItemNormal(element['mean'], element['dev']))

    return normal_list


if __name__ == '__main__':
    app.run(debug=True)
