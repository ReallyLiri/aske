import React from 'react';
import { View, Text, Image, Share, Button, Platform } from 'react-native';
import { Link } from '../components/Router/routing';

const Pokemon = props => {

  const backButton = (
    <View>
      <Link to="/">
        <Text>Go Back</Text>
      </Link>
    </View>
  );

  const handlePress = async () => {
    await Share.share({
      message: 'Check out my favorite Pokemon!',
      url: props.selectedPokemon.photoUrl
    });
    console.error("WAT");
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
    selectedPokemon: {name, number, type, photoUrl}
  } = props;

  return (
    <View>
      <View>
        {backButton}
        {Platform.OS !== 'web' &&
        <View>
          <Button title="Share" onPress={handlePress}/>
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

export default Pokemon;
