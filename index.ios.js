/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  NavigatorIOS,
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

// App Modules
var LocationCell = require('./LocationCell');
var LocationScreen = require('./LocationScreen');

// functions
var filterByDistance = require('./filterByDistance');

// common modules
// var fetch = require('fetch');

// dev mock data
var mockResponseData = require('./foursquare.response');

// Foursquare API info
var API_KEY = 'SBSSS1IL2LXNNU3WD23ICXBJLGK5EI1JJOU20L3OSTI1L0P1';
// var API_URL = 'https://api.foursquare.com/v2/venues/search?ll=37.579253,-122.357889&v=20150327&query=in-in-out';
var API_URL = 'https://api.foursquare.com/v2/venues/search?&v=20150327&query=burgers';
var PARAMS = '&oauth_token=' + API_KEY
var REQUEST_URL = API_URL + PARAMS;

function addLocationParamsToURL(latitude, longitude) {
  return REQUEST_URL + '&ll=' + latitude + ',' + longitude;
}

var BurgersApp = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Burgers',
          component: LocationList,
        }}/>
    );
  }
});

var LocationList = React.createClass({
  watchID: (null: ?number),
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
  },
  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
        this.setState({initialPosition})
        this.fetchData();
      },
      (error) => {
        console.error(error);
        // this.loadOfflineData();
      }
    );
    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      this.setState({lastPosition});
    });
  },
  loadOfflineData: function() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(filterByDistance(mockResponseData.response.venues)),
      loaded: true,
    });  
  },
  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },
  fetchData: function() {
    var latitude = this.state.initialPosition.coords.latitude;
    var longitude = this.state.initialPosition.coords.longitude;
    var url = addLocationParamsToURL(latitude, longitude);
    // render dynamic data
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(filterByDistance(responseData.response.venues)),
          loaded: true,
        });
      })
      .done();
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        style={styles.listView}>
      </ListView>
    );
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading burgers..
        </Text>
      </View>
    );
  },
  selectLocation: function(location: Object) {
    // console.log('selected location ', location);
    this.props.navigator.push({
      title: '',//location.name,
      component: LocationScreen,
      passProps: {location},
      backButtonTitle: 'Back' // this aint working
    });
  },
  renderRow: function(location: Object)  {
    return (
      <LocationCell
        onSelect={() => this.selectLocation(location)}
        location={location}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    flex: 1,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#E5E5E5',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => BurgersApp);
