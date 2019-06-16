import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import pokeStore from '../assets/pokemonStore';
import { Navigation } from "../infra/navigation";

export default function(props) {

  const {pokemon, selectPokemon, history, pushNavigation, currentRoute} = props;

  const handlePress = pokemon => {
    selectPokemon(pokemon);
    pushNavigation('/pokemon');
    //history.push('/pokemon');
  };

  return (
    <View>
      <Text>{currentRoute}</Text>
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
