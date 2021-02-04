import abc
import numpy as np


class Link:
    paramvector = []

    def __init__(self, *varargin):
        if len(varargin) == 1:
            self.paramvector = varargin[0]
        else:
            d = varargin[0]
            theta = varargin[1]
            a = varargin[2]
            alpha = varargin[3]
            self.paramvector = [d, theta, a, alpha]

    @abc.abstractmethod
    def T(self, q):
        pass

    @abc.abstractmethod
    def Copy(self):
        pass

    def Set(self, value, name):
        if name == 'd':
            self.paramvector[0] = value
        elif name == 'theta':
            self.paramvector[1] = value
        elif name == 'a':
            self.paramvector[2] = value
        else:
            self.paramvector[3] = value

    def SetParam(self, x, flags):
        print('Link set param')
        pass

    def GetParam(self, flags):
        return self.paramvector

    @property
    def T0(self):
        sa = np.sin(self.alpha)
        ca = np.cos(self.alpha)
        st = np.sin(self.theta)
        ct = np.cos(self.theta)
        out = np.array(([ct, -st*ca, st*sa, self.a*ct],
                        [st, ct*ca, -ct*sa, self.a*st],
                        [0, sa, ca, self.d],
                        [0, 0, 0, 1]))

        return out

    @property
    def d(self):
        return self.paramvector[0]

    @property
    def theta(self):
        return self.paramvector[1]

    @property
    def a(self):
        return self.paramvector[2]

    @property
    def alpha(self):
        return self.paramvector[3]
