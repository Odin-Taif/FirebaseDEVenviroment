import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';
import DrawerNavigator from '../compos/DrawerNavigator'


const auth = getAuth();

export default function HomeScreen() {
  const { user } = useAuthentication();
  return (
    <>
       <DrawerNavigator/>
    </>
 
  );
}
