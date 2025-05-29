# Email Configuration Setup

To enable the contact form functionality, you need to set up environment variables for email sending.

## Setup Instructions

1. Create a `.env.local` file in the root directory of your project
2. Add the following environment variables:

```
# Email Configuration - Replace with your actual credentials
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Gmail App Password Setup

For Gmail, you need to use an App Password, not your regular password:

1. Go to your Google Account -> Security -> App Passwords
2. Make sure to enable 2-Step Verification first
3. Select "Mail" as the app and "Other" as the device
4. Generate and copy the app password
5. Use this password in your .env.local file

## Testing the Contact Form

Once you've set up the environment variables, you can test the contact form by:

1. Running the application (`npm run dev`)
2. Navigate to the Contact page
3. Fill out the form and submit
4. Check your email to ensure the form submission was received

## Troubleshooting

If you encounter issues with email sending:

- Verify your app password is correct
- Check that 2-Step Verification is enabled for your Google account
- Make sure you're using the correct email address
- Check the server logs for any error messages 