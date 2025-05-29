const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n====== Email Configuration Setup ======\n');
console.log('This script will help you set up your .env.local file for the contact form.');
console.log('Note: For Gmail, you need to create an app password (https://myaccount.google.com/apppasswords)');
console.log('You\'ll need 2-step verification enabled on your Google account to create an app password.\n');

rl.question('Enter your Gmail address: ', (emailUser) => {
  rl.question('Enter your app password: ', (emailPass) => {
    const envContent = `# Email configuration for contact form
EMAIL_USER=${emailUser}
EMAIL_PASS=${emailPass}

# Note: For Gmail, you need to:
# 1. Enable 2-step verification on your Google account
# 2. Create an app password at https://myaccount.google.com/apppasswords
# 3. Use that app password here instead of your regular password
# 4. Keep this file secure and never commit it to version control`;

    const envPath = path.join(process.cwd(), '.env.local');
    
    // Check if file already exists
    if (fs.existsSync(envPath)) {
      rl.question('\nWarning: .env.local already exists. Overwrite? (y/n): ', (answer) => {
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
          writeEnvFile(envPath, envContent);
        } else {
          console.log('Setup cancelled. Existing .env.local file was not modified.');
        }
        rl.close();
      });
    } else {
      writeEnvFile(envPath, envContent);
      rl.close();
    }
  });
});

function writeEnvFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content);
    console.log('\nSuccess! .env.local file has been created.');
    console.log('The contact form will now send emails to enginaro.industrialsolutions@gmail.com');
    console.log('\nIMPORTANT: Never commit this file to version control!');
  } catch (error) {
    console.error('\nError creating .env.local file:', error.message);
  }
} 