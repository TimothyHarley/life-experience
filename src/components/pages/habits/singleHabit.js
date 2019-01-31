import React from 'react';
import {
  Card,
  CardTitle,
  CardImg,
  CardImgOverlay,
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

import './singleHabit.scss';
import authRequests from '../../../helpers/data/authRequests';

const defaultRecord = {
  uid: '',
  habitId: '',
  timestamp: '',
  timeSpent: '',
};

class SingleHabit extends React.Component {
    state = {
      modal: false,
      newRecord: defaultRecord,
    };

    formFieldStringState = (name, e) => {
      e.preventDefault();
      const tempRecord = { ...this.state.newRecord };
      tempRecord[name] = e.target.value;
      this.setState({ newRecord: tempRecord });
    }

    recordChange = e => this.formFieldStringState('record', e);

    toggle = () => {
      this.setState({
        modal: !this.state.modal,
      });
    }

    formSubmit = (e) => {
      e.preventDefault();
      const { habit } = this.props;
      const { onSubmit } = this.props;
      const myRecord = { ...this.state.newRecord };
      myRecord.uid = authRequests.currentUser();
      myRecord.habitId = `${habit.habitId}`;
      myRecord.timestamp = Date.now();
      onSubmit(myRecord);
      this.setState({ newRecord: defaultRecord });
    }

    onSubmit = () => {
      console.log(this.newRecord);
    }

    render() {
      const { habit } = this.props;
      const { newRecord } = this.state;
      const timedHabit = () => {
        if (habit.isTimed) {
          return (
          <FormGroup>
                <Container>
                  <Row>
                    <Col xs="auto">I did this for</Col>
                    <Col xs="auto">
                      <Input
                      className="timeInput"
                      type="textarea"
                      name="text"
                      id="exampleSelect"
                      maxLength="2"
                      value={newRecord.timeSpent}
                      onChange={this.recordChange} />
                    </Col>
                    <Col xs="auto">minutes.</Col>
                  </Row>
                </Container>
              </FormGroup>
          );
        }
        return <p>I did this today.</p>;
      };

      return (
      <div className="habitCard p-4">
        <Card inverse>
          <button className="habitButton" onClick={this.toggle}>
            <CardImg src="https://upload.wikimedia.org/wikipedia/commons/3/30/Blue_ice_from_Furka_glacier%2C_Switzerland.jpg" alt="Card image cap" />
            <CardImgOverlay>
              <CardTitle className="p-4">{habit.description}</CardTitle>
            </CardImgOverlay>
          </button>
        </Card>
        <div>
          <Modal className="my-modal" isOpen={this.state.modal} toggle={this.toggle}>
          <Form onSubmit={this.formSubmit}>
            <ModalHeader toggle={this.toggle}>{habit.description}</ModalHeader>
            <ModalBody>
              {timedHabit()}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Submit</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
          </Modal>
        </div>
      </div>
      );
    }
}

export default SingleHabit;
