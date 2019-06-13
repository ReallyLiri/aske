import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import pokemon from './pokemonStore';
import { Navigation } from "../components/navigation";

const Home = props => {

  const handlePress = pokemon => {
    props.selectPokemon(pokemon);
    Navigation.navigateTo(props, '/pokemon');
  };

  return (
    <View>
      <FlatList
        keyExtractor={pokemon => pokemon.number}
        data={pokemon}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;
