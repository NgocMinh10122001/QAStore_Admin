import React from 'react'
import ProductDetail from './_components/ProductDetail'


const page = ({params} : {params : {productId : string}}) => {
  return (
    <ProductDetail id = {params.productId}/>
  )
}

export default page
