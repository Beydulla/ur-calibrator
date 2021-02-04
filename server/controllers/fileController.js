'use strict';
const File = require('../model/filesModel');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const fs = require('fs')



exports.downloadFile = function (req, res) {
    var id = req.params.id;
    File.getById(id, function (err, result) {
        if (err) {
            console.log(err);
            res.json({
                error: true,
                message: 'Failed to download file!'
            });
        } else {
            if(result.type == 'processed'){
                if(!isPaymentDone(result)){
                    return res.json({
                        error: true,
                        message: 'Payment is not done!'
                    });
                }
            }
            const filePath = `${appDir}/resources/files/${result.project_id}/${result.folder}/${result.name}`;
            if (fs.existsSync(filePath)) {
                res.download(filePath);
            } else {
                res.json({
                    error: true,
                    message: 'Failed to download file!'
                });
            }
        }
    })
}


 function isPaymentDone(project){
    if(project.status == 'Succeeded'){
        return true;
    }else{
        return false;
    }
}

