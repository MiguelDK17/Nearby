import { Stack } from "expo-router";
import {colors} from "@/app/styles/theme";
import {GestureHandlerRootView} from "react-native-gesture-handler"

import {
useFonts,
Rubik_600SemiBold,
Rubik_400Regular,
Rubik_500Medium,
Rubik_700Bold
} from "@expo-google-fonts/rubik"
import { Loading } from "./components/loading";

export default function Layout(){
    const[isFontLoaded]=useFonts({
    Rubik_600SemiBold,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold
    })

    if(!isFontLoaded) {
        return <Loading/>
    }
  


    return (
   <GestureHandlerRootView style={{flex: 1}}>
    <Stack 
    screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.gray[100]}
    }}
    />
    </GestureHandlerRootView>
    )
}