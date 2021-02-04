import React from 'react';


const BillingAddressForm = (props) => {
    const { billingData, edited, submitted, handleChange }= props;
    console.log(billingData)
    console.log("billingData")
    return (
        <div className="panel panel-default">
            <div className="panel-heading">Billing Data</div>
		<div className="panel-body" style={{ width: '60%', marginLeft: '20%' }}>
                        <div className='form-group row'>
                            <label className="col-lg-3 col-form-label form-control-label" htmlFor="company_name">Company Name</label>
                            <div className="col-lg-9">
                                <input type="text" className="form-control" name="company_name" value={billingData && billingData.company_name || ''} onChange={handleChange} disabled={edited ? "" : "disabled"} />
                            </div>
                            {submitted && !billingData.company_name &&
                                <div className="help-block">Company name is required!</div>
                            }
                        </div>
                        <div className='form-group row'> 
                            <label className="col-lg-3 col-form-label form-control-label" htmlFor="street_address">Street Address</label>
                            <div className="col-lg-9">
                                <input type="text" className="form-control" name="street_address" value={billingData&& billingData.street_address || ''} onChange={handleChange} disabled={edited ? "" : "disabled"} />
                            </div>
                            {submitted && !billingData.street_address &&
                                <div className="help-block">Street address is required!</div>
                            }
                        </div>
                        <div className='form-group row'>
                            <label className="col-lg-3 col-form-label form-control-label" htmlFor="state">State</label>
                            <div className="col-lg-9">
                                <input type="text" className="form-control" name="state" value={billingData&& billingData.state || ''} onChange={handleChange} disabled={edited ? "" : "disabled"} />
                            </div>
                            {submitted && !billingData.state &&
                                <div className="help-block">State is required!</div>
                            }
                        </div>
                        <div className='form-group row'>
                            <label className="col-lg-3 col-form-label form-control-label" htmlFor="city">City</label>
                            <div className="col-lg-9">
                                <input type="text" className="form-control" name="city" value={billingData&& billingData.city || ''} onChange={handleChange} disabled={edited ? "" : "disabled"} />
                            </div>
                            {submitted && !billingData.city &&
                                <div className="help-block">City is required!</div>
                            }
                        </div>
                        <div className='form-group row'>
                            <label className="col-lg-3 col-form-label form-control-label" htmlFor="postal_code">Postal Code</label>
                            <div className="col-lg-9">
                                <input type="text" className="form-control" name="postal_code" value={billingData&& billingData.postal_code || ''} onChange={handleChange} disabled={edited ? "" : "disabled"} />
                            </div>
                            {submitted && !billingData.postal_code &&
                                <div className="help-block">Postal code is required!</div>
                            }
                        </div>
                        <div className='form-group row'>
                            <label className="col-lg-3 col-form-label form-control-label" htmlFor="country">Country</label>
                            <div className="col-lg-9">
                                <input type="text" className="form-control" name="country" value={billingData&& billingData.country || ''} onChange={handleChange} disabled={edited ? "" : "disabled"} />
                            </div>
                            {submitted && !billingData.country &&
                                <div className="help-block">Country is required!</div>
                            }
                        </div>
                        <div className='form-group row'>
                            <label className="col-lg-3 col-form-label form-control-label" htmlFor="vat_id">VAT ID</label>
                            <div className="col-lg-9">
                                <input type="text" className="form-control" name="vat_id" value={billingData&& billingData.vat_id || ''} onChange={handleChange} disabled={edited ? "" : "disabled"} />
                            </div>
                            {submitted && !billingData.vat_id &&
                                <div className="help-block">State is required!</div>
                            }
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-12 text-right">
                                {!edited ?
                                    <button className="btn btn-primary" onClick={props.handleEditButton}>Edit</button>
                                    :
                                    <div>
                                        <button className="btn btn-success" onClick={props.handleSubmitButton} >Save</button>
                                        <button className="btn btn-danger" onClick={props.handleCancelButton} style={{ marginLeft: 15 }}>Cancel</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
        </div>

	)
}
export default BillingAddressForm;