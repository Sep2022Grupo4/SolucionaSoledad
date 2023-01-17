const Calls = require("../models/calls.model");

const calls = {
    startCall: async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        const { fk_id_from, fk_id_to, time_start } = req.body
        console.log(req.body)
        try {
            const call = await Calls.create(con);
            const newcall = await call.create({ fk_id_from, fk_id_to, time_start })
            console.log(newcall)
            res.json(newcall)
        } catch (error) {
            console.log(error)
            res.send(false)
        } finally {
            await conexion.cerrar(con);
        }
    },
    finishCall: async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        try {
            const { time_finish, answer, id } = req.body
            const call = await Calls.create(con);
            const newcall = await call.update({ time_finish, answer }, { where: { id } })
            console.log("UPDATEEEEEEEEEE")

            res.json(true)
        } catch (error) {
            console.log(error)
            res.send(false)
        } finally {
            await conexion.cerrar(con);
        }
    },
}

module.exports = calls