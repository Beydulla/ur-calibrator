import numpy as np
from scipy import optimize

from Common.OptimalTransformation import OptimalTransformation


def optfunc(x, robot, flags, q, p):
    return cost_(robot.SetParam(x, flags), q, p)


def global_calibration(robot, p, q):
    K = np.size(q, 0)
    flags = np.zeros((2, 1))
    ones = np.concatenate((np.ones((1 + (K - 1) * 4, 1)), [[0]]), 0)
    flags = np.concatenate((flags, ones), 0)
    x = robot.GetParam(flags)
    res0 = np.inf
    res1 = np.inf
    for i in range(10):
        lambdafunc = lambda x0: optfunc(x0, robot, flags, q, p)
        result = optimize.fmin(lambdafunc, x0=x, maxfun=1e20, maxiter=1, full_output=1)
        x = result[0]
        res = result[1]
        robot.SetParam(x, flags)
        tres = 1e-3
        if (res > (1 - tres) * res0) & (res > (1 - tres) * res1):
            break
        else:
            res0 = res1
            res1 = res

    p_robot = robot.T(q)
    p_robot = np.transpose(p_robot[0:3, 3:4, :], [0, 2, 1])
    p_robot = p_robot.reshape(3, p_robot.shape[1])
    OptimalTransformation(p, p_robot)

    return robot


def cost_(robot, q, p):
    p_robot = robot.T(q)
    p_robot = np.transpose(p_robot[0:3, 3:4, :], [0, 2, 1])
    p_robot = p_robot.reshape(3, p_robot.shape[1])

    [none, e] = OptimalTransformation(p, p_robot)

    return e['sum']
