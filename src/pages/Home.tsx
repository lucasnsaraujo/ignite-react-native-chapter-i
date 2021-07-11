import React, { useEffect, useState, ReactChildren, ReactChild } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Platform,
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native'

import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}

interface DismissKeyboardProps {
  children: ReactChild | ReactChildren
}

function DismissKeyboard({children}: DismissKeyboardProps) {
  return(
  <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
    {children}
  </TouchableWithoutFeedback>)
}

export function Home() {

  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState<SkillData[]>([])
  const [error, setError] = useState(false)
  const [greeting, setGreeting] = useState('')

  useEffect(()=> {
    const currentHour = new Date().getHours()
    if (currentHour < 12) {
      setGreeting('Good morning')
    } else if (currentHour >= 12 && currentHour < 18 ) {
      setGreeting('Good afternoon')
    } else {
      setGreeting('Good evening')
    }
  }, [])

  function handleAddSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }
    if (newSkill != '') {
      setSkills(oldState => [...oldState, data])
      setNewSkill('')
      setError(false)
    } else {
      setError(true)
    }
  }

  return (

    <DismissKeyboard>

      <View style={styles.container}>
        

        <Text style={styles.title}>Welcome, Lucas</Text>
        <Text style={styles.greeting}>{greeting}</Text>

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
          keyExtractor={item => (item.id)}
          renderItem={({item}) => (
            <SkillCard skill={item.name}/>
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
  },
  greeting: {
    color: '#afafaf'
  }
  
})