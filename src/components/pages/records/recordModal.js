import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';

import './recordModal.scss';
import authRequests from '../../../helpers/data/authRequests';
import recordRequests from '../../../helpers/data/recordRequests';

const defaultRecord = {
  uid: '',
  habitId: '',
  timestamp: '',
  timeSpent: '',
  xpEarned: '',
};


class RecordModal extends React.Component {
  state = {
    newRecord: defaultRecord,
  };

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempRecord = { ...this.state.newRecord };
    tempRecord[name] = e.target.value;
    this.setState({ newRecord: tempRecord });
  }

  recordChange = e => this.formFieldStringState('timeSpent', e);

  experience = () => {
    const { habit } = this.props;
    const { newRecord } = this.state;
    if (habit.isTimed) {
      newRecord.xpEarned = (habit.xpValue) * (newRecord.timeSpent);
    } else {
      newRecord.xpEarned = habit.xpValue;
    }
    return (newRecord.xpEarned);
  }

  formSubmit = (e) => {
    e.preventDefault();
    const { habit, onSubmit, toggle } = this.props;
    const myRecord = { ...this.state.newRecord };
    myRecord.uid = authRequests.currentUser();
    myRecord.habitId = habit.id;
    myRecord.timestamp = Date.now();
    myRecord.xpEarned = this.experience();
    onSubmit(myRecord);
    toggle();
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      recordRequests.getSingleRecord(editId)
        .then((record) => {
          this.setState({ newRecord: record.data });
        })
        .catch(err => console.error('error with getSingleMessage', err));
    }
  }

  render() {
    const { modal, toggle, habit } = this.props;
    const { newRecord } = this.state;
    const { isEditing } = this.props;
    const sendButton = () => {
      if (isEditing) {
        return <span>Edit</span>;
      }
      return <span>Send</span>;
    };
    const timedHabit = () => {
      if (habit.isTimed) {
        return (
          <Container>
            <Row>
              <Col xs="auto">I did this for</Col>
              <Col xs="auto">
                <FormGroup>
                  <Input
                  className="timeInput"
                  type="textarea"
                  name="text"
                  id="exampleSelect"
                  maxLength="2"
                  value={newRecord.timeSpent}
                  onChange={this.recordChange} />
                </FormGroup>
              </Col>
              <Col xs="auto">minutes.</Col>
            </Row>
          </Container>
        );
      }
      return <p>I did this today.</p>;
    };

    return (
      <div>
        <Modal className="my-modal" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={this.toggle}>{habit.description}</ModalHeader>
          <Form>
            <ModalBody>
              {timedHabit()}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.formSubmit}>{sendButton()}</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default RecordModal;
