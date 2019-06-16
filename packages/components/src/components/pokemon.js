import React from 'react';
import { View, Text, Image, Share, Button, Platform } from 'react-native';
import { Navigation } from "../infra/navigation";

export default function(props) {

  const backButton = (
    <View>
      <Button title={"Go Back"} onPress={
        () => {
          deselectPokemon();
          pushNavigation('/');
          //history.goBack();
        }
      } />
    </View>
  );

  const sharingIsCaring = async () => {
    await Share.share({
      message: 'Check out my favorite Pokemon!',
      url: props.selectedPokemon.photoUrl
    });
  };

  if (!props.selectedPokemon) {
    return (
      <View>
        {backButton}
        <Text>No Pokemon selected</Text>
      </View>
    );
  }

  const {
    selectedPokemon: {name, number, type, photoUrl},
    deselectPokemon,
    pushNavigation
  } = props;

  return (
    <View>
      <View>
        {backButton}
        {Platform.OS !== 'web' &&
        <View>
          <Button title="Share" onPress={sharingIsCaring}/>
        </View>
        }
        {Platform.OS === 'web' &&
        <View>
          <Text>{'(Cannot share)'}</Text>
        </View>
        }
        <View>
          <Text>{`#${number}`}</Text>
        </View>
        <View>
          <Text>{`Name: ${name}`}</Text>
        </View>
        <View>
          <Text>{`Type: ${type}`}</Text>
        </View>
        <View>
          <Image
            style={{width: 50, height: 50}}
            source={{uri: photoUrl}}
          />
        </View>
      </View>
    </View>
  );
};
