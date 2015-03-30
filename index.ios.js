/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

/* Rotten Tomatoes's API */
var API_KEY = 'SBSSS1IL2LXNNU3WD23ICXBJLGK5EI1JJOU20L3OSTI1L0P1';
// var API_URL = 'https://api.foursquare.com/v2/venues/search?ll=37.579253,-122.357889&v=20150327&query=in-in-out';
var API_URL = 'https://api.foursquare.com/v2/venues/search?&v=20150327&query=burgers';
var PARAMS = '&oauth_token=' + API_KEY
var REQUEST_URL = API_URL + PARAMS;

/* BEGIN APP */
var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var LocationCell = require('./LocationCell');

function addLocationParamsToURL(latitude, longitude) {
  return REQUEST_URL + '&ll=' + latitude + ',' + longitude;
}

var AwesomeProject = React.createClass({
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
      (error) => console.error(error)
    );
    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      this.setState({lastPosition});
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
        renderRow={this.renderMovie}
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
  selectLocation: function(movie: Object) {
    console.log('selected location');
    // this.props.navigator.push({
    //   title: movie.title,
    //   component: MovieScreen,
    //   passProps: {movie},
    // });
  },
  // equiv to a movie cell component
  renderMovie: function(movie) {
    return (
      <LocationCell
        onSelect={() => this.selectLocation(movie)}
        movie={movie}/>
    );
  }
});

function filterByDistance(array) {
  var sorted = array.sort(function (a, b) {
    if (a.location.distance > b.location.distance) {
      return 1;
    }
    if (a.location.distance < b.location.distance) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  return sorted;
}


var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#E5E5E5',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
