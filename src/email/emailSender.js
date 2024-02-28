
import nodemailer from "nodemailer"
import { emailTemplate } from "./emailTemplate.js";
import  jwt from 'jsonwebtoken';

export async function sendMail(email, name) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "galalmohamed25325@gmail.com",
            pass: "ilvzgawbbnssznrn",
        },
    });
    let token =jwt.sign({email},'secretKey')
    const info = await transporter.sendMail({
        from: '"E-commerce" <galalmohamed25325@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "VerficationMail", // Subject line
        html:emailTemplate(token,name), // html body
    });

    console.log("Message sent: %s", info.messageId);

}