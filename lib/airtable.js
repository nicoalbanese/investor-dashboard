export async function getInvestor(email) {
    let myHeaders = new Headers();
    myHeaders.append(
        "Authorization",
        `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`
    );
    myHeaders.append("Cookie", "brw=brwy1TrDiZyNAsU5u");

    let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
    const AIRTABLE_URL =
        `https://api.airtable.com/v0/appUdh14c6zo2HVSm/Investor%20DB?filterByFormula={Email}="${email}"`;
    const res = await fetch(AIRTABLE_URL, requestOptions);
    const data = await res.json();
    if (!data.records[0]) { return { message: "null" } }

    let structuredData = data.records.map((company) => {
        return {
            name: company.fields.Name,
            amountDeployed: company.fields["Total Amount Deployed"],
            currentValue: company.fields["Total Current Value"],
            valuePercentage: company.fields["Portfolio Value as Percentage"],
            unrealised: company.fields["Total Unrealised Value"],
            realised: company.fields["Total Realised Value"],
            investmentCount: company.fields["Number of Investments"],
            portfolioSize: company.fields["Portfolio Size"],
            liveInvestments: company.fields["Live Investments"],
            incomeTaxRelief: company.fields["Total Income Tax Relief"],
        };
    });
    return structuredData;
}


export async function getFundInvestments(email) {
    let myHeaders = new Headers();
    myHeaders.append(
        "Authorization",
        `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`
    );
    myHeaders.append("Cookie", "brw=brwy1TrDiZyNAsU5u");

    let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
    const AIRTABLE_URL =
        `https://api.airtable.com/v0/appUdh14c6zo2HVSm/Investor%20Fund%20Investments?filterByFormula={Investor Email}="${email}"`;
    const res = await fetch(AIRTABLE_URL, requestOptions);
    const data = await res.json();
    if (!data.records[0]) { return { message: "null" } }
    let structuredData = data.records.map((company) => {
        return {
            name: company.fields.Name,
            invested: company.fields["Fund Investment"],
            currentValue: company.fields["Current Value"],
            multiple: company.fields["Multiple"],
            balanceToDeploy: company.fields["Balance to Deploy"],
            yearInvested: company.fields["Year Invested"],
            type: company.fields["Fund Type"],
            fund: company.fields["Fund (text)"],
            // liveInvestments: company.fields["Live Investments"],
            // incomeTaxRelief: company.fields["Total Income Tax Relief"],
        };
    });
    return structuredData;
}
