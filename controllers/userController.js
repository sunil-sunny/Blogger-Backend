const express = require('express');
const User = require('../models/user')
const bcrypt = require('bcryptjs')




const registerUser = async (req, res) => {

    try {
        const { firstname, lastname, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        const userModel = new User({ firstname, lastname, email, password: hashedPassword });
        await userModel.save()
        res.status(201).json({
            "result": "Success"
        })
    } catch (e) {
        res.status(400).send(e)
    }
};

const loginUser = async (req, res) => {
    try {

        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.getAuthToken()
        res.status(200).send({ user, token })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            "result": "failed",
            "Error": e.message
        })
    }
}

module.exports = { registerUser, loginUser }
