import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView from "react-native-maps";

export default function Index() {
	const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

	return (
			 <MapView
				style={{
					width: Dimensions.get('screen').width,
					height: Dimensions.get('screen').height
				}} /> 
				
	);
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",

	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

