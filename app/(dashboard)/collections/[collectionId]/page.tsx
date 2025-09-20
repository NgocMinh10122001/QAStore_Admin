import React from 'react'
import CollectionDetail from './_components/CollectionDetail'

const page = ({params} : {params : {collectionId : string}}) => {
  return (
    <CollectionDetail id = {params.collectionId}/>
  )
}

export default page
