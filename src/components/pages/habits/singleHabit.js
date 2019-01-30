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
  FormGroup,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';

import './singleHabit.scss';

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

    // this.toggle = this.toggle.bind(this);

    toggle = () => {
      this.setState({
        modal: !this.state.modal,
      });
    }

    render() {
      const { habit } = this.props;
      const timedHabit = () => {
        if (habit.isTimed) {
          return (
          <FormGroup>
                <Container>
                  <Row>
                    <Col xs="auto">I did this for</Col>
                    <Col xs="auto"><Input className="timeSelector" type="select" name="select" id="exampleSelect">
                      <option>5</option>
                      <option>10</option>
                      <option>15</option>
                      <option>20</option>
                      <option>25</option>
                      <option>30</option>
                      <option>35</option>
                      <option>40</option>
                      <option>45</option>
                      <option>50</option>
                      <option>55</option>
                      <option>60</option>
                    </Input></Col>
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
            <ModalHeader toggle={this.toggle}>{habit.description}</ModalHeader>
            <ModalBody>
              {timedHabit()}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Submit</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
      );
    }
}

export default SingleHabit;
