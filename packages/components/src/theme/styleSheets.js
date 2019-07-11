import React from 'react'
import { StyleSheet } from 'react-native'
import { ColorScheme } from "./colorScheme";

export const condVisibility = (predicate) => {
  return {opacity: predicate ? 100 : 0}
};

export const uniteStyle = StyleSheet.create({
  errorMessage: {
    color: 'red',
    height: 20,
    fontSize: 20,
    marginBottom: 20
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: 'transparent',
    color: ColorScheme.lightText,
    margin: 10,
    padding: 20,
    borderRadius: 14,
    borderWidth: 5,
    borderColor: ColorScheme.button,
    fontSize: 18,
    fontWeight: '500',
  },
  actionButton: {
    width: 150,
    height: 55,
    margin: 10,
    padding: 20,
    borderRadius: 14,
    borderWidth: 5,
    borderColor: ColorScheme.button,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  titleText: {
    fontWeight: 'bold',
    color: ColorScheme.text,
    fontSize: 25,
  },
  actionButtonText: {
    fontWeight: 'bold',
    color: ColorScheme.text,
    fontSize: 25,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
