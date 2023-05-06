import {useParams, Link} from "react-router-dom"
import Title from "./Title"
import QuantityBtn from "./QuantityBtn"
import { useState,useEffect } from "react"


export default function ProductDetail() {

    let params = useParams()

    let [productDetail, setProductDetail] = useState(null)

    useEffect(()=>{
        // 1 : 無第二個參數 : component每次render都會觸法
        // 2 : Dependency Array是空Array時 : 只會在第一次網頁render時會觸法
        // 3 : Dependency Array是有變數時 : 第一次網頁render時 + 指定的變數改變 會觸法

        fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
        .then(response => response.json())
        .then(data => {
            let producrInfo = data.find((element)=>{
                return element.id === parseInt(params.id)
            })
            setProductDetail(producrInfo)
        })

    },[params.id]) // <==  Dependency Array


    return (
        <div>
            {
                productDetail && 
                <div>
                    <Title mainTitle={productDetail.name+"產品資料"} />
                    <img src={process.env.PUBLIC_URL+'/img/'+productDetail.image} alt={productDetail.name} width="400" />
                    <p>名稱 : {productDetail.name}</p>
                    <p>售價 : {productDetail.price}元</p>
                    <p>描述 : {productDetail.decsription}</p>
                    <QuantityBtn productInfo={productDetail} />
                </div>
            }

            <Link to="/">回到產品列表</Link>
        </div>
    )
}
