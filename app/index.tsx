import { StyleSheet, View, Button } from "react-native";
import React, { useState } from "react";
import { Text, TextInput } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { EXPO_LEETCODE_API_KEY } from "@env";
import axios from "axios";
import { Toast } from "react-native-toast-notifications";
import { supabase } from "../lib/supabase";

const Index = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [users, setUsers] = useState([]);

  const updateUsernameColumn = async (username: string) => {
    username = "matiurrehman";
    const { data, error } = await supabase
      .from("LeetCode-UserID")
      .insert([{ leetcode_username : username }]);

      if(error) {
        console.error("Error inserting username:", error);
      }
  };

  const fetchAllUsernames = async () => {
    try {
      let { data, error } = await supabase
        .from("LeetCode-UserID")
        .select("leetcode_username");

      if (error) throw error;
      else {
        setUsers(data as unknown as []);
        console.log("Users:", data);
      }
    } catch (error) {
      console.error("Error fetching usernames:", error);
    }
  }

  const handleSubmit = async () => {
    try {
      // Construct the API URL correctly
      const url = `${EXPO_LEETCODE_API_KEY}${username}`;
      console.log("API URL:", url);

      const response = await axios.get(url);
      setProfile(response.data);
      console.log("Profile:", response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      Toast.show("User not found", { duration: 5000 });
    }

    
  };

  return (
    <View style={{ padding: 15 }}>
      <TextInput
        mode="outlined"
        value={username}
        onChangeText={(text) => setUsername(text)}
        label="Leetcode Id"
        left={<TextInput.Icon icon="account-plus" />}
        right={<TextInput.Icon onPress={handleSubmit} icon="database-search" />}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  profile: {
    marginTop: 20,
  },
});
