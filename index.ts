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

app.listen(8080)
