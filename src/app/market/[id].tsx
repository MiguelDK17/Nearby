import {View, Text, Alert, Modal} from "react-native"
import { router, useLocalSearchParams, Redirect} from "expo-router"
import { api } from "../services/api"
import { useEffect, useState } from "react"
import { Button } from "../components/button"
import { useCameraPermissions, CameraView } from "expo-camera"

import { Loading } from "../components/loading"
import { Cover } from "../components/market/cover"
import { PropsDetails, Details } from "../components/market/details"
import { Coupon } from "../components/market/coupon"


type DataProps = PropsDetails & {
    cover: string
}

export default function Market(){
    const params = useLocalSearchParams<{id: string}>()
    const [coupon, setCoupon] = useState<string | null>(null) 
    const [data, setData] = useState<DataProps>()
    const [isLoading, setIsLoading] = useState(true)
    const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)
    const [_, requestPermission] = useCameraPermissions()

    async function fetchMarket(){
        try {
            const {data} = await api.get(`/markets/${params.id}`)
            console.log(data)
            setData(data)
            setIsLoading(false)

        } catch(error) {
            console.log(error)
            Alert.alert("Erro", "Não foi possível carregar os dados", [
                {text: "OK", 
                    onPress: () => router.back()
                }
            ])
        }
    }

  async  function handleOpenCamera(){
        try {
            const {granted} = await requestPermission()

            if(!granted){
                return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera")
            }
            setIsVisibleCameraModal(true)
        } catch (error){
            console.log(error)
            Alert.alert("Câmera", "Não foi possível utilizar a câmera")
        }
    }

    useEffect(() =>{
        fetchMarket()
    }, [params.id])

    if(isLoading){
        return <Loading/>
    }

    if(!data) {
        return <Redirect href={"/home"}/>
    }
    return(
        <View style={{flex: 1}}>
            <Cover uri={data.cover}/>
            <Details data={data}/>
            {coupon && <Coupon code={coupon}/>}

            <View style = {{ padding: 32}}>
                <Button onPress={() => {handleOpenCamera()}}>
                <Button.Title>Ler QR Code</Button.Title>
            </Button>
            </View>
            <Modal style={{flex: 1}} visible={isVisibleCameraModal}>
                <CameraView style = {{flex: 1}}/>

                <View style={{flex: 1, justifyContent: "center"}}>
                <Button onPress={() => setIsVisibleCameraModal(false)}>
                    <Button.Title>Voltar</Button.Title>
                </Button>
                </View>
            </Modal>
        </View>
    )
}