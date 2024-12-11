import {View, Text} from "react-native"

import {Welcome} from "@/app/components/loading/welcome"

import {Steps} from "@/app/components/steps";

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
        </View>
    )
}