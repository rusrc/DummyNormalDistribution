from threading import Thread
import time
import math
import random


class DummyThread(Thread):
    x = -5
    max_range = 5
    _step: float = 0
    _mean: float = 0
    _standard_dev: float = 0

    def __init__(self, mean=0, standard_dev=1, step=0.1):
        self._mean = mean
        self._standard_dev = standard_dev
        self._step = step
        Thread.__init__(self)

    def run(self):
        while self.x <= self.max_range:
            time.sleep(random.randint(1, 1))
            print('sleep: ' + str(self.x))
            self.x = self.x + self._step
        print('Waked up: ' + str(self.x))
        SystemExit()

    def restart(self, mean, standard_dev):
        self.x = -5
        self._mean = mean
        self._standard_dev = standard_dev
        pass

    def get_normal(self) -> float:
        return self._normal_distribution(self.x, self._mean, self._standard_dev)

    def _normal_distribution(self, x, mean, standard_dev):
        first = 1 / (standard_dev * math.sqrt(2 * math.pi))
        second = -(math.pow(x - mean, 2) / math.pow(2 * standard_dev, 2))
        result = first * math.exp(second)
        return result

    def stop(self):
        self.x = self.max_range
        SystemExit()
