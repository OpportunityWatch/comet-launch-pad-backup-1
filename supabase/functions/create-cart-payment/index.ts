
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LineItem {
  name: string;
  quantity: number;
  price: number; // Price per unit in cents
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, lineItems, discountCode, totalAmount }: {
      email: string;
      lineItems: LineItem[];
      discountCode?: string;
      totalAmount: number;
    } = await req.json();
    
    console.log("Cart payment request:", { email, lineItems, discountCode, totalAmount });

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Initialize Supabase with service role key
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Calculate discount
    let discountAmount = 0;
    let finalAmount = totalAmount;
    
    if (discountCode === "JULY4") {
      discountAmount = Math.round(totalAmount * 0.25); // 25% off
      finalAmount = totalAmount - discountAmount;
    }

    // Check if customer exists
    const customers = await stripe.customers.list({ 
      email: email, 
      limit: 1 
    });
    
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Create Stripe line items
    const stripeLineItems = lineItems.map(item => {
      let unitAmount = item.price;
      
      // Apply discount to each item if applicable
      if (discountCode === "JULY4") {
        unitAmount = Math.round(item.price * 0.75); // 25% off
      }
      
      return {
        price_data: {
          currency: "usd",
          product_data: { 
            name: item.name,
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      };
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: stripeLineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/?canceled=true`,
      metadata: {
        discount_code: discountCode || "",
        original_amount: totalAmount.toString(),
        discount_amount: discountAmount.toString(),
      },
    });

    // Save order to database
    const orderSummary = lineItems.map(item => 
      `${item.quantity}x ${item.name}`
    ).join(', ');

    const { error: orderError } = await supabaseClient
      .from("orders")
      .insert({
        email,
        product_name: `Cart Order: ${orderSummary}`,
        quantity: lineItems.reduce((sum, item) => sum + item.quantity, 0),
        amount: totalAmount,
        discount_code: discountCode || null,
        discount_amount: discountAmount,
        final_amount: finalAmount,
        payment_method: "stripe",
        stripe_session_id: session.id,
        status: "pending",
      });

    if (orderError) {
      console.error("Error saving order:", orderError);
      throw new Error("Failed to save order");
    }

    // Send order notification email
    try {
      const notificationResponse = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-order-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
        },
        body: JSON.stringify({
          email,
          productName: `Cart Order: ${orderSummary}`,
          quantity: lineItems.reduce((sum, item) => sum + item.quantity, 0),
          amount: totalAmount,
          finalAmount,
          discountCode,
          paymentMethod: "stripe"
        }),
      });

      if (!notificationResponse.ok) {
        console.error("Failed to send order notification");
      } else {
        console.log("Order notification sent successfully");
      }
    } catch (notificationError) {
      console.error("Error sending order notification:", notificationError);
    }

    console.log("Cart order saved successfully, session created:", session.id);

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Cart payment error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
