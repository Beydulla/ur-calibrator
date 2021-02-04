import React from 'react';
import {formatDate} from "../_helpers/utils";


const HistoryList = (props) => {
    const billingHistory  = Array.from(props.billingHistory);
    return (
        <div style={{ maxWidth: '100%' }}>
            <table className="table table-striped table-bordered" >
                <thead>
                <tr>
                    <th>Created Date</th>
                    <th>Updated Date</th>
                    <th>Currency</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Project ID</th>
                    {<th>Action</th>
                         }
                </tr>
                </thead>
                <tbody>
                {billingHistory.map((data) => {
                    const color = data.status === 'Succeeded' ? 'blue' : 'red'
                    return (
                        <tr key={data.id}>
                            <td>{formatDate(data.created_date)}</td>
                            <td>{formatDate(data.updated_date)}</td>
                            <td>{data.currency}</td>
                            <td>{data.amount}</td>
                            <td>{data.status}</td>
                            <td>{data.project_id}</td>
                            {
                                data.status === 'Succeeded' ?<th><a href='#' onClick={event => props.download(event, data.billingo_id)} title='Download'><span className="glyphicon glyphicon-download-alt red" style={{color: color}}> </span></a></th>
                                    : <th> - </th>
                            }
                        </tr>

                    )
                })}
                </tbody>
            </table>
        </div>
    )
}
export default HistoryList;