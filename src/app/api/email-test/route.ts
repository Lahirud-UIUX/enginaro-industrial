import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET(req: Request) {
  try {
    // Diagnostic information
    const diagnostics = {
      apiKeyPresent: !!process.env.RESEND_API_KEY,
      apiKeyFirstChars: process.env.RESEND_API_KEY ? `re_${process.env.RESEND_API_KEY.substring(3, 8)}...` : 'not found',
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      resendTest: null as any,
      error: null as any
    };

    // Only attempt to send if we have an API key
    if (diagnostics.apiKeyPresent) {
      try {
        // Initialize Resend
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Try to send a test email
        const result = await resend.emails.send({
          from: 'Enginaro Diagnostics <onboarding@resend.dev>',
          to: ['enginaro.industrialsolutions@gmail.com'],
          subject: `Email Test from Vercel [${new Date().toISOString()}]`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
              <h1 style="color: #FF6301; border-bottom: 1px solid #eee; padding-bottom: 10px;">Vercel Deployment Test</h1>
              
              <p>This is a diagnostic test email sent from your Vercel deployment.</p>
              <p>Timestamp: ${new Date().toISOString()}</p>
              <p>Environment: ${process.env.NODE_ENV || 'unknown'}</p>
              
              <p style="margin-top: 20px; font-size: 12px; color: #777;">
                If you received this email, your Resend integration is working correctly.
              </p>
            </div>
          `,
        });

        diagnostics.resendTest = {
          success: !result.error,
          data: result.data,
          error: result.error
        };
      } catch (error: any) {
        diagnostics.error = {
          message: error.message,
          name: error.name,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        };
      }
    }

    return NextResponse.json(diagnostics, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      error: 'Diagnostic failed',
      message: error.message,
      apiKeyPresent: !!process.env.RESEND_API_KEY
    }, { status: 500 });
  }
} 