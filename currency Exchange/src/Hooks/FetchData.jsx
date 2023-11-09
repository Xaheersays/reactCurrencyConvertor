import {useEffect, useState} from "react"
const FetchData = (currency) =>{
    const [data,setData] = useState({})

    const url =  `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`;

    useEffect(()=>{
        fetch(url).then(response=>response.json())
        .then(res => setData(res[currency]))
        .catch(error=>console.error(error))
    },[currency])
    // console.log(data)
    delete data['1inch']
    delete data['00']
    return data


}
export default FetchData;
