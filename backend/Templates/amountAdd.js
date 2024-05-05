const amountAdd = (name, card, addedAmount, totalAmount) => {
    let currentDate = new Date().toGMTString();
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Transaction Notification</title>
        <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
    
        .header {
            background-color: #4CAF50;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
    
        .transaction-details {
            padding: 20px 20px 15px 20px;
            border: 1px solid black;
            border-top: none;
        }
    
        .transaction-details p {
            margin: 0 0 10px;
            line-height: 1.5;
        }
    
        .footer {
            text-align: left;
            margin-top: 30px;
            color: #6c757d;
        }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Transaction Alert</h2>
            </div>
            <div class="transaction-details">
                <p>Dear <b>${name}</b>,</p>
                <p>Thank you for adding <b>INR ${addedAmount}</b> to your account on Card no. XX${card} on ${currentDate}, your new balance is <b>INR ${totalAmount}</b>.</p>
                <p>If you have any questions or concerns, please feel free to contact us at <a href="mailto:dev@mizanur.in">dev@mizanur.in</a>.</p>
                <p>Always open to help you.</p>
                <div class="footer">
                    <p>Regards,<br>Quest Card</p>
                </div>
            </div>
        </div>
    </body>
    </html>   
  `;
}

export default amountAdd;
