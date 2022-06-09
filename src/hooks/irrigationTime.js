import { evaluate } from 'mathjs'
import { calcKc } from './kc';

const Rp = ''; // is the 𝐸𝑇𝑐 replacement according to treatment ?
const Ea = ''; //  application efficiency coefficient

const calcETc = (ETo, Kc) => {
    // crop evapotranspiration ?
    // ref(Evo) (ETo) * Kc (from ADD calc)
    var solve = {
        ETo,
        Kc
    };

    return evaluate('ETo * Kc', solve);
}

const calcKl = (AT) => {
    const fc = '';
    var solve = {
        fc,
        AT
    };
    var fw = evaluate('fc * AT', solve)

    return evaluate('srqt(fw)', fw);
}

// 𝐸1 is the spacing between crop rows, in meters; 
// 𝐸2 is the spacing between plants within row,
// 𝐾𝑙 is location coefficient, a decimal value;
// 𝑛 is the number of emitters;
// 𝑞 is the outflow of the emitter, in liters per hour 𝐿/h;
const calc = (E1, E2, n, q, AT, ETo, type) => {
    
    // call to Kc function evolving ADD
    let Kc = calcKc(type);
    let Kl = calcKl(AT);
    let ETc = calcETc(ETo, Kc);
    
    let a = { ETc, Rp, E1, E2, Kl };
    let b = { n, q, Ea };

    a = evaluate('ETc * Rp * E1 * E2 * Kl', a);
    b = evaluate('n * q * Ea', b);

    let ti = { a, b };

    return evaluate('a * b', ti);
}


export default calc;