import math

import pdfkit


def GenDHParams(projectId, robot):
    template = '<html>' + \
              '<head>' + \
              '<style> table, th, td { border: 1px solid black; ' + \
              ' table-layout: fixed; width: 250px;} </style>' \
              '</head>' + \
              '<body>' + \
              '<table>' + \
              '<thead >' + \
              '<th>D-H Parameters</th>' + \
              '<th>Alpha</th>' + \
              '<th>a</th>' + \
              '<th>d</th>' + \
              '<th>Theta</th>' + \
              '</thead>' + \
              '<tbody>' + \
              '</body>' + \
              '</html>'
    for i in range(len(robot.data)):
        template += '<tr>' + \
                    '<th>' + str(i + 1) + '</th>' + \
                    '<th>' + round_up(robot.data[i].alpha) + '</th>' + \
                    '<th>' + round_up(robot.data[i].a) + '</th>' + \
                    '<th>' + round_up(robot.data[i].d) + '</th>' + \
                    '<th>' + round_up(robot.data[i].theta) + '</th>' + \
                    '</tr>'
    template += '</tbody>' + \
                '</table>'

    try:
        path_wkhtmltopdf = '/usr/bin/wkhtmltopdf'
        filepath = 'resources/output/' + str(projectId) + '/DH_Params' + str(projectId) + '.pdf'
        config = pdfkit.configuration(wkhtmltopdf=path_wkhtmltopdf)
        pdfkit.from_string(template, filepath, configuration=config)
    except Exception as e:
        print("dhparam error")
        print(e)


def round_up(value):
    return str(math.ceil(value * 10000.0) / 10000.0)
