const express = require('express');
const User = require('../models/user');
const Chat = require('../models/chat');
const auth = require('../middleware/auth');
const router = new express.Router();
// Router method to post new user (registration)
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        const botTime = Chat.getTime();
        const firstChat = 'Hello user, My name is ElectroBot and I am here to help you place orders for your products or assist you with any queries you have regarding our store :)\nTo place an order, type the following command:\nebot --order <code> <qty>\nFor instance, in order to place an order for 3 units of an item with code xxx, type-\nebot --order xxx 3\nTo update your latest order, type the following command:\nebot --update-last <code> <qty>\nTo cancel your latest order, type the following command: ebot --cancel-last\nTo get help for placing order, type the following command-\nebot --help\nHave a great time shopping ;)';
        const first_message = new Chat({
            sender: 'bot',
            chat: firstChat,
            time: botTime,
            owner: user._id
        });
        try {
            await first_message.save();
        } catch (error) {
            res.status(400).send(error);
        };
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    };
});
// Router method to post details of existing user (login)
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send();
    };
});
// Router method to logout user from account 
router.post('/users/logout', auth, async (req, res) => {
    try {
        // req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);  // Logout user from only the current device
        req.user.tokens = []; // Logout user from all devices
        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send();
    }
});
// Router method to get user details
router.get('/users/me', auth, async (req, res) => {{
    res.send({ user: req.user, value: true });
}});
// Router method to update user details
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'password', 'address'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update!' });
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    };
});
// Router method to delete user
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send();
    };
});

module.exports = router;