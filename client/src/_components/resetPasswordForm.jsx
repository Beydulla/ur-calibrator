import React from 'react';


const ResetPasswordForm = (props) => {
    const { formData, isSubmitted, handleChange, handleSubmit, errorMessage }= props;
    return (
        <div className="panel panel-default">
            <div className="panel-heading">Reset Password</div>
            <div className="panel-body" style={{ width: '70%', marginLeft: '10%' }}>
                <div className={'form-group row ' + (isSubmitted && !formData.oldPassword ? ' has-error' : '')}>
                    <label className="col-lg-4 col-form-label form-control-label" htmlFor="company_name">Old Password</label>
                    <div className="col-lg-8">
                        <input type="password" className="form-control" name="oldPassword" value={formData && formData.oldPassword || ''} onChange={handleChange}  />
                    {isSubmitted && !formData.oldPassword &&
                    <div className="help-block">Old password is required!</div>
                    }
                    </div>
                </div>
                <div className={'form-group row ' + (isSubmitted && !formData.newPassword || errorMessage ? ' has-error' : '')}>
                    <label className="col-lg-4 col-form-label form-control-label" htmlFor="company_name">New Password</label>
                    <div className="col-lg-8">
                        <input type="password" className="form-control" name="newPassword" value={formData && formData.newPassword || ''} onChange={handleChange}  />
                    {isSubmitted && !formData.newPassword &&
                    <div className="help-block">New password is required!</div>
                    }
                    {isSubmitted && formData.newPassword && errorMessage &&
                    <div className="help-block">{errorMessage}</div>
                    }
                    </div>

                </div>
                <div className={'form-group row ' + (isSubmitted && (!formData.confirmPassword || (formData.confirmPassword && formData.confirmPassword!==formData.newPassword)) ? ' has-error' : '')}>
                    <label className="col-lg-4 col-form-label form-control-label" htmlFor="company_name">Confirm Password</label>
                    <div className="col-lg-8">
                        <input type="password" className="form-control" name="confirmPassword" value={formData && formData.confirmPassword || ''} onChange={handleChange}  />
                    {isSubmitted && !formData.confirmPassword &&
                    <div className="help-block">Confirm password is required!</div>
                    }
                    {isSubmitted && formData.confirmPassword && formData.confirmPassword!==formData.newPassword &&
                    <div className="help-block">Confirm password correctly!</div>
                    }
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-12 text-right">
                        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ResetPasswordForm;