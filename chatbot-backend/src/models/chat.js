const mongoose = require('mongoose');
const Product = require('./product');
const date = require('date-and-time');
const commaNumber = require('comma-number');
const {PythonShell} = require('python-shell'); 

const chatSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
        trim: true
    },
    chat: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});
// Funciton to get current date and time and return a formatted date
chatSchema.statics.getTime = () => {
    const now = new Date();
    const formattedDate = date.format(now, 'MMM DD YYYY, hh:mm A');
    return formattedDate;
};
// Function to get reply for the message sent by the user
chatSchema.statics.getBotReply = async (userMsg) => {
    // Function to get message from the classifier
    const getReplyPromise = (msg) => {
        return new Promise((resolve, reject) => {
            const pyshell = new PythonShell('src/classifier/script.py');
            pyshell.send(msg);

            pyshell.on('message', (message) => {
                resolve(message);
            });
            pyshell.end(function (err,code,signal) {
                if (err) throw err;
                // console.log('The exit code was: ' + code);
                // console.log('The exit signal was: ' + signal);
                // console.log('finished');
            });
        });
        
    };

    try {
        const words = userMsg.split(' ');
        let botReply;
        // Command for placing order: ebot order <code> <qty>
        if (words[0] === 'ebot') {
            if (words[1] === '--order' || words[1] === '--update-last' || words[1] === '--cancel-last') {

                if (words[1] === '--cancel-last') {
                    botReply = 'Latest order has been cancelled. If any of our mistakes is the reason for your order cancellation, please let us know by using one of our contacts given on the website. We apologize for the inconvenience caused :(';
                    return botReply;
                }

                const product = await Product.findOne({ code: words[2] });

                if (!product) {
                    botReply = 'No product with the given code was found. Please check the command for any mistakes.';
                    return botReply;
                }

                const name = product.name;
                const qty = parseInt(words[3]);
                const price = commaNumber(qty * product.price).toString();
                if (words[1] === '--order') {
                    botReply = `Order placed. Transaction details are as follows-\nProduct name: ${name}\nQuantity: ${qty}\nTotal cost: ₹${price}\nPlease make sure your address is up-to-date by end of the day.\nYou will receive your delivery within a week.\nThank you for shopping with us  :)`;
                } else if (words[1] === '--update-last') {
                    botReply = `Order updated. Transaction details for new order are-\nProduct name: ${name}\nQuantity: ${qty}\nTotal cost: ₹${price}\nPlease make sure your address is up-to-date by end of the day.\nYou will receive your delivery within a week.\nThank you for shopping with us  :)`;
                } else if (words[1] === '--cancel-last') {
                    botReply = 'Latest order has been cancelled. If any of our mistakes is the reason for your order cancellation, please let us know by using one of our contacts given on the website. We apologize for the inconvenience caused :(';
                }
            } else if (words[1] == '--help') {
                botReply = 'Dear user,\nTo place an order, type the following command:\nebot --order <code> <qty>\nFor instance, in order to place an order for 3 units of an item with code xxx, type-\nebot --order xxx 3\nTo update your latest order, type the following command:\nebot --update-last <code> <qty>\nTo cancel your latest order, type the following command: ebot --cancel-last\nTo get help for placing order, type the following command-\nebot --help';
            } else {
                botReply = `I'm sorry, but I couldn't understand what you wanted to say. Please check the command again.`;
            }
        } else {
            botReply = await getReplyPromise(userMsg);
            sentences = botReply.split('.');
            botReply = sentences[0] + '.';
        }
        return botReply;
    } catch (error) {
        console.log(error);
    };

};

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;