import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput } from "react-native";

export default function TabOneScreen() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://192.168.89.242:5173/api/user")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ScrollView>
      {/* <Text className="text-red-700">Hello From Tailwindcss</Textb> */}
      <Text className="text-red-500">{JSON.stringify(data)}</Text>
      <Text>{data}</Text>

      <TextInput keyboardType="default" />
    </ScrollView>
  );
}
