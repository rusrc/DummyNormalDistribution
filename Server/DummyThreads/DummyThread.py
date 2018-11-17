from threading import Thread
import time
import math
import random


class DummyThread(Thread):
    x = -5
    _step: float = 0

    def __init__(self, step=0.01):
        self._step = step
        Thread.__init__(self)

    def run(self):
        while self.x < 5:
            time.sleep(random.randint(1, 2))
            self.x = self.x + self._step

    def restart(self, mean, standard_dev):
        self.x = -5
        pass

    def get_normal(self, mean=0, standard_dev=1):
        return self._normal_distibution(self.x, mean, standard_dev)

    def _normal_distibution(self, x, mean, standard_dev):
        first = 1 / (standard_dev * math.sqrt(2 * math.pi))
        second = -(math.pow(x - mean, 2) / math.pow(2 * standard_dev, 2))
        result = first * math.exp(second)
        return result
