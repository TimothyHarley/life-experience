import React from 'react';
import moment from 'moment';
import './singleRecord.scss';
import RecordModal from './recordModal';
import habitRequests from '../../../helpers/data/habitRequests';
import recordRequests from '../../../helpers/data/recordRequests';
import authRequests from '../../../helpers/data/authRequests';
import userRequests from '../../../helpers/data/userRequests';

class SingleRecord extends React.Component {
  state = {
    modal: false,
    isEditing: false,
    editId: '-1',
    habit: {},
    xpRecords: [],
    userInfo: {},
  }

  componentDidMount() {
    this.xpRecords();
    this.userInfo();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  passRecordToEdit = recordId => this.setState({ isEditing: true, editId: recordId });

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleRecord, record } = this.props;
    deleteSingleRecord(record.id);
    this.xpRecords()
      .then(() => {
        this.updateUserXp();
      });
  }

  editEvent = (e) => {
    e.preventDefault();
    const { record } = this.props;
    this.habitOfRecord(record.habitId);
    this.passRecordToEdit(record.id);
    this.toggle();
  }

  habitOfRecord = (habitId) => {
    habitRequests.getSingleHabit(habitId)
      .then((habit) => {
        const aHabit = habit.data;
        aHabit.id = habitId;
        this.setState({ habit: aHabit });
      });
  }

  formSubmitEvent = (newRecord) => {
    const { editId } = this.state;
    const { loadRecords } = this.props;
    recordRequests.updateRecord(newRecord, editId)
      .then(() => {
        loadRecords();
        this.xpRecords()
          .then(() => {
            this.updateUserXp();
          });
      })
      .catch(err => console.error('error with edit', err));
  }

  xpRecords = () => recordRequests.getAllRecordsWithCategories(`${authRequests.currentUser()}`)
    .then((xpRecords) => {
      this.setState({ xpRecords });
    })

  userInfo = () => userRequests.getCurrentUser(`${authRequests.currentUser()}`)
    .then((userInfo) => {
      this.setState({ userInfo });
    })

  sumOfXp = (typeXp) => {
    const allXp = typeXp.map(xp => xp.xpEarned);
    const totalXp = allXp.reduce((a, b) => a + b, 0);
    return (totalXp);
  };

  calculateFitnessXp = () => {
    const { xpRecords } = this.state;
    const allFitness = xpRecords.filter(xpRecord => xpRecord.category === 'fitness');
    const fitnessXp = this.sumOfXp(allFitness);
    return fitnessXp; // maybe try to make all these one function
  };

  calculateAcademicXp = () => {
    const { xpRecords } = this.state;
    const allAcademic = xpRecords.filter(xpRecord => xpRecord.category === 'academic');
    const academicXp = this.sumOfXp(allAcademic);
    return academicXp;
  };

  calculateSocialXp = () => {
    const { xpRecords } = this.state;
    const allSocial = xpRecords.filter(xpRecord => xpRecord.category === 'social');
    const socialXp = this.sumOfXp(allSocial);
    return socialXp;
  };

  calculateHomelXp = () => {
    const { xpRecords } = this.state;
    const allSHome = xpRecords.filter(xpRecord => xpRecord.category === 'home');
    const homeXp = this.sumOfXp(allSHome);
    return homeXp;
  };

  calculateCreativityXp = () => {
    const { xpRecords } = this.state;
    const allCreativity = xpRecords.filter(xpRecord => xpRecord.category === 'creativity');
    const creativityXp = this.sumOfXp(allCreativity);
    return creativityXp;
  };

  changeUserInfo = () => {
    const changes = { ...this.state.userInfo };
    changes.fitnessXp = this.calculateFitnessXp();
    changes.academicXp = this.calculateAcademicXp();
    changes.socialXp = this.calculateSocialXp();
    changes.homeXp = this.calculateHomelXp();
    changes.creativityXp = this.calculateCreativityXp();
    return changes;
  };

  updateUserXp = () => {
    const uid = authRequests.currentUser();
    userRequests.getCurrentUser(uid)
      .then((results) => {
        const userId = results.dbKey;
        const changes = this.changeUserInfo();
        userRequests.updateUser(changes, userId);
      });
  };

  render() {
    const { record } = this.props;
    const timedHabit = () => {
      if (record.timeSpent !== '') {
        return (
          <span> - {record.timeSpent} minutes</span>
        );
      }
      return '';
    };

    return (
      <div>
        <div className="record">
          <p>
            {moment(record.timestamp).format('MMMM Do, YYYY')} - {record.description} {timedHabit()}
            <span>
              <button className="btn btn-default" onClick={this.editEvent}>
                <i className="fas fa-edit text-warning"></i>
              </button>
              <button className="btn btn-default" onClick={this.deleteEvent}>
                <i className="fas fa-trash-alt text-danger"></i>
              </button>
            </span>
          </p>
        </div>
        <div>
          <RecordModal
          isOpen={this.state.modal}
          modal={this.state.modal}
          toggle={this.toggle}
          onSubmit={this.formSubmitEvent}
          habit={this.state.habit}
          isEditing={this.state.isEditing}
          editId={this.state.editId} />
        </div>
      </div>
    );
  }
}

export default SingleRecord;
