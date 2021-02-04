import matplotlib.pyplot as plt
import os

from Calibration.CalibrationState import CalibrationState
from Calibration.endeffector_calibration import endeffector_calibration
from Calibration.global_calibration import global_calibration


class RobotCalibratorTool:
    input_p = []
    input_q = []
    history = [[], [], []]
    actual = []

    def __init__(self, robot, p, q):
        self.input_p = p
        self.input_q = q
        self.history[0] = (CalibrationState(robot, p, q, 'Initial model'))
        self.actual = self.history[0]

    def getError(self, i):
        return self.history[i].errors

    def PlotHistory(self, projectId):
        N = len(self.history)
        fig, ax = plt.subplots(1, N, figsize=(16, 10))
        ax = ax.ravel()
        for n in range(N):
            ax[n].hist(self.history[n].errors['norms'] * 1000, color='#0504aa', rwidth=0.92)
            ax[n].set_title(self.history[n].name, fontsize=14)
            ax[n].set_xlabel('Error [mm]', fontsize=11)
            ax[n].set_ylabel('Num. of samples', fontsize=11)
        filepath = 'resources/output/' + str(projectId) + '/preview' + str(projectId) + '.pdf'
        if not os.path.exists(os.path.dirname(filepath)):
            os.makedirs(os.path.dirname(filepath))
        plt.savefig(filepath)

    def EndeffectorCalibration(self):
        new_robot = endeffector_calibration(self.actual.robot, self.input_p, self.input_q)
        self.history[1] = (CalibrationState(new_robot, self.input_p, self.input_q, 'After endeffector calibration'))
        self.actual = self.history[1]

    def GlobalCalibration(self):
        new_robot = global_calibration(self.actual.robot, self.input_p, self.input_q)
        self.history[2] = CalibrationState(new_robot, self.input_p, self.input_q, ' After global calibration')
        self.actual = self.history[2]

    @property
    def input(self):
        return self.history[0]
