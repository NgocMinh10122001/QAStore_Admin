"use client"
import Loader from '@/components/custom ui/Loader'
import ProductForm from '@/components/products/ProductForm'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface ICollectionDetail {
    id : string
}

const ProductDetail = ({id} : ICollectionDetail) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState<ProductType | null>(null)

    const getProductDetail = async () => {
        try {
            
            const res = await fetch(`/api/products/${id}`,{
                method:"GET"
            })

            const data = await res.json()

            setProduct(data)
            
            setLoading(false)

        } catch (error) {
            console.log("Something went wrong, please try again!", error);
            toast.error("get product failed")
            router.push("/products");

        }
    }

    useEffect(() => {
        getProductDetail()
    },[])

if(loading) return <Loader/>

  return (
    <ProductForm intialData = {product}/>
  )
}

export default ProductDetail
