import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity } from "react-native";
import Response from "../../../Components/Response";
import Message from "@/Components/message";
import images from "@/constants/images";

export default function App() {
	const [inputText, setInputText] = useState("");
	const [listData, setListData] = useState([]);
	const SearchInput = () => {
		setListData((prevList) => [...prevList, inputText]);
		setInputText("");
	};

	return (
		<View className="bg-black-100">
			<StatusBar style="auto" />

			{/* Header */}
			<View >
				<Image source={images.voice} style={styles.icon} />
				<Text className="text-red-100 font-bold text-4xl">Aidly AI</Text>
			</View>

      <View style={styles.searchBar}>
				<TextInput placeholder="Ask to Gemini AI" style={styles.input} value={inputText} onChangeText={(text) => setInputText(text)} selectionColor={"#323232"}></TextInput>
				<TouchableOpacity onPress={SearchInput}>
					<Image source={images.mic} style={styles.icon} />
				</TouchableOpacity>
			</View>

			{/* Content */}
			<FlatList
				style={{ paddingHorizontal: 16, marginBottom: 80 }}
				data={listData}
				renderItem={({ item }) => (
					<View>
						<Message message={item} />
						<Response prompt={item} />
					</View>
				)}
				keyExtractor={(item, index) => index.toString()}
			/>

			{/* Search-Bar */}
		
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
		paddingTop: 36,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		margin: 8,
		gap: 8,
	},
	icon: {
		width: 32,
		height: 32,
	},
	searchBar: {
		backgroundColor: "#ffffff",
		width: "100%",
		position: "absolute",
		bottom: 0,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 32,
		paddingVertical: 16,
		gap: 8,
	},
	input: {
		backgroundColor: "#fff",
		width: "100%",
		fontSize: 16,
		paddingVertical: 16,
		paddingHorizontal: 24,
		borderRadius: 32,
		borderWidth: 0.1,
	},
});