const otp = (otp, message) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>OTP Verification Email</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
            
            .img{
                height:200px;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
        <div class="message">OTP For ${message}</div>
            <img class="img" src="https://project.mizanur.in/static/media/login-signup-bg-card.3ff86d8994b9cfd21fba.png" alt="Quest card"></img>
            <div class="body">
                <p>Dear Castomer,</p>
                <p>Thank you for ${message} with Quest Card. To complete your process, please use the following OTP
                    (One-Time Password) to verify your account:</p>
                <h2 class="highlight">${otp}</h2>
                <p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.
                Once your account is verified, you will have access to our platform and its features.</p>
            </div>
            <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                    href="mailto:dev@mizanur.in">dev@mizanur.in</a>. We are here to help!</div>
        </div>
    </body>
    
    </html>`
}

export default otp
