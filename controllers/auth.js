const express = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res = express.response) => {

     const {email, password} = req.body;

    try {
    
        let usuario = await Usuario.findOne({email: email})
        if(usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario ya existe con ese correo'
            })
        }

        usuario = new Usuario(req.body)
        //Encript password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save()
          const token = await generarJWT(usuario.id, usuario.name)
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hablar con admin'
        })
    }

}

const loginUsuario = async (req, res = express.response) => {

    const { email, password} = req.body
    try {

        const usuario = await Usuario.findOne({email: email})
        if(!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }
        //Confirmar password
        const validPassword = bcrypt.compareSync(password, usuario.password)
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }
        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name)
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hablar con admin'
        })
    }
   
}

const revalidarToken =  async (req, res = express.response) => {

    const uid = req.uid
    const name = req.name

    const token = await generarJWT(uid, name)

    res.json({
        ok: true,
        msg: 'renew',
        token
    })
}

module.exports = {crearUsuario, loginUsuario, revalidarToken}