import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Platform,
  Button,
} from 'react-native';
import MapplsIntouch from 'mappls-intouch-react-native';
import play from '../assets/play_arrow_24_px.png';
import stop from '../assets/stop_24_px.png';
import Toast from 'react-native-simple-toast';
import { Picker } from '@react-native-picker/picker';

class TrackingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: play,
      text: 'Start Tracking',
      currentSpeed: MapplsIntouch.BEACON_PRIORITY_FAST,
      dropDownEnabled: true,
      pickerBackground: '#CCFF0000',
      isTrackingRunning: false,
    };
  }

  async componentDidMount() {
    // this.setState({
    //   currentSpeed: MapplsIntouch.BEACON_PRIORITY_FAST
    // });
    MapplsIntouch.addTrackingStateListener(
      (event) => {
        console.log("addTrackingStateListener", JSON.stringify(event));
        Toast.show(event, Toast.SHORT);
        if (event === 'onTrackingStart') {
          this.setIconsAndLabel(true);
        } else if (event === 'onTrackingStop') {
          this.setIconsAndLabel(false);
        }
      },
      (error) => {
        // Toast.show(error.message);
        console.log('error', JSON.stringify(error.message));
      },
    );
    // this.getData();
    const status = await MapplsIntouch.isRunning();
    this.setState({
      isTrackingRunning: status,
    });
    this.setIconsAndLabel(status);
  }

  componentWillUnmount() {
    MapplsIntouch.removeTrackingStateListener();
  }

  // storeData = async (value) => {
  //   try {
  //     await AsyncStorage.setItem('@storage_Key', JSON.stringify(value));
  //   } catch (e) {
  //     // saving error
  //   }
  // };

  // getData = async () => {

  //   try {

  //     const value = await AsyncStorage.getItem('@storage_Key');

  //     if (value !== null) {

  //       console.log("Loaded from storage", value);

  //       this.setState({
  //         currentSpeed: parseInt(value),
  //       });

  //     } else {

  //       // SET DEFAULT HERE if nothing stored
  //       this.setState({
  //         currentSpeed: MapplsIntouch.BEACON_PRIORITY_FAST
  //       });

  //     }

  //   } catch (e) {

  //     console.log("Storage error", e);

  //   }

  // };
  trackButtonPress = async () => {
    console.log("trackButtonPress", this.state.isTrackingRunning);
    if (this.state.isTrackingRunning) {
      MapplsIntouch.stopTracking();
      this.setState({
        isTrackingRunning: false,
        dropDownEnabled: true   // ✅ enable picker
      });
    } else {
      this.setState({
        isTrackingRunning: true,
        dropDownEnabled: false  // ✅ disable picker
      });
      console.log("startTracking", this.state.currentSpeed);
      MapplsIntouch.startTracking(this.state.currentSpeed)

    }
  };

  redirectButtonPress = () => {
    Linking.openURL('https://intouch.mapmyindia.com');
  };

  setIconsAndLabel = (status) => {
    if (status) {
      this.setState({
        icon: stop,
        text: 'Stop tracking',
        dropDownEnabled: false,
        pickerBackground: 'rgba(52, 52, 52, 0.3)',
      });
    } else {
      this.setState({
        icon: play,
        text: 'Start tracking',
        dropDownEnabled: true,
        pickerBackground: 'rgba(255, 140, 0, 0.3)',
      });
    }
  };

  render() {
    const picker = (
      <View
        style={{
          ...styles.picker,
          backgroundColor: this.state.pickerBackground,
          borderColor: this.state.pickerBackground,
        }}
      >
        <Picker
          enabled={this.state.dropDownEnabled}
          selectedValue={Number(this.state.currentSpeed)}
          style={{ height: 50, width: 140 }}
          onValueChange={(itemValue, itemIndex) => {
            console.log("Picker common", itemValue, itemIndex);

            this.setState({
              currentSpeed: Number(itemValue)
            });

          }}
        >
          <Picker.Item
            label="FAST"
            value={MapplsIntouch.BEACON_PRIORITY_FAST}
          />
          <Picker.Item
            label="SLOW"
            value={MapplsIntouch.BEACON_PRIORITY_SLOW}
          />

          <Picker.Item
            label="OPTIMAL"
            value={MapplsIntouch.BEACON_PRIORITY_OPTIMAL}
          />

        </Picker>
      </View>
    );

    return (
      <View style={styles.root}>
        <Image
          source={require('../assets/in_touch_logo.png')}
          style={styles.logo}
        />
        <Text style={styles.label}>Live Location Tracking</Text>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: 'grey' }}>Choose Speed</Text>
          {picker}
          <TouchableOpacity onPress={this.trackButtonPress}>
            <View style={styles.trackButton}>
              <Image source={this.state.icon} style={{ height: 30, width: 30 }} />
              <Text style={{ fontWeight: 'bold', color: '#000000' }}>{this.state.text}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.redirectButtonPress}
            style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', marginTop: 40 }}>
              <Image
                source={require('../assets/open_in_new_24_px.png')}
                style={{ height: 20, width: 20 }}
              />
              <Text style={{ fontWeight: 'bold', color: '#33B3FF' }}>
                Redirect to InTouch
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ margin: 20 }}>
            <Button
              title="Get current Location"
              onPress={async () => {
                try {
                  const res = await MapplsIntouch.getCurrentLocationUpdate();
                  console.log(res);
                } catch (e) {
                  console.log(
                    `GET CURRENT LOCATION ERROR code: ${e.code} msg: ${e.message}`,
                  );
                }
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 140,
    height: 35,
    marginTop: 40,
  },
  label: {
    color: 'grey',
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    color: '#000000',
    width: 130,
    borderRadius: 10,
  },
  picker: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default TrackingScreen;
