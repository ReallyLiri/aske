import React from 'react'
import {
  View,
  FlatList,
  Image,
  Dimensions, TouchableOpacity
} from 'react-native'

import BaseContainerComponent from "../infra/baseContainerComponent";
import connectComponent from "../redux/connect";
import { uniteStyle } from "../theme/styleSheets";
import { PROFILE_PICTURES } from "../data/profilePictures";
import { ColorScheme } from "../theme/colorScheme";
import { ROUTES } from "../routes";

export class ProfilePictureContainer extends BaseContainerComponent {

  state = {
    isReady: false
  };

  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };

  async componentDidMount() {
    if (!await this.guardUser()) {
      return;
    }
    this.setState({
      isReady: true
    })
  }

  onPictureSelected(url) {
    this.props.userActions.setUser({...this.props.userState.user, image: url});
    this.props.history.push(ROUTES.PROFILE);
  }

  render() {
    if (!this.state.isReady) {
      return this.loadingPlaceholder();
    }
    const numColumns = 3;
    const borderWidth = 4;
    const imageDimension = (Dimensions.get('window').width / numColumns) - 20;
    return (
      <View style={[uniteStyle.container]}>
        <FlatList
          style={{flex: 1, paddingTop: 30}}
          contentContainerStyle={{
            borderColor: ColorScheme.matchBackgroundMax,
            borderWidth: borderWidth / 2,
            overflow: 'hidden'
          }}
          data={PROFILE_PICTURES}
          numColumns={numColumns}
          renderItem={({item: url}) => {
            return (
              <View>
                <TouchableOpacity onPress={() => this.onPictureSelected(url)}>
                  <Image
                    style={{
                      height: imageDimension,
                      width: imageDimension,
                      backgroundColor: 'white',
                      borderColor: ColorScheme.matchBackgroundMax, borderWidth: borderWidth / 2
                    }}
                    source={{uri: url}}
                  />
                </TouchableOpacity>
              </View>
            )
          }
          }/>
      </View>
    )
  }

  static mapStateToProps(state) {
    return {};
  }

  static mapDispatchToProps() {
    return {};
  }
}

export default connectComponent(ProfilePictureContainer);
