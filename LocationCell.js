'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

function joinAddress(address) {
  return address.join(' ');
}

function getMilesFromMeters(result) {
  return (result *= 0.000621371192).toFixed(2) + ' miles';
}

function getIcon(icon) {
  var prefix = icon.prefix;
  var suffix = icon.suffix;
  var sizes = ['_32', '_44', '_64', '_88'];
  var bg = 'bg';
  // https://ss3.4sqi.net/img/categories_v2/food/burger_bg_44.png
  return prefix + bg + sizes[3] + suffix;
}

var LocationCell = React.createClass({
  render: function() {
    var icon = getIcon(this.props.location.categories[0].icon);
    return (
      <View>
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.container}>
          <Image 
            source={{uri: icon }} 
            style={styles.thumbnail} />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{this.props.location.name}</Text>
            <Text style={styles.address}>{getMilesFromMeters(this.props.location.location.distance)} away</Text>
            <Text style={styles.year}>{joinAddress(this.props.location.location.formattedAddress)}</Text>
          </View>
        </View>
      </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
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
    width: 84,
    height: 84,
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
  },
  address: {
    textAlign: 'left',

  },
});

module.exports = LocationCell;
