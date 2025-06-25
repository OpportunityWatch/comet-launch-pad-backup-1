
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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
    // Check if RESEND_API_KEY is configured
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not found in environment variables");
      return new Response(
        JSON.stringify({ error: "Email service not configured - RESEND_API_KEY missing" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("RESEND_API_KEY found, initializing Resend...");
    const resend = new Resend(resendApiKey);

    const orderData: OrderNotificationRequest = await req.json();
    console.log("Processing order notification for:", orderData.email);

    const discountText = orderData.discountCode 
      ? `<p><strong>Discount Code:</strong> ${orderData.discountCode}</p>
         <p><strong>Original Amount:</strong> $${(orderData.amount / 100).toFixed(2)}</p>
         <p><strong>Final Amount:</strong> $${(orderData.finalAmount / 100).toFixed(2)}</p>`
      : `<p><strong>Amount:</strong> $${(orderData.amount / 100).toFixed(2)}</p>`;

    // Send confirmation email to customer
    console.log("Attempting to send customer confirmation email...");
    const customerEmailResponse = await resend.emails.send({
      from: "CometCopters <orders@cometcopters.com>",
      to: [orderData.email],
      subject: `🚁 Your CometCopters Order Confirmation - ${orderData.productName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3b82f6;">🚁 Thank you for your CometCopters order!</h1>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e40af; margin-top: 0;">Order Details</h2>
            <p><strong>Product:</strong> ${orderData.productName}</p>
            <p><strong>Quantity:</strong> ${orderData.quantity}</p>
            ${discountText}
            <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
          </div>
          
          ${orderData.paymentMethod !== 'stripe' ? `
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>Payment Instructions:</strong><br>
              Please send $${(orderData.finalAmount / 100).toFixed(2)} via ${orderData.paymentMethod} to complete your order.<br>
              We'll send detailed payment instructions shortly.
            </p>
          </div>
          ` : `
          <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
            <p style="margin: 0; color: #065f46;">
              <strong>Payment Status:</strong> Your payment has been processed successfully via Stripe.
            </p>
          </div>
          `}
          
          <p style="margin-top: 30px; color: #6b7280;">
            Thank you for choosing CometCopters! Your LED helicopters will soar up to 150+ feet high.
          </p>
          
          <p style="color: #6b7280;">
            Questions? Reply to this email or contact us at support@cometcopters.com
          </p>
        </div>
      `,
    });

    console.log("Customer email result:", JSON.stringify(customerEmailResponse, null, 2));

    // Send notification to store owner
    console.log("Attempting to send owner notification email...");
    const ownerEmailResponse = await resend.emails.send({
      from: "CometCopters Store <orders@cometcopters.com>",
      to: ["rwcampbell2@gmail.com"],
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
            Check your <a href="https://supabase.com/dashboard/project/rmoatawzcxejixhipvsb" style="color: #3b82f6;">Supabase dashboard</a> for complete order details.
          </p>
        </div>
      `,
    });

    console.log("Owner email result:", JSON.stringify(ownerEmailResponse, null, 2));

    // Check for any errors
    const errors = {
      customer: customerEmailResponse.error,
      owner: ownerEmailResponse.error
    };

    if (errors.customer || errors.owner) {
      console.error("Email sending errors:", errors);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        customerEmailId: customerEmailResponse.data?.id,
        ownerEmailId: ownerEmailResponse.data?.id,
        errors: errors
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in send-order-notification function:", error);
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
