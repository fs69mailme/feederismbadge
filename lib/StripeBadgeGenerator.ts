import { AbstractBadgeGenerator } from './AbstractBadgeGenerator'

// tslint:disable-next-line:no-var-requires
window = require('svgdom')

export class StripeBadgeGenerator extends AbstractBadgeGenerator {
  public getBadge(): string {
    let SVG = require('svgjs')
    const svg = SVG(window.document.documentElement)

    this._recalculateSizes()

    let x = 120 - 100

    const colorValues = {
      black: '#000000',
      strawberry: '#E0607F',
      vanilla: '#FDF9BC',
      chocolate: '#604043'
    }

    const canvas = svg.size(120, 40)
    canvas.clear()

    for (let color of ['black', 'strawberry', 'vanilla', 'chocolate']) {
      canvas
        .rect(Math.ceil(50 * this._options[color]), 20)
        .fill(colorValues[color])
        .move(x, 10 + 10 * this._options.heart)

      x = x + 50 * this._options[color]
    }

    // add heart

    canvas
      .path('M0,5 C0,-1.66 10,-1.66 10,5 C10,-1.66 20,-1.66 20,5 C20,11.66 10,16.2156215 10,20 C10,16.2156215 4.07985864e-16,11.66 0,5 Z')
      .size(40 * this._options.heart)
      .fill('#ff0000')
      .move(120 - 100 - (40 * this._options.heart) / 2, (20 - (40 * this._options.heart) / 2) / 2)

    return canvas.svg()
  }
}
