import { PensionPot } from "../types/pensions";
import { readPensionData } from "./readPensionData";

// @see https://www.cs.ucr.edu/~ehwang/interest.html
export async function getAllPotsForecastedBalance(
  years: number
): Promise<(PensionPot & { forecastedBalance: number })[]> {
  const pensionData = await readPensionData();

  return pensionData.pensionPots.map((pot) => {
    const rate = pot.annualInterestRate ?? pot.defaultAnnualInterestRate;
    const monthlyPayment = pot.monthlyPayment;
    const initialAmount = pot.amount;

    // Convert annual rate to monthly
    const monthlyRate = rate / 12;
    const months = years * 12;

    const futureValue =
      initialAmount * Math.pow(1 + monthlyRate, months) +
      monthlyPayment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    return {
      ...pot,
      forecastedBalance: Math.round(futureValue),
    };
  });
}
