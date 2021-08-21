const express = require('express');
const router = express.Router();
const { authorize, guestuser } = require('../helper/auth');
const Story = require('../model/story');

router.get("/", guestuser, (req, res) => {
    res.render('index');
});

router.get("/dashboard", authorize, async (req, res) => {
    const story = await Story.find({ user: req.user._id });
    res.render('dashboard', { story: story });
});
module.exports = router;


