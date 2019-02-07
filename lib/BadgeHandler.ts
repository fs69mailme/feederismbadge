import express = require('express')
import { BadgeType } from './BadgeType'
import { BadgeGenerator } from './BadgeGenerator'
import { StripeBadgeGenerator } from './StripeBadgeGenerator'
import { BadgeOptions } from './BadgeOptions'
import * as sharp from 'sharp'
import { RoundBadgeGenerator } from './RoundBadgeGenerator'

export class BadgeHandler {
  private _app: express.Application

  constructor(app: express.Application) {
    this._app = app
    this._app.get('/badge-:badgeType.:format', this._getBadge.bind(this))
  }

  private _getBadge(req: express.Request, res: express.Response): void {
    let options: any = {}

    for (let color of ['black', 'strawberry', 'vanilla', 'chocolate', 'heart']) {
      let value = Number(req.query[color])

      options[color] = isNaN(value) ? 0.5 : Math.min(Math.max(value, 0), 1)
    }

    let badgeGenerator: BadgeGenerator

    if (req.params.badgeType === 'round') {
      badgeGenerator = new RoundBadgeGenerator(options)
    } else if (req.params.badgeType === 'stripe') {
      badgeGenerator = new StripeBadgeGenerator(options)
    } else {
      res.status(400).json({ errorCode: 'INVALID_BADGETYPE', message: `Invalid badge type ${req.params.badgeType}` })
      return
    }

    const badgeSvg = badgeGenerator.getBadge()

    if ((req.params.format as string).toLowerCase() === 'svg') {
      res
        .status(200)
        .type('svg')
        .send(badgeSvg)
    } else if ((req.params.format as string).toLowerCase() === 'png') {
      let png = new sharp(Buffer.from(badgeSvg, 'utf8'))
      png
        .toBuffer()
        .then(pngBuffer => {
          res
            .status(200)
            .type('png')
            .send(pngBuffer)
        })
        .catch(error => {
          res.status(500).json({
            errorCode: 'CONVERSION_ERROR',
            message: error.message
          })
        })
    } else {
      res.status(400).json({ errorCode: 'INVALID_FORMAT', message: `Invalid image format ${req.params.format}` })
    }
  }
}
