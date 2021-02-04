import numpy as np


def OptimalTransformation(points1, points2):
    print('OptimalTransformation started')
    N = np.size(points1, 1)
    cog1 = points1.mean(1).reshape(3, 1)
    cog2 = points2.mean(1).reshape(3, 1)
    points1_ = points1 - cog1
    points2_ = points2 - cog2
    # print(points2_)
    toSVD = np.zeros((3, 3))
    i = 0
    while i < N:
        toSVD = toSVD + (points2_[:, i] * points1_[:, i].reshape((-1, 1))).conj().transpose()
        i += 1
    [U, B, V] = np.linalg.svd(toSVD)
    print(U.shape)
    print(V.shape)
    rotation = np.matmul(V.conj().transpose(), U.conj().transpose())

    if np.linalg.det(rotation) < 0:
        V[:, 2] = -V[:, 2]
        rotation = np.matmul(V.conj().transpose(), U.conj().transpose())
    offset = cog1 - np.dot(rotation, cog2)
    print(offset)
    T = np.array([
        [rotation[0][0], rotation[0][1], rotation[0][2], offset[0][0]],
        [rotation[1][0], rotation[1][1], rotation[1][2], offset[1][0]],
        [rotation[2][0], rotation[2][1], rotation[2][2], offset[2][0]],
        [0, 0, 0, 1]
         ])
    vec = points1 - (np.dot(rotation, points2) + offset)
    summ = sum(np.diag(np.dot(vec.conj().transpose(), vec)))
    norm = np.sqrt(np.diag(np.dot(vec.conj().transpose(), vec)))
    errors = {'vec': vec, 'sum': summ, 'norms': norm}
    print('OptimalTransformation  end')
    return [T, errors]

