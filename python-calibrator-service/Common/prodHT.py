import numpy as np


def prodHT(T, p):
    print('prodHT started')
    print(T.shape)
    print(p.shape)
    toreduce = 0
    out = []
    if np.size(p, 0) == 3:
        p = np.insert(p, len(p), np.ones((1, np.size(p, 1)))[0]).reshape(4, 1)
        print('if size')
        print(p)
        toreduce = 1

    if np.size(T, 2) == 1:
        print('if1')
        out = np.dot(T, p)
    else:
        N = np.size(T, 2)
        [a, b] = p.shape
        if b == 1:
            print('if2')
            print(T[:, :, 0])

            T = np.transpose(T, (0, 2, 1)).reshape(4 * N, 4)
            out = np.dot(T, p)
            out = out.reshape((4, N))
            print('out if 2value')
        elif N == np.size(p, 1):
            print('elif1')
            out = np.zeros((4, N))[0]
            n = 0
            while n < N:
                out[:, n] = np.dot(T[:, :, n], p[:, n])
                n += 1

    if toreduce:
        out = out[0:3, :]

    print('toreduce value')
    #print(out)
    return out
