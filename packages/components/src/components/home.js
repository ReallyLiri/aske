import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import pokeStore from '../assets/pokemonStore';
import { Navigation } from "../infra/navigation";

export default function(props) {

  const {pokemon, selectPokemon, history} = props;

  const handlePress = pokemon => {
    console.log(pokemon);
    selectPokemon(pokemon);
    history.push('/pokemon');
  };

  return (
    <View>
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
