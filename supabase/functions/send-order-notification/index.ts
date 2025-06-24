
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderNotificationRequest {
  email: string;
  productName: string;
  quantity: number;
  amount: number;
  finalAmount: number;
  discountCode?: string;
  paymentMethod: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const orderData: OrderNotificationRequest = await req.json();
    console.log("Sending order notification:", orderData);

    const discountText = orderData.discountCode 
      ? `<p><strong>Discount Code:</strong> ${orderData.discountCode}</p>
         <p><strong>Original Amount:</strong> $${(orderData.amount / 100).toFixed(2)}</p>
         <p><strong>Final Amount:</strong> $${(orderData.finalAmount / 100).toFixed(2)}</p>`
      : `<p><strong>Amount:</strong> $${(orderData.amount / 100).toFixed(2)}</p>`;

    // Send notification to store owner
    const ownerEmailResponse = await resend.emails.send({
      from: "CometCopters Store <orders@cometcopters.com>",
      to: ["robbiescramble@gmail.com"], // Replace with your actual email
      subject: `🚁 New CometCopters Order - ${orderData.productName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3b82f6;">🚁 New CometCopters Order!</h1>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e40af; margin-top: 0;">Order Details</h2>
            <p><strong>Product:</strong> ${orderData.productName}</p>
            <p><strong>Quantity:</strong> ${orderData.quantity}</p>
            ${discountText}
            <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
            <p><strong>Customer Email:</strong> ${orderData.email}</p>
          </div>
          
          <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #065f46;">
              <strong>Action Required:</strong> 
              ${orderData.paymentMethod === 'stripe' 
                ? 'Payment processed automatically via Stripe. Prepare for shipping!' 
                : `Customer will pay via ${orderData.paymentMethod}. Check your ${orderData.paymentMethod} account for payment.`}
            </p>
          </div>
          
          <p style="margin-top: 30px; color: #6b7280;">
            Check your <a href="https://supabase.com/dashboard" style="color: #3b82f6;">Supabase dashboard</a> for complete order details.
          </p>
        </div>
      `,
    });

    console.log("Owner notification sent:", ownerEmailResponse);

    return new Response(
      JSON.stringify({ success: true, emailId: ownerEmailResponse.data?.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending order notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
