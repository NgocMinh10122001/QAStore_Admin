
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import Customer from "@/lib/models/Customer";

export const POST = async (req: NextRequest) => {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get("Stripe-Signature") as string

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === "checkout.session.completed") {
      const session:Stripe.Checkout.Session = event.data.object
      const address = session?.customer_details?.address;

      const customerInfo = {
        clerkId: session?.client_reference_id,
        name: session?.customer_details?.name,
        email: session?.customer_details?.email,
      }

      const shippingAddress = {
        street: address?.line1,
        city: address?.city,
        state: address?.state,
        postalCode: address?.postal_code,
        country: address?.country,
      }

      const retrieveSession = await stripe.checkout.sessions.retrieve(
        session.id,
        { expand: ["line_items.data.price.product"]}
      )

      const lineItems = retrieveSession?.line_items?.data

      const orderItems = lineItems?.map((item:Stripe.LineItem) => {
        // Cast type để TypeScript hiểu rằng price đã được expand
        const price = item.price as Stripe.Price;
        const product = price.product as Stripe.Product;
        
        return {
          product: product.metadata.productId,
          color: product.metadata.color || "N/A",
          size: product.metadata.size || "N/A",
          quantity: item.quantity || 0, // Thêm fallback cho quantity
        }
      })

      await connectToDB()

      const newOrder = new Order({
        customerClerkId: customerInfo.clerkId,
        products: orderItems,
        shippingAddress,
        shippingRate: session?.shipping_cost?.shipping_rate,
        totalAmount: session.amount_total ? session.amount_total / 100 : 0,
      })

      await newOrder.save()

      let customer = await Customer.findOne({ clerkId: customerInfo.clerkId })

      if (customer) {
        customer.orders.push(newOrder._id)
      } else {
        customer = new Customer({
          ...customerInfo,
          orders: [newOrder._id],
        })
      }

      await customer.save()
    }

    return new NextResponse("Order created", { status: 200 })
  } catch (err) {
    console.log("[webhooks_POST]", err)
    return new NextResponse("Failed to create the order", { status: 500 })
  }
}