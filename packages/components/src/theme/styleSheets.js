import React from 'react'
import { StyleSheet } from 'react-native'
import { ColorScheme } from "./colorScheme";

export const condVisibility = (predicate) => {
  return {opacity: predicate ? 100 : 0}
};

export const uniteStyle = StyleSheet.create({
  errorMessage: {
    color: 'red',
    height: 20
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: ColorScheme.overlay,
    color: ColorScheme.background,
    margin: 10,
    padding: 20,
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  actionButton: {
    width: 150,
    height: 55,
    margin: 10,
    padding: 20,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorScheme.overlay
  },
  actionButtonText: {
    fontWeight: 'bold',
    color: ColorScheme.text
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
