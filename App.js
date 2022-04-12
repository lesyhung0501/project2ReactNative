import React from 'react';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight, Modal } from 'react-native';

export default function App() {
  const APIUrl = "https://www.omdbapi.com/?i=tt3896198&apikey=431d71b5";

  let [state, setState] = useState({
    nameMovie: "",
    results: [],
    selected: {}
  })

  let InputRef = useRef();

  function search() {   
    axios(APIUrl + "&s=" + state.nameMovie).then(({data}) => {
      let results = data.Search;
      setState(prevState => {
        return {
          ...prevState,
          results: results
        }
      })
    })
    InputRef.current.focus();
  }

  function Redirect(id) {
    axios(APIUrl + "&t=" + id).then(({data}) => {
      let results = data;

      setState(prevState => {
        return {
          ...prevState,
          selected: results
        }
      })
    })
  }

  function handleUndo() {
    
    setState(prevState => {
      return (
        {
          ...prevState, 
          selected: {}
        }
      )
    })
    InputRef.current.focus();
  }



  return (
    <View style={styles.container}>
      <Text style={{color: '#E0428C', fontSize: 32, fontWeight: '700', textAlign: 'center', marginBottom: 20}}>Movie-Browser</Text>
      <TextInput
        placeholder='Enter your movie'
        ref={InputRef}
        style={{fontSize:20, fontWeight: '300', padding: 20, width: '100%', backgroundColor: '#FFF', borderRadius: 8, marginBottom: 40}}
        onChangeText={text => setState(prevState => {
          return {...prevState, nameMovie: text};
        })}
        onSubmitEditing={search}
        value={state.nameMovie}
      />
      <ScrollView style={{flex: 1}}>
        {state.results.map(function(result) {
          return (
            <TouchableHighlight key={result.imdbID} onPress={() => Redirect(result.Title)}>
              <View  style={{flex: 1, width: '100%', marginBottom: 20}}>
              <Image
                source={{uri: result.Poster}}
                style={{
                  width: '100%',
                  height: 300
                }}
                resizeMode="cover"
              />
              <Text style={{color: '#fff', fontSize: 18, fontWeight: '700', padding: 20, backgroundColor: '#445565'}}>
                {result.Title}
              </Text>
            </View>
            </TouchableHighlight>
          )
        })}
      </ScrollView>
      
      <Modal animationType='fade' transparent={false} visible={(typeof state.selected.Title != 'undefined')?true:false}>
        <View style={{padding: 20}}>
          <Text style={{color: 'red', fontSize: 24, fontWeight: '700', marginBottom: 5}}>
            {state.selected.Title}
          </Text>
          <Text style={{marginBottom: 20, color: 'red'}}>
            Rating: {state.selected.imdbRating}
          </Text>
          <Text style={{color: 'green', fontWeight: 'bold'}}>
            Year: {state.selected.Year}
          </Text>
          <Text style={{color: 'green', fontWeight: 'bold'}}>
            Released: {state.selected.Released}
          </Text>
          <Text style={{color: 'green', fontWeight: 'bold'}}>
            Runtime: {state.selected.Runtime}
          </Text>
          <Text style={{color: 'green', fontWeight: 'bold'}}>
            Director: {state.selected.Director}
          </Text>
          <Text style={{color: 'green', fontWeight: 'bold'}}>
            Actors: {state.selected.Actors}
          </Text>
          <Text style={{color: 'green', fontWeight: 'bold'}}>
            Language: {state.selected.Language}
          </Text>
          <Text style={{color: 'green', fontWeight: 'bold'}}>
            Country: {state.selected.Country}
          </Text>
          <Text style={{color: 'green', fontWeight: 'bold'}}>
            Awards: {state.selected.Awards}
          </Text>
          <Text style={{color: 'green', fontWeight: 'bold'}}>
            Plot: {state.selected.Plot}
          </Text>

          <TouchableHighlight onPress={handleUndo}>
            <Text style={{padding: 20, fontSize: 20, fontWeight: '700', backgroundColor: '#2484C4', textAlign: 'center'}}>Undo</Text>
          </TouchableHighlight>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F202D',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20
  }
});
