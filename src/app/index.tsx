import {View, Text} from "react-native"
import { router } from "expo-router";


import {Steps} from "@/app/components/steps";
import { Button } from "./components/button";
import {Welcome} from "@/app/components/loading/welcome"

export default function Index(){
    return (
        <View 
        style={{
            flex: 1,
            padding: 40,
            gap: 40
        }}
        >
            <Welcome/>
            <Steps/>

            <Button onPress={() => router.navigate("/home")}>
                <Button.Title>Começar</Button.Title>
                
            </Button>
        </View>
    )
}