import React from 'react'
import CollectionDetail from './_components/CollectionDetail'

const page = async ({ params }: { params: Promise<{ collectionId: string }> }) => {
  const { collectionId } = await params;
  return (
    <CollectionDetail id = {collectionId}/>
  )
}

export default page
