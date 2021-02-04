from abc import ABC
import numpy as np

from Common.Link import Link


class RLink(Link, ABC):
    Ts = []

    def __init__(self, *varargin):
        super().__init__(*varargin)

    def Copy(self):
        return RLink(self.paramvector)

    def T(self, q):
        print('Rlink T called')
        # q = q.conj().transpose()
        sa = np.sin(self.alpha)
        ca = np.cos(self.alpha)
        st = np.sin(self.theta + q).reshape(1, -1)
        ct = np.cos(self.theta + q).reshape(1, -1)
        N = len(q)
        on = np.ones((1, N))
        ze = np.zeros((1, N))
        out = np.array((
            ct, st, ze, ze,
            -st * ca, ct * ca, sa * on, ze,
            st * sa, -ct * sa, ca * on, ze,
            self.a * ct, self.a * st, self.d * on, on)
        )
        out = out.reshape((16, N))
        print(out.shape)

        out = out.reshape((4, 4, N), order='F')
        self.Ts = out
        return out
