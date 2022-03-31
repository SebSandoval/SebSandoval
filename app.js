

import 'dotenv/config.js'
import { Server } from './models/server.js'

const server = new Server ()

server.listen()
//mongodb+srv://admin:12345@cluster0.hangp.mongodb.net/proyecto