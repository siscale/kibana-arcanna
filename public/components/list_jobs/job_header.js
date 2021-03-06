
import React, { Fragment } from 'react';

import {

  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiSpacer,
  EuiText
} from '@elastic/eui';
import { EuiIcon } from '@elastic/eui';





export class JobListHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentDidMount() {

  }

  componentWillUnmount() {

  }

  onClickCreateJob = () => {
    this.props.history.push('create_job');
    // this.componentWillUnmount();
  }


  render() {
    return (
      <Fragment>
        <EuiSpacer size="m"/>
        <EuiFlexGroup gutterSize="s" justifyContent="spaceBetween" alignItems="center">
          <EuiFlexGroup direction="column" grow={false} gutterSize="none" style={{paddingLeft: 30}}>
            <EuiFlexItem>
              <EuiText size="s" color="subdued">
                <EuiIcon type="string" size="m" color="warning" style={{marginRight: 10}}/>
                Trains the Neural Network with the events on which the operator has given feedback.
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiText size="s" color="subdued">
                <EuiIcon type="play" size="m" color="secondary" style={{marginRight: 10}}/>
                Starts feeding new events to the Neural Network for analysis.
              </EuiText>
            </EuiFlexItem>
              <EuiFlexItem>
              <EuiText size="s" color="subdued">
                <EuiIcon type="indexEdit" size="m" color="text" style={{marginRight: 10}}/>
                Allows the operator to give feedback on the Neural Network results, and label events for future training.
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiText size="s" color="subdued"> 
                <EuiIcon type="stopFilled" size="m" color="danger" style={{marginRight: 10}}/>
                Stops the job's current task.
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexItem grow={false} style={{paddingRight: 10}}>
            <EuiButton fill onClick={this.onClickCreateJob}>
              Create new job
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="l"/>
      </Fragment>
    );
  }
}