const fetchAirtable = async (tab, columnToQuery, queryValue, sortColumn) => {
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
    let AIRTABLE_URL;
    const urlWithSort = `https://api.airtable.com/v0/appUdh14c6zo2HVSm/${encodeURI(tab)}?filterByFormula={${columnToQuery}}="${queryValue}"&sort%5B0%5D%5Bfield%5D=${encodeURI(sortColumn)}&sort%5B0%5D%5Bdirection%5D=asc`;
    const urlWithoutSort = `https://api.airtable.com/v0/appUdh14c6zo2HVSm/${encodeURI(tab)}?filterByFormula={${columnToQuery}}="${queryValue}"`;
    sortColumn !== undefined ? AIRTABLE_URL = urlWithSort : AIRTABLE_URL = urlWithoutSort;
    console.log(sortColumn);
    // AIRTABLE_URL = urlWithoutSort;
    const res = await fetch(AIRTABLE_URL, requestOptions);
    // console.log(res);
    const data = await res.json();
    return data;
}

export async function getInvestor(email) {
    const data = await fetchAirtable("Investor DB", "Email", email)
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
    const data = await fetchAirtable("Investor Fund Investments", "Investor Email", email, "Year Invested")

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
            liveInvestments: company.fields["Live Investments"]
            // liveInvestments: company.fields["Live Investments"],
            // incomeTaxRelief: company.fields["Total Income Tax Relief"],
        };
    });
    return structuredData;
}

export async function getPortfolio(email) {
    const data = await fetchAirtable("Investor Underlying Investments", "Email (text)", email, "Date of Investment")

    if (!data.records[0]) { return { message: "null" } }
    let structuredData = data.records.map((company) => {
        return {
            name: company.fields["Company (text)"],
            invested: company.fields["Amount Invested"],
            currentValue: company.fields["Investment Current Value"],
            multiple: company.fields["Multiple"],
            type: company.fields["Investment Type"][0],
            fund: company.fields["Fund Invested Through (formula)"],
            status: company.fields["Investment Status"],
            date: company.fields["Date of Investment"] && company.fields["Date of Investment"][0],
            website: company.fields["Website"] && company.fields["Website"][0]
        };
    });
    return structuredData;
}
