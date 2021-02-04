import numpy as np


def prodHTs(T1, T2):
    if T1.shape[2] == 1 & T2.shape[2] == 1:
        return T1 * T2

    if np.size(T1, 2) == 1 & np.size(T2, 2) != 1:
        N = np.size(T2, 2)
        out = T1 * T2.reshape((4, 4 * N))
        return out.reshape((4, 4, N))

    if np.size(T1, 2) != 1 & np.size(T2, 2) == 1:
        N = np.size(T1, 2)
        out = np.transpose(np.expand_dims(T1), (0, 2, 1)).reshape(4 * N, 4) * T2
        reshaped = out.reshape((4, N, 4))
        return np.transpose(np.expand_dims(reshaped), (0, 2, 1))

    if np.size(T1, 2) == np.size(T2, 2):
        N = np.size(T1, 2)
        out = np.zeros((4, 4, N))
        n = 0

        while n < N:
            out[:, :, n] = np.matmul(T1[:, :, n], T2[:, :, n])
            n += 1
        return out
