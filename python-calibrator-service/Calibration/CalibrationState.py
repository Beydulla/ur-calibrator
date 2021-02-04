import numpy as np

from Common.OptimalTransformation import OptimalTransformation


class CalibrationState:
    robot = {}
    errors = []
    T_cam_rob = []
    name = []
    p = []
    q = []
    prs = []

    def __init__(self, robot, p, q, name):
        self.robot = robot
        T = robot.T(q)
        pr = T[0:3, 3:4, ]

        pr = pr.reshape((3, np.size(pr, 2)))
        self.prs = pr
        [self.T_cam_rob, self.errors] = OptimalTransformation(p, pr)
        self.p = p
        self.q = q
        self.name = name

    def Copy(self):
        return CalibrationState(self.robot, self.p, self, self.q, self.name)
