const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(urdf|URDF)$/)) {
        req.fileValidationError = 'Only URDF file are allowed!';
        return cb(new Error('Only URDF files are allowed!'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;