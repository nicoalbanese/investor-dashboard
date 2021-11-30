import { getFundInvestments, getInvestor, getPortfolio } from "../../../lib/airtable";

export default async function handler(req, res) {
    const { email } = req.query;
    console.log(req.query);
    const investorDetails = await getInvestor(email);
    const fundInvestments = await getFundInvestments(email)
    const portfolio = await getPortfolio(email)
    if (investorDetails.message) {
        res.status(404).json({ message: "email not found" })
    } else {
        res.status(200).json({ investorDetails, fundInvestments, portfolio })
    }
}
