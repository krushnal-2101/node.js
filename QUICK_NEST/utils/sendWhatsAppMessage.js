import clients from "../config/twilio.js";

const sendWhatsAppMessage = async (to, body)=> {
    try{

          const message = await clients.messages.create({
            from: 'whatsapp:+1 4155238886',
            to: `whatsapp:+91${to}`,
            body
        })

        console.log("whatssap message id", message.sid)
    }catch(error){
        console.log(error.message)
    }
}

export default sendWhatsAppMessage