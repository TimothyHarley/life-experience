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
// import userRequests from '../../../helpers/data/userRequests';

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
    // userInfo: {},
    // xpRecords: [],
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

  // setUserInfo = () => {
  //   const uid = authRequests.currentUser();
  //   userRequests.getCurrentUser(uid)
  //     .then((userInfo) => {
  //       this.setState({ userInfo });
  //     });
  // }

  // setXpRecords = () => {
  //   const uid = authRequests.currentUser();
  //   recordRequests.getAllRecordsWithCategories(uid)
  //     .then((xpRecords) => {
  //       this.setState({ xpRecords });
  //     });
  // }

  // sumOfXp = (typeXp) => {
  //   const allXp = typeXp.map(xp => xp.xpEarned);
  //   const totalXp = allXp.reduce((a, b) => a + b, 0);
  //   return (totalXp);
  // };

  // calculateFitnessXp = () => {
  //   const { xpRecords } = this.state;
  //   const allFitness = xpRecords.filter(xpRecord => xpRecord.category === 'fitness');
  //   const fitnessXp = this.sumOfXp(allFitness);
  //   return fitnessXp; // maybe try to make all these one function
  // }

  // calculateAcademicXp = () => {
  //   const { xpRecords } = this.state;
  //   const allAcademic = xpRecords.filter(xpRecord => xpRecord.category === 'academic');
  //   const academicXp = this.sumOfXp(allAcademic);
  //   return academicXp;
  // }

  // calculateSocialXp = () => {
  //   const { xpRecords } = this.state;
  //   const allSocial = xpRecords.filter(xpRecord => xpRecord.category === 'social');
  //   const socialXp = this.sumOfXp(allSocial);
  //   return socialXp;
  // }

  // calculateHomelXp = () => {
  //   const { xpRecords } = this.state;
  //   const allSHome = xpRecords.filter(xpRecord => xpRecord.category === 'home');
  //   const homeXp = this.sumOfXp(allSHome);
  //   return homeXp;
  // }

  // calculateCreativityXp = () => {
  //   const { xpRecords } = this.state;
  //   const allCreativity = xpRecords.filter(xpRecord => xpRecord.category === 'creativity');
  //   const creativityXp = this.sumOfXp(allCreativity);
  //   return creativityXp;
  // }

  // changeUserInfo = () => {
  //   const changes = { ...this.state.userInfo };
  //   changes.userLevel = 2;
  //   changes.fitnessXp = this.calculateFitnessXp();
  //   changes.academicXp = this.calculateAcademicXp();
  //   changes.socialXp = this.calculateSocialXp();
  //   changes.homeXp = this.calculateHomelXp();
  //   changes.creativityXp = this.calculateCreativityXp();
  //   return changes;
  // }

  // updateUserXp = () => {
  //   const uid = authRequests.currentUser();
  //   userRequests.getCurrentUser(uid)
  //     .then((results) => {
  //       const userId = results.dbKey;
  //       const changes = this.changeUserInfo();
  //       userRequests.updateUser(changes, userId);
  //     });
  // }

  formSubmit = (e) => {
    e.preventDefault();
    const { habit, onSubmit, toggle } = this.props;
    const myRecord = { ...this.state.newRecord };
    myRecord.uid = authRequests.currentUser();
    myRecord.habitId = habit.id;
    myRecord.timestamp = Date.now();
    myRecord.xpEarned = this.experience();
    onSubmit(myRecord);
    // this.updateUserXp();
    toggle();
  }

  // componentDidMount() {
  //   this.setUserInfo();
  //   this.setXpRecords();
  // }

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
