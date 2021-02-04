import numpy as np
from scipy import optimize

from Common.OptimalTransformation import OptimalTransformation
from Common.prodHT import prodHT


def optfunc(x, out, flags, q, pcam):
    return cost(out.SetParam(x, flags), q, pcam)


def endeffector_calibration(robot, pcam, q):
    out = robot.Copy()

    flags = np.array((np.zeros((out.K - 1) * 4)))
    flags = np.insert(flags, 20, np.ones((3, 1)[0]))
    flags = np.insert(flags, len(flags), 0)

    x = out.GetParam(flags)
    res0 = np.inf
    res1 = np.inf
    for i in range(10):
        lambdafunc = lambda x0: optfunc(x0, out, flags, q, pcam)
        result = optimize.fmin(lambdafunc, x0=x, maxfun=1e20, maxiter=1, full_output=1)
        x = result[0]
        res = result[1]
        out.SetParam(x, flags)
        tres = 1e-3
        if (res > (1 - tres) * res0) & (res > (1 - tres) * res1):
            break
        else:
            res0 = res1
            res1 = res

    return out


def cost(robot, q, p):
    [none, e] = OptimalTransformation(prodHT(robot.T(q), np.zeros((1, 3)).reshape(3, 1)), p)
    a = robot.T(q)
    return e['sum']
