/**
 * @module feederismbadge
 */
/**
 */

// import needed modules

import * as loglevel from 'loglevel'
import Bluebird = require('bluebird')
import * as express from 'express'
import { BadgeHandler } from './lib/BadgeHandler'

const app: express.Application = express()

const badgeHandler: BadgeHandler = new BadgeHandler(app)

const port = process.env.PORT || 8080

app.listen(port)
