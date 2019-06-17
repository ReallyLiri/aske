import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import pokeStore from '../../assets/pokemonStore';

export default function(props) {

  const {selectPokemon, pushNavigation, currentRoute, user} = props;

  const handlePress = pokemon => {
    selectPokemon(pokemon);
    pushNavigation('/pokemon');
  };

  return (
    <View>
      <Text>{currentRoute}</Text>
      <Text>User: {user.username}</Text>
      <FlatList
        keyExtractor={pokemon => pokemon.number}
        data={pokeStore}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
