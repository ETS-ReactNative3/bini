import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  Text,
  Icon
} from 'react-native-elements';
import moment from 'moment';

import {dispatch} from 'lib/bosque';
import makeNavigationHeader from 'lib/makeNavigationHeader';
import {eventsListActions} from 'stores/EventsList/EventsList.actions';
import {eventsListStore} from 'stores/EventsList/EventsList.store';

import {LightStatusBar} from 'components/LightStatusBar/LightStatusBar.react';
import Logo from 'components/Logo/Logo.react';
import Event from 'components/Event/Event.react';
import {ButtonGroup} from 'components/Form/Form.react';
import vars from 'styles/vars';

export default class Home extends React.Component {

  static navigationOptions = makeNavigationHeader(({navigation}) => ({
    headerTitle: <Logo fontSize={20} />,
    leftIcon: 'menu',
    rightIcon: 'inbox',
    onLeftPress: navigation.openDrawer,
    onRightPress: () => console.log('onRightPress')
  }));

  constructor() {
    super();
    eventsListStore.subscribe(this);
  }

  componentDidMount() {
    if (!eventsListStore.hasInit) {
      dispatch(eventsListActions.INIT_EVENTS_LIST);
    }
  }

  componentWillUnmount() {
    eventsListStore.unsubscribe(this);
  }

  createEvent = () => {
    this.props.navigation.navigate('EventDetails');
  };

  renderEvents() {
    if (!eventsListStore.hasEvents) {
      return (
        <Text style={styles.emptyStateText}>
          {'You don\'t have any upcoming events\n\nGo ahead and get something going!'}
        </Text>
      );
    }

    return (
      <EventsByDate navigation={this.props.navigation} />
    );
  }

  render() {
    return (
      <View style={{
        alignItems: 'stretch',
        backgroundColor: vars.colors.bg,
        flex: 1,
        justifyContent: 'flex-start'
      }}>
        <LightStatusBar />
        <ScrollView style={{flex: 1}}>
          {this.renderEvents()}
        </ScrollView>
        <BottomButtonRow>
          <Icon
            type='material-community'
            name='calendar'
            size={28}
            color={vars.colors.main}
            containerStyle={{backgroundColor: 'transparent'}}
            iconStyle={{
              paddingRight: 15,
              paddingTop: 7,
              paddingBottom: 6
            }}
            onPress={() => console.log('tapped plans')}
          />
          <Icon
            type='material-community'
            name='compass-outline'
            size={28}
            color={vars.colors.main}
            containerStyle={{backgroundColor: 'transparent'}}
            iconStyle={{
              paddingLeft: 15,
              paddingTop: 7,
              paddingBottom: 6
            }}
            onPress={() => console.log('tapped inbox')}
          />
        </BottomButtonRow>
        <AddEventButton
          onPress={this.createEvent}
        />
      </View>
    );
  }
}

class EventsByDate extends React.Component {

  static dateOptionsObj = {
    scheduled: 0,
    past: 1,
    tbd: 2
  }

  static dateOptionsArr = ['Scheduled', 'Past', 'TBD'];

  state = {
    dateOption: EventsByDate.dateOptionsObj.scheduled
  };

  makeEvents = (events, startDate, iter) => {
    const isFirst = iter.first() === events;
    const isLast = iter.last() === events;
    const label = startDate
      ? (
        <Text style={{
          color: vars.colors.text,
          marginTop: isFirst ? 10 : 22,
          marginLeft: 15,
          fontWeight: 'bold'
        }}>
          {moment(startDate, 'YYYY-MM-DD').format('MMM Do, YYYY')}
        </Text>
      ) : null;
    return (
      <View
        key={startDate}
        style={{
          flex: 1,
          paddingBottom: isLast ? 40 : 0
        }}
      >
        {label}
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.navigate({
                routeName: 'Event',
                params: {event}
              });
            }}
          >
            <Event event={event} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  getEventsByDateOption() {
    const events = eventsListStore.eventsGroupedByStartDate;
    const {dateOption} = this.state;
    const today = moment().startOf('day');
    let filteredEvents;
    if (dateOption === EventsByDate.dateOptionsObj.scheduled) {
      filteredEvents = events.filter((evts, startDate) => {
        return today.isBefore(moment(startDate, 'YYYY-MM-DD'));
      });
    } else if (dateOption === EventsByDate.dateOptionsObj.past) {
      filteredEvents = events.filter((evts, startDate) => {
        return today.isAfter(moment(startDate, 'YYYY-MM-DD'));
      });
    } else {
      filteredEvents = events.filter((evts, startDate) => {
        return !startDate;
      });
    }
    return filteredEvents;
  }

  updateDateOption = (index) => {
    this.setState({
      dateOption: index
    });
  }

  render() {
    const events = this.getEventsByDateOption();
    return (
      <View style={{flex: 1}}>
        <ButtonGroup
          buttons={EventsByDate.dateOptionsArr}
          selectedIndex={this.state.dateOption}
          onPress={this.updateDateOption}
        />
        {events.isEmpty() ? (
          <Text style={styles.emptyStateText}>
            You don't have any {EventsByDate.dateOptionsArr[this.state.dateOption].toLowerCase()} events
          </Text>
        ) : this.getEventsByDateOption().map(this.makeEvents).toList()}
      </View>
    );
  }
}

class AddEventButton extends React.Component {

  static propTypes = {
    onPress: PropTypes.func
  }

  render() {
    return (
      <View
        pointerEvents='box-none'
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          alignItems: 'center',
          zIndex: 1
        }}
      >
        <Icon
          reverse
          raised
          name='add'
          underlayColor='transparent'
          color={vars.colors.main}
          onPress={this.props.onPress}
        />
      </View>
    );
  }
}

class BottomButtonRow extends React.Component {
  render() {
    const width = `${100 / this.props.children.length}%`;
    return (
      <View style={{
        backgroundColor: vars.palette.white,
        flexDirection: 'row',
        borderTopWidth: 2,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        zIndex: 1
      }}>
        {this.props.children.map((child, i) => (
          <View
            style={{width}}
            key={i}
          >
            {child}
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyStateText: {
    color: vars.colors.textMeta,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingTop: 40
  }
});
