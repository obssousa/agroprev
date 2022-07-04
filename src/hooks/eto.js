import { evaluate } from 'mathjs'

export default function calcEto (ro, temp, temp_max, temp_min) {

  const ro_day = evaluate(`${ro} / 11.57`); 

  const form = `(0.0023 * ${ro_day} * exp(${temp_max} - ${temp_min}) ^ 1/2) * (${temp} + 17.8)`;

  return evaluate(form);
}