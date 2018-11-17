from flask import jsonify
from typing import List
from DummyThreads.DummyThread import DummyThread
from Models import ItemNormal


class NormalThreadManager:
    normal_threads: List[DummyThread] = []

    def add_thread(self, thread: DummyThread):
        self.normal_threads.append(thread)

    def run(self):
        for thread in self.normal_threads:
            thread.start()

    def restart(self, mean, standard_dev):
        for thread in self.normal_threads:
            thread.restart(mean, standard_dev)

    def get_normals(self) -> jsonify:
        result = []
        for thread in self.normal_threads:
            var_normal = thread.get_normal()
            result.append(var_normal)

        return jsonify(result)
