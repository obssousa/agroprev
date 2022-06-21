import { evaluate } from 'mathjs'

const calcETc = (ETo, Kc) => {
    // ref(Evo) (ETo) * Kc (from ADD calc)
    var solve = {
        ETo,
        Kc
    };

    return evaluate('ETo * Kc', solve);
}

const calcKl = (AT, fc) => {
    var solve = {
        fc,
        AT
    };
    var fw = evaluate('fc * AT', solve)

    return evaluate(`sqrt(${fw})`);
}

// 𝐸1 is the spacing between crop rows, in meters; 
// 𝐸2 is the spacing between plants within row,
// 𝐾𝑙 is location coefficient, a decimal value;
// 𝑛 is the number of emitters;
// 𝑞 is the outflow of the emitter, in liters per hour 𝐿/h;
const calc = (E1, E2, n, q, AT, ETo, Kc, fc) => {

    let Kl = calcKl(AT, fc);
    // amount of rainfall that can be measured by a rain gauge and crop evapotranspiration
    let ETc = calcETc(ETo, Kc);
    // é a fração de reposição de ETc dependendo do tratamento usado. 
    // Para alguns tipos de cultura, o uso de reposição de ETo para lâminas 
    // de irrigação pode apresentar aumento de produtividade
    // o aquaprev considerou 100% do valor do ETo para lâmina de irrigação
    const Rp = '1'; // is the 𝐸𝑇𝑐 replacement according to treatment ?

    // é a eficiência de aplicação do tipo de sistema de irrigação utilizado
    const Ea = '1'; //  considera-se 100%, mas pode ser maior
    
    let a = { ETc, Rp, E1, E2, Kl };
    let b = { n, q, Ea };

    a = evaluate('ETc * Rp * E1 * E2 * Kl', a);
    b = evaluate('n * q * Ea', b);

    let ti = { a, b };

    return evaluate('a * b', ti);
}


export default calc;