import nodemailer from "nodemailer";
import "dotenv/config";
const sendEmail = async (email, subject, verificationLink) => {
    try {
        // console.log("===================================")
        var trans = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "dhruvilprajapati2003@gmail.com",
                pass: process.env.GACCOUNT_APP_PASSWORD,
            },
        });
        var mailoption = {
            from: "dhruvilprajapati2003@gmail.com",
            to: email,
            subject: subject,
            html: `<!DOCTYPE html>
            <html lang="en">
            
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  text-align: center;
                  background-color: #f4f4f4;
                  padding: 20px;
                }
            
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #fff;
                  padding: 20px;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
            
                img {
                  max-width: 100%;
                  height: auto;
                }
            
                h1 {
                  color: #333;
                }
            
                p {
                  color: #666;
                }
            
                .verification-link {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #4caf50;
                  color: #fff;
                  text-decoration: none;
                  border-radius: 5px;
                }
              </style>
            </head>
            
            <body>
              <div class="container">
              <h1>Email Verification</h1>
                <img src="https://res.cloudinary.com/dvspdkrk5/image/upload/v1707908495/fa09ce32-9690-49c6-9a28-9ba369aef2e9.png" alt="App Logo">
                <p>Thank you for signing up with Algocraft. To complete your registration, please click the link below:</p>
                <a href="${verificationLink}" class="verification-link">Verify Email</a>
                <p>If you didn't sign up for Algocraft, you can ignore this email.</p>
              </div>
            </body>
            
            </html>
            `,
        };

        trans.sendMail(mailoption, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info.response);
            }
        });
    } catch (error) {
        console.log("email not sent!");
        console.log(error);
        return error;
    }
};

export { sendEmail };
