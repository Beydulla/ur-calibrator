import numpy as np
from Calibration.RobotCalibratorTool import RobotCalibratorTool
from Common.HttpClient import sendFile
from Service.UR5Nominal import UR5Nominal
from Service.loadMeasurement import loadMeasurement
from URDF_Generators.GenDHParams import GenDHParams
from URDF_Generators.GenUR5URDF import GenUR5URDF


def StartUR5Calibration(projectId, filename):
    print(projectId)
    M1 = loadMeasurement('resources/input/' + str(projectId) + '/' + filename)
    q = M1[np.r_[0:6], :]
    pcam = M1[np.r_[6:9], :] / 1000
    robot = UR5Nominal()
    robot.data[5].Set(0.082 + 0.005, 'd')
    robot.data[5].Set(0.05, 'a')
    robot.data[5].Set(0, 'theta')

    tool = RobotCalibratorTool(robot, pcam, q)
    tool.EndeffectorCalibration()
    tool.GlobalCalibration()
    tool.PlotHistory(projectId)

    robot_calibrated = tool.actual.robot
    robot_calibrated.data[5].Set(0.08230 + 0.1488, 'd')
    robot_calibrated.data[5].Set(0, 'a')
    GenDHParams(projectId, robot_calibrated)
    GenUR5URDF(robot_calibrated, projectId)
    sendFile(projectId)

