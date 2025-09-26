import React from 'react'
import OrderDetails from './_components/OrderDetails'

export default async function page({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  return (
    <OrderDetails orderId = {orderId}/>
  )
}
