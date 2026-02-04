import { apiSlice } from "../api/apiSlice";
export const orderApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
      createOrder:builder.mutation({
        query:({courseId,payment_Info})=>({
            url:"create-order",
            method:"POST",
            body:{courseId,payment_Info},
            credentials:"include" as const,
        })
      }),
      getAllOrders:builder.query({
        query:(type)=>({
            url:"get-all-orders",
            method:"GET",
            credentials:"include" as const,
        })
      }),
      getStripePublishAbleKey:builder.query({
        query:()=>({
          url:"/payment/stripePublishAblekey",
          method:"GET",
          credentials:"include" as const,
        })
      }),
      createPaymentIntent:builder.mutation({
        query:(amount)=>({
          url:"/payment/process",
          method:"POST",
          body:{amount},
          credentials:"include" as const,
        })
      })
    })
})


export const {useCreateOrderMutation,useGetAllOrdersQuery,useGetStripePublishAbleKeyQuery,useCreatePaymentIntentMutation}=orderApi