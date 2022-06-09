import { evaluate } from 'mathjs'

const calcKc = (type, add) => {

    const scope = {
      add,
    }

    const equations = {
      ipa:  '0.7785*exp(-0,5*((ADD-414,5311)/227,8251)^2)',
      miu:  '0.7946*exp(-0,5*((ADD-416,7835)/221,4056)^2)',
      oem:  '0.7992*exp(-0,5*((ADD-417,2459)/219,4975)^2)',
    }
  
    return evaluate(equations[type], scope);
}


export default calcKc;