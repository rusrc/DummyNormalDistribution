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


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        for element in generate_list(request.json):
            thread_manager.add_thread(DummyThread())
            print(element.get_mean(), element.get_standard_dev())
        thread_manager.run()
        return jsonify(request.json)
    else:
        return thread_manager.get_normals()


def generate_list(json_value: json) -> List[ItemNormal]:
    normal_list: List[ItemNormal] = []
    for element in json_value:
        normal_list.append(ItemNormal(element['mean'], element['dev']))

    return normal_list


if __name__ == '__main__':
    app.run(debug=True)
