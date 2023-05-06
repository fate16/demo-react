import {Link} from "react-router-dom"
import React, {useState, useEffect} from "react"  //React Hook
import Title from "./Title"
import QuantityBtn from "./QuantityBtn"
import styles from './ProductList.module.css'

export default function ProductList() {

    let [productList, setProductList] = useState([])

    useEffect(()=>{
        // 1 : 無第二個參數 : component每次render都會觸法
        // 2 : Dependency Array是空Array時 : 只會在第一次網頁render時會觸法
        // 3 : Dependency Array是有變數時 : 第一次網頁render時 + 指定的變數改變 會觸法

        fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
        .then(response => response.json())
        .then(data => setProductList(data))

    },[])


    return (
        
        <div>

            <Title mainTitle="請選擇要購買的水果" />

            <div>
                {productList.map(product=>(
                    <div className={styles.productBorder} key={product.id}>
                        {product.name}<br/>
                        {product.price}<br/>
                        <Link to={'/product/'+product.id}>
                        <img className={styles.imgimg} src={process.env.PUBLIC_URL+'/img/'+product.image} alt='' /><br/>
                        </Link>
                        {product.description}<br/>
                        <QuantityBtn productInfo={product} />
                    </div>
                    ))
                }
            </div>

        </div>
    )
}
