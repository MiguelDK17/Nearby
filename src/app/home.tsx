import { View, Text , Alert} from "react-native"
import { useEffect, useState } from "react"

import { api } from "@/app/services/api"

import { PlaceProps } from "./components/place"
import {Categories, CategoriesProps} from "@/app/components/categories"

type MarketsProps = PlaceProps & {

}

export default function Home(){
    const [categories, setCategories] = useState<CategoriesProps>([])
    const [category, setCategory] = useState("")
    const [markets, setMarkets] = useState<MarketsProps[]>([])

    async function fetchCategories() {
        try {
            const { data } = await api.get("/categories")
            setCategories(data)
            setCategory(data[0].id)
            
        } catch (error) {
            console.log(error)
            Alert.alert("Categorias", "Não foi possível carregar as categorias.")
        }
    }

    async function fetchMarkets(){
        try {
            if(!category){
                return
            }

            const {data} = await api.get("/markets/category/" + category)
            setMarkets(data)
            console.log(data)

        } catch(error) {
            console.log(error)
            Alert.alert("Locais", "Não foi possível carregar os locais.")
        }
    }

    useEffect(() =>{
        fetchCategories()
    },[]
    )

    useEffect(() =>{
        fetchMarkets()
    }, [category])
   return <View style={{flex: 1}}>
    <Categories
     data={categories}
     onSelect={setCategory}
     selected={category}/>
   </View>


}