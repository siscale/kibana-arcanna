import React, {
  Component, Fragment,
} from 'react';

import {
  EuiInMemoryTable,
  EuiBasicTable,
  EuiHealth,
  EuiButton,
  EuiForm
} from '@elastic/eui';

import PropTypes from 'prop-types';

import moment from 'moment';

import { GenericRequest } from '../../../../services';
import { EuiText } from '@elastic/eui';

export class IndexSelection extends Component {
  constructor(props) {
    super(props);
    this.genericRequest = new GenericRequest();
    this.state = {
      rows: [],
      stillLoading: true,
      selectedItems: []
    };
    this.setColumnInfo();
  }

  static propTypes = {
    updateIndexList: PropTypes.func.isRequired,
    nextPage: PropTypes.string,
    previousPage: PropTypes.string
  }

  setColumnInfo() {
    this.columns = [{
      field: 'index_name',
      name: 'Index Name',
      sortable: true
    }, {
      field: 'state',
      name: 'State',
      sortable: true,
      render: (state) => {
        const color = state ? 'success' : 'danger';
        const label = state ? 'Open' : 'Closed';
        return <EuiHealth color={color}>{label}</EuiHealth>;
      }
    }, {
      field: 'creation_date',
      name: 'Creation Date',
      dataType: 'date',
      sortable: true,
      render: (date) => moment(date).toISOString()
    }, {
      field: 'number_of_shards',
      name: 'Number of Shards',
      sortable: false
    }, {
      field: 'number_of_replicas',
      name: 'Number of Replicas',
      sortable: false
    }];
  }

  componentDidMount() {
    this.retrieveEntries();
  }

  timeConverter(timestamp) {
    const x = Number(timestamp);
    const m = moment(x);
    return m.format('M/D/YYYY H:mm');
  }

  async retrieveEntries() {
    const self = this;
    const rows = [];
    const indexData = await self.genericRequest.request('list_indices', 'GET');
    Object.keys(indexData).forEach(function (key) {
      try {
        const obj = indexData[key];
        rows.push({
          index_name: key,
          state: obj.state === 'open' ? true : false,
          creation_date: Number(obj.settings.index.creation_date),
          number_of_shards: obj.settings.index.number_of_shards,
          number_of_replicas: obj.settings.index.number_of_replicas
        });
      } catch (error) {
        console.error(error);
      }
    });
    self.setState({
      rows: rows,
      stillLoading: false
    });
    // this.componentWillUpdate();
  }


  onSelectionChange = (selectedItems) => {
    this.setState({
      selectedItems: selectedItems
    })
  };

  onClickSubmit(self) {
    if (self.state.selectedItems.length === 0) {
      return;
    }
    self.props.updateIndexList(self.state.selectedItems);
    // self.props.selectedIndexList.length = 0;
    // self.state.selectedItems.forEach((element) => {
    //   self.props.selectedIndexList.push(element);
    // });
    // self.

    this.props.history.push(this.props.nextPage);
    // this.props.history.push('create_job/select_mappings');
  }

  renderSubmitButton() {
    const self = this;
    const selection = this.state.selectedItems;
    if (selection.length === 0) {
      return;
    }

    return (
      <EuiButton onClick={() => this.onClickSubmit(self)}>
        Select {selection.length} indices
      </EuiButton>
    );
  }

  render() {
    const selection = {
      selectable: (index) => index.state,
      onSelectionChange: (selection) => this.onSelectionChange(selection)
    };

    const search = {
      toolsRight: this.renderSubmitButton(),
      box: {
        incremental: this.state.incremental,
        schema: true
      }
    }
    return (
      <EuiForm>

        <EuiInMemoryTable
          items={this.state.rows}
          itemId="index_name"
          loading={this.state.stillLoading}
          columns={this.columns}
          pagination={false}
          selection={selection}
          isSelectable={true}
          search={search}
          sorting={true}
        />
        <h2></h2>
      </EuiForm>
    );
  }
}