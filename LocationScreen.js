/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;

var getMilesFromMeters = require('./getMilesFromMeters');

var LocationMenu = React.createClass({
  render: function() {
    return (
      <View>
        <Text style={styles.bodySubtitle}>Menu:</Text>
        <Text>{this.props.menu.mobileUrl}</Text>
      </View>
    );
  }
});

var LocationScreen = React.createClass({
  render: function() {
    var menu = this.props.location.menu.mobileUrl ?
      <LocationMenu menu={this.props.location.menu}/> : null;

    // menu
    // phone
    // homepage
    // address
    // map
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{this.props.location.name}</Text>
          <Text style={styles.headerSubtitle}>{getMilesFromMeters(this.props.location.location.distance)}</Text>
          <View style={styles.separator} />
        </View>
        <View style={styles.contentBody}>
          { menu }
        </View>
      </ScrollView>
    );
  },
});

var styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    height: 120,
    backgroundColor: '#8D48AB',
    alignItems: 'center', // vertical
    justifyContent: 'center', // horiziontal
  },
  headerTitle: {
    fontFamily: 'Helvetica',
    fontWeight: '200',
    fontSize: 28,
    color: '#ffffff',
  },
  headerSubtitle: {
    color: '#eeefff'
  },
  contentBody: {

  },
  bodySubtitle: {
    color: '#8D48AB',
    fontSize: 12,
  },
  // unused styles
  mpaaWrapper: {
    alignSelf: 'flex-start',
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 3,
    marginVertical: 5,
  },
  detailsImage: {
    width: 134,
    height: 200,
    backgroundColor: '#eaeaea',
    marginRight: 10,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(),
    marginVertical: 10,
  },
});

module.exports = LocationScreen;
