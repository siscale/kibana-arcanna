
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import { GenericRequest } from '../../utils/requests';

import { JobEntry } from './job_entry';

import {

  EuiTable,
  EuiTableHeader,
  EuiTableFooter,
  EuiTableBody,
  EuiTableHeaderCell,
  EuiTableRow,
  EuiTableRowCell,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton
} from '@elastic/eui';



export class JobList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      refreshInterval: null
    };
    this.setColumnInfo();
    this.genericRequest = new GenericRequest();
  }

  static propTypes = {
    feedbackJobInformation: PropTypes.object 
  }

  componentDidMount() {
    this.loadData();
    this.setState({refreshInterval : setInterval(this.loadData, 5000)});
    // this.loadData();
    this.setColumnInfo();
  }

  componentWillUnmount() {
    clearInterval(this.state.refreshInterval);
  }

  setColumnInfo() {
    this.columns = [{
      field: 'job_name',
      name: 'Job name'
    }, {
      field: 'created_at',
      name: 'Created at'
    }, {
      field: 'job_status',
      name: 'Job status',
      align:'center'
    }, {
      field: 'training_status',
      name: 'Training status',
      align:'center'
    }, {
      field: 'actions',
      name: ''
    }];
  }

  loadData = async () => {
    const data = await this.genericRequest.request('list_jobs', 'GET');
    if('error' in data) {
      console.error(data.error);
    } else {
      this.setState({jobs: data});
    }
  }

  renderHeaderCells = () => {
    const headers = [];
    
    this.columns.forEach( (column, columnIndex) => {
      headers.push(
        <EuiTableHeaderCell
          key={column.field}
          align={column.align}
        >
          {column.name}
        </EuiTableHeaderCell>
      );
    });
    return headers.length ? headers : null;
  }


  renderRows() {
    const rows = [];
    this.state.jobs.forEach( (job, jobIndex) => {
      rows.push(
        <JobEntry
          key={job._id}
          jobData={job}
          feedbackFunction={this.onFeedbackClick}
          trainFunction={this.onTrainClick}
          evaluateFunction={this.onEvaluateClick}
          stopFunction={this.onStopClick}
          deleteFunction={this.onDeleteClick}
        />
      );
    });

    return rows;
  }

  onFeedbackClick = (jobId) => {
    let i = 0;
    let jobToReturn = null;
    for(; i < this.state.jobs.length; ++i) {
      if(this.state.jobs[i]._id === jobId) {
        jobToReturn = this.state.jobs[i];
      }
    }

    if(jobToReturn !== null) {
      this.props.feedbackJobInformation.jobInformation = jobToReturn;
      window.location.href = '#/feedback';
    }
    
    // this.props.feedbackJobInformation.jobInformation = 
    // window.location.href('#/feedback');
  }

  onTrainClick = async (jobId) => {
    const body = {
      jobId: jobId
    }
    const resp = await this.genericRequest.request('tensorflow/train', "POST", JSON.stringify(body));
    

  }

  onEvaluateClick = async (jobId) => {
    const body = {
      jobId: jobId
    }
    const resp = await this.genericRequest.request('tensorflow/evaluate', "POST", JSON.stringify(body));
  }

  onStopClick = async (jobId) => {
    const body = {
      jobId: jobId
    }
    const resp = await this.genericRequest.request('tensorflow/stop', "POST", JSON.stringify(body));
  }

  onDeleteClick = async (jobId) => {
    const body = {
      jobId: jobId
    }
    const resp = await this.genericRequest.request('/delete_job', "POST", JSON.stringify(body));
    console.log("I'm here!");
    console.log(resp);
  }

  render() {
    return (
      <Fragment>
        <EuiTable>
          <EuiTableHeader>
            {this.renderHeaderCells()}
          </EuiTableHeader>

          <EuiTableBody>
            {this.renderRows()}
          </EuiTableBody>

          {/* <EuiTableFooter>
            {this.renderFooterCells()}
          </EuiTableFooter> */}
        </EuiTable>
      </Fragment>
    );
  }
}