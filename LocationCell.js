'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

var getMilesFromMeters = require('./getMilesFromMeters');
var joinAddress = require('./joinAddress');

function getIcon(categories) {
  // default icon
  var icon = {
    prefix: "https://ss3.4sqi.net/img/categories_v2/food/burger_",
    suffix: ".png"
  };
  try {
    icon = categories[0].icon;
  } catch (ex) {}
  var prefix = icon.prefix;
  var suffix = icon.suffix;
  var sizes = ['_32', '_44', '_64', '_88'];
  var bg = 'bg';
  // https://ss3.4sqi.net/img/categories_v2/food/burger_bg_44.png
  return prefix + bg + sizes[3] + suffix;
}

var LocationCell = React.createClass({
  render: function() {
    // var icon = getIcon(this.props.location.categories[0].icon);
    var icon = getIcon(this.props.location.categories);
    return (
      <View>
      <TouchableOpacity onPress={this.props.onSelect}>
        <View style={styles.container}>
          {icon && <Image 
            source={{uri: icon }} 
            style={styles.thumbnail} />}
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{this.props.location.name}</Text>
            <Text style={styles.address}>{getMilesFromMeters(this.props.location.location.distance)}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
