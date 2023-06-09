const router = require('express').Router();
const bcrypt = require("bcrypt")
const User = require("../models/User")
//update user 
router.put("/update/:id", async (req, res) => {
    // console.log(req.body)
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                return res.status(404).json(error)

            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.status(200).json("Account has been updated")
        } catch (error) {
            return res.status(404).json(error)
        }

    } else {
        return res.status(403).json("you can update only your account!")
    }
})

//delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        try {
            await User.findByIdAndDelete(req.params.id)
            return res.status(200).json("Account has been deleted")
        } catch (error) {
            return res.status(404).json(error)
        }

    } else {
        return res.status(403).json("you can delete only your account!")
    }
})
//get user 
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId ? await User.findById(userId)
            : await User.findOne({ username: username })
        const { password, updatedAt, ...other } = user._doc // nice method
        res.status(200).json(other)
    } catch (error) {

    }
})
//get all users
router.get("/alluser", async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.send().json("no users found")
    }
})
// get friends
router.get("/friends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId)
            }))
        let friendList = []
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend
            friendList.push({ _id, username, profilePicture })
        })
        res.status(200).json(friendList)
    } catch (error) {

    }
})


//follow a user 
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (!user.followers.includes(req.body.userId)) {

                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });

                res.status(200).json("user has been followed")
            } else {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("user has been unfollowed")
            }
        } catch (error) {
            res.status(404).json(error)
        }

    } else {
        res.status(403).json("you can follow yourself")
    }
})


// get chatting friends
router.get("/chattingFriends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        const friends = await Promise.all(
            user.chatting.map((friendId) => {
                return User.findById(friendId)
            }))
        let friendList = []
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend
            friendList.push({ _id, username, profilePicture })
        })
        res.status(200).json(friendList)
    } catch (error) {

    }
})

//follow a user for chatting
router.put("/:id/chatting", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (!user.followers.includes(req.body.userId)) {

                await user.updateOne({ $push: { chatting: req.body.userId } });
                await currentUser.updateOne({ $push: { chatting: req.params.id } });

                res.status(200).json("user has been followed")
            } else {
                await user.updateOne({ $pull: { chatting: req.body.userId } });
                await currentUser.updateOne({ $pull: { chatting: req.params.id } });
                res.status(200).json("user has been unfollowed")
            }
        } catch (error) {
            res.status(404).json(error)
        }

    } else {
        res.status(403).json("you can follow yourself")
    }
})
// search user 
router.get("/search/:key", async (req, res) => {
    const userInput = req.params.key
    try {
        const user = await User.find({
            "$or": [
                { email: { $regex: userInput } },
                { username: { $regex: userInput } }
            ]
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json(error)
    }
})





module.exports = router;