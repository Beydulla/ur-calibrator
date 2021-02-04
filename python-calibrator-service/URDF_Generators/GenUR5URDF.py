import numpy as np
from datetime import date
import os


def GenUR5URDF(robot, projectId):
    formatstring = '%10.20e '
    DH = robot.data
    geom = [[], [], [], [], [], []]
    n = 0
    while n < 6:
        st = np.sin(DH[n].theta)
        ct = np.cos(DH[n].theta)

        conc_ct = DH[n].a * ct
        conc_st = DH[n].a * st
        geom[n] = {'xyz': [], 'rpy': []}
        geom[n]['xyz'] = np.array((conc_ct, conc_st, DH[n].d))
        geom[n]['rpy'] = np.array((DH[n].alpha, 0, DH[n].theta))
        n += 1

    out = '<!-- * * * Exported at {} * * * -->\n'.format(date.today())
    out += '<robot name="UR5"> \n <!-- * * * Link Definitions * * * --> \n'

    geometry_l0 = {'type': 'cylinder', 'h': '', 'r': '', 'xyz': '', 'rpy': ''}
    l11_h = DH[0].d + 0.06 + 0.02
    l11_r = 0.120 / 2
    geometry_l0['h'] = l11_h
    geometry_l0['r'] = l11_r
    geometry_l0['xyz'] = [0, 0, l11_h / 2]
    geometry_l0['rpy'] = [0, 0, 0]

    geometry_l1 = {'type': 'cylinder', 'h': '', 'r': '', 'xyz': '', 'rpy': ''}
    l21_h = 0.210
    l21_r = 0.120 / 2
    geometry_l1['h'] = l21_h
    geometry_l1['r'] = l21_r
    geometry_l1['xyz'] = [0, l21_h / 2, DH[0].d]
    geometry_l1['rpy'] = [np.pi / 2, 0, 0]

    geometry_l21 = {'type': 'cylinder', 'h': '', 'r': '', 'xyz': '', 'rpy': ''}
    l22_h = DH[1].a
    l22_r = 0.120 / 2
    geometry_l21['h'] = -l22_h
    geometry_l21['r'] = l22_r
    geometry_l21['xyz'] = [l22_h / 2, 0, 0.1342]
    geometry_l21['rpy'] = [0, -np.pi / 2, 0]

    geometry_l22 = {'type': 'cylinder', 'h': '', 'r': '', 'xyz': '', 'rpy': ''}
    l23_h = 0.19 + 0.075 / 2
    l23_r = l21_r
    geometry_l22['h'] = l23_h
    geometry_l22['r'] = l23_r
    geometry_l22['xyz'] = [l22_h, 0, l21_h - l23_h / 2]
    geometry_l22['rpy'] = [0, 0, 0]

    geometry_l3 = {'type': 'cylinder', 'h': '', 'r': '', 'xyz': '', 'rpy': ''}
    l3_h = DH[2].a
    l3_r = 0.075 / 2 + 0.005
    geometry_l3['h'] = -l3_h
    geometry_l3['r'] = l3_r
    geometry_l3['xyz'] = [l3_h / 2, 0, 0.1342 - 0.11895]
    geometry_l3['rpy'] = [0, - np.pi / 2, 0]

    geometry_l4 = {'type': 'cylinder', 'h': '', 'r': '', 'xyz': '', 'rpy': ''}
    l4_h = 0.160
    l4_r = 0.075 / 2 + 0.005
    geometry_l4['h'] = l4_h
    geometry_l4['r'] = l4_r
    geometry_l4['xyz'] = [0, 0, 0.1342 - 0.11895 + 0.09475 - l4_h / 2]
    geometry_l4['rpy'] = [0, 0, 0]

    geometry_l5 = {'type': 'cylinder', 'h': '', 'r': '', 'xyz': '', 'rpy': ''}
    l5_h = l4_h
    l5_r = l4_r
    geometry_l5['h'] = l5_h
    geometry_l5['r'] = l5_r
    geometry_l5['xyz'] = [0, 0, DH[4].d - l5_h / 2]
    geometry_l5['rpy'] = [0, 0, 0]

    geometry_l6 = {'type': 'cylinder', 'h': '', 'r': '', 'xyz': '', 'rpy': ''}
    l6_h = 0.160
    l6_r = 0.075 / 2 + 0.005
    geometry_l6['h'] = l6_h
    geometry_l6['r'] = l6_r
    geometry_l6['xyz'] = [0, 0, - l6_h / 2 + DH[5].d]
    geometry_l6['rpy'] = [0, 0, 0]

    geometry_l7 = {'type': 'box', 'size': '', 'xyz': '', 'rpy': ''}
    l7_l = DH[5].d
    geometry_l7['size'] = [0.025, 0.04, l7_l]
    geometry_l7['xyz'] = [0, 0, - l7_l / 2]
    geometry_l7['rpy'] = [0, 0, 0]

    out += genLink('base_link', geometry_l0, 'fos', [0.1, 0.1, 0.2, 1])
    out += genLink('shoulder_link', geometry_l1, 'fos2', [0.6, 0.7, 0.2, 1])
    out += genLink('upper_arm_link', geometry_l21, 'fos3', [0.6, 0.0, 0.7, 1])
    out += genLink('upper_arm_link_2', geometry_l21, 'fos3', [0.6, 0.0, 0.7, 1])
    out += genLink('forearm_link', geometry_l3, 'fos3', [0.6, 0.9, 0.7, 1])
    out += genLink('wrist_1_link', geometry_l4, 'fos4', [0.3, 0.1, 0.9, 1])
    out += genLink('wrist_2_link', geometry_l5, 'fos5', [0.5, 0.5, 0.5, 1])
    out += genLink('wrist_3_link', geometry_l6, 'fos7', [0.9, 0.1, 0.1, 1])
    out += genLink('ee1_link', geometry_l7, 'fos8', [0.9, 0.2, 0.6, 1])

    out += '<!-- * * * Joint Definitions * * * --> \n'

    out += genJoint('shoulder_pan_joint', [0, 0, 0], [0, 0, 0], 'base_link', 'shoulder_link', formatstring)
    out += genJoint('shoulder_lift_joint', geom[0]['xyz'], geom[0]['rpy'], 'shoulder_link', 'upper_arm_link',
                    formatstring)
    out += genJoint('elbow_joint', geom[1]['xyz'], geom[1]['rpy'], 'upper_arm_link', 'forearm_link', formatstring)
    out += genJoint('upper_arm_2_joint', [0, 0, 0], [0, 0, 0], 'upper_arm_link', 'upper_arm_link_2', formatstring, 1)
    out += genJoint('wrist_1_joint', geom[2]['xyz'], geom[2]['rpy'], 'forearm_link', 'wrist_1_link', formatstring)
    out += genJoint('wrist_2_joint', geom[3]['xyz'], geom[3]['rpy'], 'wrist_1_link', 'wrist_2_link', formatstring)
    out += genJoint('wrist_3_joint', geom[4]['xyz'], geom[4]['rpy'], 'wrist_2_link', 'wrist_3_link', formatstring)
    out += genJoint('ee1_fixed_joint', geom[5]['xyz'], geom[5]['rpy'], 'wrist_3_link', 'ee1_link', formatstring, 1)

    out += '</robot>'

    filepath = 'resources/output/' + str(projectId) + '/calibration_result' + str(projectId) + '.urdf'
    if not os.path.exists(os.path.dirname(filepath)):
        os.makedirs(os.path.dirname(filepath))
    file = open(filepath, 'w')
    file.write(out)
    file.close()
    print('saved')
    return out


def genJoint(name, xyz, rpy, parent_name, child_name, formatstring, fixed=0):
    if fixed:
        type = 'fixed'
    else:
        type = 'revolute'
        print('xyz')
    print(printvec(xyz, formatstring))
    axis = np.array((0, 0, 1))
    out = '<joint name="' + name + '" type="' + type + '"> \n'
    out += '  <origin xyz="' + printvec(xyz, formatstring) + '" rpy="' + printvec(rpy, formatstring) + '"/> \n'
    out += '  <parent link="' + parent_name + '"/> \n'
    out += '  <child link="' + child_name + '"/>  \n'
    out += '  <axis xyz="' + printvec(axis, formatstring) + '" /> \n'
    out += '  <limit lower="-3.14" upper="3.14" effort="150.0" velocity="3.15"/> \n'
    out += '</joint> \n'
    return out


def genLink(name, geometry, materialname, materialrgba):
    out = '<link name="' + name + '">\n'
    if geometry:
        geom = genGeometry(geometry)
        out += ' <visual> \n' + geom
        out += '  <material name="' + materialname + '"> \n' + '   <color rgba="' + printvec(materialrgba,
                                                                                             '%f') + '"/> \n '
        out += '  </material> \n  </visual> \n  <collision> \n'
        out += geom + ' </collision>'
    out += '</link> \n'
    return out


def genGeometry(geometry):
    out = '<origin xyz="' + printvec(geometry['xyz'], '%f')
    out += '" rpy="' + printvec(geometry['rpy'], '%f') + '"/> \n'
    out += '  <geometry> \n'
    if geometry['type'] == 'box':
        out += '<box size="' + printvec(geometry['size'], '%f') + '"/> \n'
    elif geometry['type'] == 'cylinder':
        out += ' <cylinder radius="' + str(geometry['r']) + '" length="' + str(geometry['h']) + '"/> \n'

    out += '</geometry> \n'
    return out


def printvec(vec, formatstring):
    out = ''
    i = 0
    for i in range(len(vec)):
        out += str(vec[i])
        if i < len(vec):
            out += ' '
    print(vec)
    print('vec')
    return out
