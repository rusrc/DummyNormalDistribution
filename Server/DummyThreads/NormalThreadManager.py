from typing import List
from DummyThreads.DummyThread import DummyThread


class NormalThreadManager:
    normal_threads: List[DummyThread] = []

    def add_thread(self, thread: DummyThread):
        self.normal_threads.append(thread)

    def run(self):
        for thread in self.normal_threads:
            if not thread.is_alive():
                thread.start()

    def restart(self, mean, standard_dev):
        for thread in self.normal_threads:
            if thread.is_alive() is True:
                thread.restart(mean, standard_dev)

    def get_normals(self) -> [float]:
        result = []
        for thread in self.normal_threads:
            var_normal = thread.get_normal()
            result.append(var_normal)

        return result

    def stop(self):
        for thread in self.normal_threads:
            if thread.isAlive() is True:
                thread.stop()

    def threadsExists(self):
        return len(self.normal_threads) > 0

    def isRunning(self):
        if len(self.normal_threads) > 0:
            for thread in self.normal_threads:
                if thread.is_alive():
                    return True
            return False
