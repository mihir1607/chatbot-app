const express = require('express');
const Chat = require('../models/chat');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/chats', auth, async (req, res) => {
    const time = Chat.getTime();
    const chat = new Chat({
        sender: 'user',
        chat: req.body.chat,
        time: time,
        owner: req.user._id
    });

    const msg = await Chat.getBotReply(req.body.chat);

    const botTime = Chat.getTime();
    const bot_chat = new Chat({
        sender: 'bot',
        chat: msg,
        time: botTime,
        owner: req.user._id
    });
    try {
        await chat.save();
        await bot_chat.save();
        res.status(201).send([chat, bot_chat]);
    } catch (error) {
        res.status(400).send(error);
    };
});

router.get('/chats', auth, async (req, res) => {
    try {
        await req.user.populate('chats').execPopulate();
        res.send(req.user.chats);
    } catch (error) {
        res.status(500).send();
    };
});

module.exports = router;