import waterBlades from '@/constants/waterBlade';
import { evaluate } from 'mathjs';

const noRainFall = ((area) => {
    console.log(area);
    const dias = 30;
    const cisterna = 16147200;
    const laminas = waterBlades;

    const volumes = laminas.map((blade) => { 
        const vol = evaluate(`${blade}*${area}`);
        return vol;
    });

    const simulacoes = 1000;
    let demandas = [];
    let falha = 0;

    for (let index = 0; index < simulacoes; index++) {
        let demanda = daysSimulate(volumes, dias);
        demandas.push(demanda);
        if (demanda > cisterna) falha += 1;
    }        

    console.log("Probabilidade da cisterna esvaziar antes do tempo: " + (falha/simulacoes).toPrecision(4));
    console.log("Probabilidade de sucesso: " + (1.0 - falha/simulacoes).toPrecision(4));

});

const daysSimulate = ((volumes, dias) => {
    let soma = 0;
    for (let index = 0; index < dias; index++) {
        soma += volumes[Math.floor(volumes.length * Math.random())];
    }
    return soma;
});

export default noRainFall;