from Common.RLink import RLink
import math
from Common.SerialManipulator import SerialManipulator


def UR5Nominal():
    L1 = RLink(0.089159, 0, 0, math.pi / 2);
    L2 = RLink(0, 0, -0.425, 0);
    L3 = RLink(0, 0, -0.39226, 0);
    L4 = RLink(0.10915, 0, 0, math.pi / 2);
    L5 = RLink(0.09465, 0, 0, -math.pi / 2);
    L6 = RLink(0.0823, 0, 0, 0);
    return SerialManipulator([L1, L2, L3, L4, L5, L6])