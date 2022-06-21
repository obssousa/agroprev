import { evaluate } from 'mathjs'

export default function calcKc (type, add) {

  const equations = {
    ipa:  `0.7785 * exp(-0.5 * ((${add}-414.5311) / 227.8251) ^ 2)`,
    miu:  `0.7946 * exp(-0.5 * ((${add}-416.7835) / 221.4056) ^ 2)`,
    oem:  `0.7992 * exp(-0.5 * ((${add}-417.2459) / 219.4975) ^ 2)`,
  }

  return evaluate(equations[type]);
}