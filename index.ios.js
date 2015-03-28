/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

/* Rotten Tomatoes's API */
var API_KEY = 'SBSSS1IL2LXNNU3WD23ICXBJLGK5EI1JJOU20L3OSTI1L0P1';
var API_URL = 'https://api.foursquare.com/v2/venues/search?ll=37.579253,-122.357889&v=20150327&query=in-in-out';
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

var AwesomeProject = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    // render dynamic data
    fetch(REQUEST_URL)
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
        style={styles.listView} />
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
  renderMovie: function(movie) {
    var icon = getIcon(movie.categories[0].icon);
    return (
      <View style={styles.container}>
        <Image 
          source={{uri: icon }} 
          style={styles.thumbnail} />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.name}</Text>
          <Text style={styles.year}>{getMilesFromMeters(movie.location.distance)}</Text>
        </View>
      </View>
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

function getIcon(icon) {
  var prefix = icon.prefix;
  var suffix = icon.suffix;
  var sizes = ['_32', '_44', '_64', '_88'];
  var bg = 'bg';
  // https://ss3.4sqi.net/img/categories_v2/food/burger_bg_44.png
  return prefix + bg + sizes[3] + suffix;
}

function getMilesFromMeters(result) {
  return (result *= 0.000621371192).toFixed(2) + ' miles';
}

var styles = StyleSheet.create({
  listView: {
    paddingTop: 20,
    backgroundColor: '#E5E5E5',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E8E8E8',
    borderBottomColor: '#CCCECF',
    borderRadius: 3,
    borderWidth: 2,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    padding: 10,
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 15,
  },
  thumbnail: {
    width: 64,
    height: 64,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'left',
    color: '#373737',
  },
  year: {
    textAlign: 'left',
    color: '#979797',
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
