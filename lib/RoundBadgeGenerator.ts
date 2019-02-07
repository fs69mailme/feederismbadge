import { AbstractBadgeGenerator } from './AbstractBadgeGenerator'

// tslint:disable-next-line:no-var-requires
window = require('svgdom')

export class RoundBadgeGenerator extends AbstractBadgeGenerator {
  public getBadge(): string {
    let SVG = require('svgjs')
    const svg = SVG(window.document.documentElement)

    this._recalculateSizes()

    const colorValues = {
      black: '#000000',
      strawberry: '#E0607F',
      vanilla: '#FDF9BC',
      chocolate: '#604043'
    }

    const canvas = svg.size(60, 60)
    canvas.clear()

    let diameterMultiplicator = 3

    for (let color of ['black', 'strawberry', 'vanilla', 'chocolate']) {
      if (this._options[color] > 0) {
        canvas
          .circle(25 + 10 * diameterMultiplicator + Math.ceil(10 * this._options[color]))
          .fill(colorValues[color])
          .center(30, 30)
        diameterMultiplicator = diameterMultiplicator - 1
      }
    }

    // add heart

    canvas
      .path('M0,5 C0,-1.66 10,-1.66 10,5 C10,-1.66 20,-1.66 20,5 C20,11.66 10,16.2156215 10,20 C10,16.2156215 4.07985864e-16,11.66 0,5 Z')
      .size(40 * this._options.heart)
      .fill('#ff0000')
      .center(30, 30)
      .transform({ y: 3 })

    return canvas.svg()
  }
}
