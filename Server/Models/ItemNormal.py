class ItemNormal:
    _mean = 0
    _standard_dev = 0

    def __init__(self, mean, standard_dev):
        self._mean = mean
        self._standard_dev = standard_dev

    def get_mean(self) -> float:
        return self._mean

    def get_standard_dev(self) -> float:
        return self._standard_dev
