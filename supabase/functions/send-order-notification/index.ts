
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

const getPaymentInstructions = (paymentMethod: string, amount: number) => {
  const formattedAmount = (amount / 100).toFixed(2);
  
  switch (paymentMethod.toLowerCase()) {
    case 'cashapp':
      return {
        handle: '$retropatriot',
        instructions: `Send $${formattedAmount} to $retropatriot on CashApp`
      };
    case 'venmo':
      return {
        handle: '@robbiescramble',
        instructions: `Send $${formattedAmount} to @robbiescramble on Venmo`
      };
    case 'paypal':
      return {
        handle: 'paypal.me/retropatriot',
        instructions: `Send $${formattedAmount} via PayPal to paypal.me/retropatriot`
      };
    default:
      return {
        handle: '',
        instructions: `Send $${formattedAmount} via ${paymentMethod}`
      };
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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

    const paymentInfo = getPaymentInstructions(orderData.paymentMethod, orderData.finalAmount);

    // Send confirmation email to customer using verified domain
    console.log("Sending customer confirmation email...");
    
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
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #92400e;">Payment Instructions:</h3>
            <p style="margin: 10px 0; color: #92400e; font-size: 16px;">
              <strong>${paymentInfo.instructions}</strong>
            </p>
            ${paymentInfo.handle ? `
            <p style="margin: 10px 0; color: #92400e;">
              <strong>Payment Handle:</strong> ${paymentInfo.handle}
            </p>
            ` : ''}
            <p style="margin: 10px 0; color: #92400e; font-size: 14px;">
              Please include your email address (${orderData.email}) in the payment note so we can match your payment to your order.
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
            Questions? Reply to this email or contact us at orders@cometcopters.com
          </p>
        </div>
      `,
    });
    
    console.log("Customer email response:", customerEmailResponse);

    // Send notification to store owner
    console.log("Sending owner notification email...");
    
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
          
          ${orderData.paymentMethod !== 'stripe' ? `
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #92400e;">Payment Instructions Sent to Customer:</h3>
            <p style="margin: 10px 0; color: #92400e; font-size: 16px;">
              <strong>${paymentInfo.instructions}</strong>
            </p>
            ${paymentInfo.handle ? `
            <p style="margin: 10px 0; color: #92400e;">
              <strong>Payment Handle:</strong> ${paymentInfo.handle}
            </p>
            ` : ''}
            <p style="margin: 10px 0; color: #92400e;">
              Customer should include their email (${orderData.email}) in the payment note.
            </p>
          </div>
          ` : ''}
          
          <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #065f46;">
              <strong>Action Required:</strong> 
              ${orderData.paymentMethod === 'stripe' 
                ? 'Payment processed automatically via Stripe. Prepare for shipping!' 
                : `Customer will pay via ${orderData.paymentMethod}. Check your ${orderData.paymentMethod} account for payment using handle: ${paymentInfo.handle || 'N/A'}`}
            </p>
          </div>
          
          <p style="margin-top: 30px; color: #6b7280;">
            Check your <a href="https://supabase.com/dashboard/project/rmoatawzcxejixhipvsb" style="color: #3b82f6;">Supabase dashboard</a> for complete order details.
          </p>
        </div>
      `,
    });
    
    console.log("Owner email response:", ownerEmailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        customerEmailId: customerEmailResponse.data?.id || null,
        ownerEmailId: ownerEmailResponse.data?.id || null,
        customerEmailError: customerEmailResponse.error || null,
        ownerEmailError: ownerEmailResponse.error || null,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
    
  } catch (error) {
    console.error("Critical error in send-order-notification function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
