import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Platform,
  Keyboard,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native'

import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard';

function DismissKeyboard({children}) {
  return(
  <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
    {children}
  </TouchableWithoutFeedback>)
}

export function Home() {

  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState([])
  const [error, setError] = useState(false)

  function handleAddSkill() {
    if (newSkill != '') {
      setSkills(oldState => [...oldState, newSkill])
      setNewSkill('')
      setError(false)
    } else {
      setError(true)
    }
  }

  function handleInputChange(text) {
    console.log(text)
  }

  return (

    <DismissKeyboard>

      <View style={styles.container}>

        <Text style={styles.title}>Welcome, Lucas</Text>

        <TextInput
        style={styles.input}
        placeholder='New skill'
        placeholderTextColor='#555'
        onChangeText={setNewSkill}
        onSubmitEditing={handleAddSkill} // when the form is submitted it runs handleAddSkill. (pressing return key on keyboard)
        value={newSkill}
        blurOnSubmit={false}
        />
        {
          error 
          ? <Text style={styles.errorText}>Type something to continue</Text>
          : <></>
        }

        <Button onPress={handleAddSkill}/>

        <Text style={[styles.title, {marginTop: 50, marginBottom: 30}]}> My skills </Text>

        <FlatList
          ListEmptyComponent={<Text style={styles.text}> It's so quiet here. Type something and click <Text style={styles.highlight}>Add</Text></Text>}
          data={skills}
          keyExtractor={item => (item + (Math.random() * 100).toString())}
          renderItem={({item}) => (
            <SkillCard skill={item}/>
            )}
            />
      </View>

    </DismissKeyboard>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1, 
    backgroundColor: '#121015',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 8,
  },
  errorText: {
    color: '#E22E5D'
  },
  text: {
    color: '#afafaf',
    marginLeft: 5
  },
  highlight: {
    color: '#a370f7'
  }
  
})