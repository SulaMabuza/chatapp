import {StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {Avatar} from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons'
import {auth, db} from '../firebase';

const HomeScreen = ({navigation}) => {

	const [chats, setChats] = useState([]);

	const signOutUser = () => {
			auth.signOut().then(() => {
			navigation.replace("Login");
		})
	}

	useEffect(() =>{
		const unsubscribe = db.collection('chats').onSnapshot(snapshot =>(
			setChats(snapshot.docs.map(doc => ({
				id: doc.id,
				data: doc.data()
			})))
			))

		return unsubscribe;
	}, [])

	useLayoutEffect(() =>{
		navigation.setOptions({
			title: "",
			headerStyle: { backgroundColor: '#fff', height: 100},
			headerTitleStyle: {color: 'black'},
			headerTintColor: 'black',
			headerLeft: () => (
				<View style = {{marginLeft: 20, paddingTop: 30}}>

					{

						/*

					<TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
					<Avatar
						rounded
						source ={{
							uri: auth?.currentUser?.photoURL
						}}
					/>
					</TouchableOpacity>

						*/
					}

				<Text style={{fontSize: 30, fontWeight: 'bold',}}>Chats</Text>

				</View>


				),

			headerRight: () => (
				<View 
					style={{
						flexDirection: 'row', 
						justifyContent: 'space-between', 
						width: 80, 
						marginRight: 20,
					}}
				>
					<TouchableOpacity activeOpacity={0.5}>
						<AntDesign name='camerao' size={24} color='black'/>
					</TouchableOpacity>

					<TouchableOpacity 
						onPress = {() => navigation.navigate('AddChat')} 
						activeOpacity={0.5}>
						<SimpleLineIcons name='pencil' size={24} color='black'/>
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation]);

	const enterChat = (id, chatName) => {
		navigation.navigate('Chat', {
			id, 
			chatName,
		})
	}
	return(
		<SafeAreaView>
			<ScrollView style={styles.container}>

				{chats.map(({id, data: {chatName}}) => (
					<CustomListItem 
						key={id} 
						id = {id} 
						chatName = {chatName}
						enterChat = {enterChat}
					/>
					))}
				
			</ScrollView>
			<View style={{paddingBottom: 20}}>
				<TouchableOpacity>
				<AntDesign name='logout' size={24} color='black'/>
				</TouchableOpacity>
			</View>
		</SafeAreaView>

		)
}

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		height: '100%',
	},

	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		padding: 15,
	},
});