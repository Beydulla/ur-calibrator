import requests


def sendFile(projectId):
    print('send file')
    url = 'http://ur-calibrator_server_1:3800/projects/python/callback/' + str(projectId)
    urdffilename = 'calibration_result' + str(projectId) + '.urdf'
    previewfilename = 'preview' + str(projectId) + '.pdf'
    dhfilename = 'DH_Params' + str(projectId) + '.pdf'
    outdir = 'resources/output/' + str(projectId) + '/'

    files = [('file', open(outdir + urdffilename, 'rb')),
             ('file', open(outdir + previewfilename, 'rb')),
             ('file', open(outdir + dhfilename, 'rb'))]
    x = requests.post(url, files=files)
    print(x)

