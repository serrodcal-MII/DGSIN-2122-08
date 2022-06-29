export interface Tax {
    country: string;
    year: number;
    gdp_per_capita: number;
    total_tax_revenues: number;
    population: number;
}

export class Tax implements Tax{
    constructor(country: string, year: number, gdp_per_capita: number, total_tax_revenues: number, population: number){}
}