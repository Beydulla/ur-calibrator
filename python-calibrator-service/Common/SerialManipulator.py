import numpy as np

from Common.prodHTs import prodHTs


class SerialManipulator:
    data = []
    K = 0
    aa = []

    def __init__(self, *varargin):
        if len(varargin) == 1:
            vec = varargin[0]
            self.data = np.array(vec)
        if len(varargin) == 2:
            K = len(varargin[0]) / 4
            self.data = np.array(K, 1)
            i = 0
            while i < len(vec):
                print('do it!')

    def Copy(self):
        data2 = [[], [], [], [], [], []]
        i = 0
        while i < self.K:
            data2[i] = self.data[i].Copy()
            i += 1
        return SerialManipulator(data2)

    def GetParam(self, flags):
        print('Get Param')
        out = np.zeros((1, self.K * 4))[0]
        k = 1
        while k < self.K + 1:
            out[4 * (k - 1): 4 * k] = self.data[k - 1].paramvector
            k += 1

        arr = []
        for i in range(len(flags)):
            if flags[i] == 1:
                arr.append(out[i])
        return arr

    def SetParam(self, x, flags=None):
        if flags is None:
            flags = np.ones((self.K * 4, 1))
        flag_index = 0
        for k in range(self.K):
            i = 0
            ones = int(sum(flags[1:k * 4]))
            for param_index in range(4):
                if flags[flag_index] == 1:
                    self.data[k].paramvector[param_index] = x[ones + i]
                    i += 1
                flag_index += 1
        return self

    def T(self, q):
        self.aa = q
        out = self.data[0].T(q[0, :])

        k = 1
        while k < self.K:
            out = prodHTs(out, self.data[k].T(q[k, :]))
            k += 1

        return out

    @property
    def K(self):
        return len(self.data)

    @property
    def paramvector(self):
        out = np.zeros((1, self.K * 4), float)[0]
        k = 1
        while k < self.K + 1:
            out[(4 * (k - 1)):4 * k] = self.data[k - 1].paramvector
            k += 1
        return out

    @property
    def isTrans(self):
        out = np.zeros((1, self.K * 4), float)[0]
        k = 1
        while k < self.K + 1:
            k += 1
        return True

    @property
    def isTor(self):
        out = np.zeros((1, self.K * 4), float)[0]
        k = 1
        while k < self.K + 1:
            k += 1
        return False
