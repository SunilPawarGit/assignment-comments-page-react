import customAxios from "./interceptor"

export const HttpPost = (url,data={})=>{
    return customAxios.post(url,data).then(res=> {
        return res.data;
    }).catch((err)=>{
        console.log(err)
    })
}
export const HttpGet = (url)=>{
    return customAxios.get(url).then(res=> {
        return res.data
    }).catch((err)=>{
        console.log(err)
    })
}
export const HttpPut = (url,data)=>{
    return customAxios.put(url,data).then(res=> {
        return res.data
    }).catch((err)=>{
        console.log(err)
    })
}
export const HttpDelete = (url)=>{
    return customAxios.delete(url).then(res=> {
        return res.data
    }).catch((err)=>{
        console.log(err)
    })
}