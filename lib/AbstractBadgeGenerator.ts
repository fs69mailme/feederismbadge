import { BadgeOptions } from './BadgeOptions'
import { BadgeGenerator } from './BadgeGenerator'

export abstract class AbstractBadgeGenerator implements BadgeGenerator {
  protected _options: BadgeOptions

  constructor(options: BadgeOptions) {
    this._options = options
  }

  public abstract getBadge(): string

  protected _recalculateSizes(): void {
    let lowerValues = []
    let higherValues = []
    let sameValues = []

    const diffBlack = 0.5 - this._options.black

    if (diffBlack > 0) {
      lowerValues.push('black')
    } else if (diffBlack < 0) {
      higherValues.push('black')
    } else {
      sameValues.push('black')
    }

    const diffStrawberry = 0.5 - this._options.strawberry

    if (diffStrawberry > 0) {
      lowerValues.push('strawberry')
    } else if (diffStrawberry < 0) {
      higherValues.push('strawberry')
    } else {
      sameValues.push('strawberry')
    }

    const diffVanilla = 0.5 - this._options.vanilla

    if (diffVanilla > 0) {
      lowerValues.push('vanilla')
    } else if (diffVanilla < 0) {
      higherValues.push('vanilla')
    } else {
      sameValues.push('vanilla')
    }
    const diffChocolate = 0.5 - this._options.chocolate

    if (diffChocolate > 0) {
      lowerValues.push('chocolate')
    } else if (diffChocolate < 0) {
      higherValues.push('chocolate')
    } else {
      sameValues.push('chocolate')
    }

    const diffTotal = diffBlack + diffStrawberry + diffVanilla + diffChocolate

    if (diffTotal > 0) {
      // the total diff is less, so add some more to the higher values

      let values = higherValues.concat(sameValues)

      const addValue = diffTotal / values.length

      for (let item of values) {
        this._options[item] = this._options[item] + addValue
      }
    } else if (diffTotal < 0) {
      // the total diff is more, so substract from the lower values
      let values = lowerValues.concat(sameValues)

      const substractValue = (diffTotal * -1) / values.length

      for (let item of values) {
        this._options[item] = this._options[item] - substractValue
      }
    }
  }
}
