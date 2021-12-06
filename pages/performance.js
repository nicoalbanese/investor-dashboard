import InvestmentTable from "../components/InvestmentTable"
import { useAppContext } from "../context/state"
import StatSection from "../components/statSection"

const fundTableHeaders = [
    { title: "Name", id: 0 },
    { title: "Amount Invested", id: 1 },
    { title: "Status", id: 2 },
    { title: "Balance to Deploy", id: 3 },
    { title: "Live Businesses", id: 4 },
]
const portfolioTableHeaders = [
    { title: "Name", id: 0 },
    { title: "Date of Investment", id: 1 },
    { title: "Amount Invested", id: 2 },
    { title: "Current Value", id: 3 },
    { title: "", id: 4 },
]

// const stats = [
//     { number: 50, title: "portfolio companies" },
//     { number: 50000, title: "amount invested" },
//     { number: 5, title: "multiple" }
// ]

const Performance = () => {
    let { sharedState } = useAppContext();
    let { fundInvestments } = sharedState.airtableData;
    let { portfolio } = sharedState.airtableData;

    return (
        <div>
            {!sharedState.loading ?
                <>

                    <h1 className="text-3xl font-extrabold mt-8 mb-4">Fund Investments</h1>
                    <StatSection />
                    <h1 className="text-3xl font-extrabold mt-8 mb-4">Fund Investments</h1>
                    <InvestmentTable headers={fundTableHeaders} type="fund" investments={fundInvestments} />
                    <h1 className="text-3xl font-extrabold mt-8 mb-4">Your Portfolio</h1>
                    <InvestmentTable headers={portfolioTableHeaders} type="portfolio" investments={portfolio} />
                </>
                : <div>Loading...</div>}
        </div>
    )
}

export default Performance


// {profile && profile.investmentData.status === "ok" ? (
//     <div>
//       <h1 className="font-bold text-3xl mb-24">Welcome back, {profile.investmentData.investorDetails[0].name}!</h1>
//       <div id="fund-investments">
//         <h3 className="font-bold text-2xl">Fund Investments</h3>
//         <table className="mt-4 text-left table-auto w-full">
//           <thead>
//             <tr className="border-b-2 border-white-600">
//               <th>Fund</th>
//               <th>Type</th>
//               <th>Amount Invested</th>
//               <th>Current Value</th>
//               <th>Multiple</th>
//               <th>Balance to Deploy</th>
//             </tr>
//           </thead>
//           <tbody>
//             {profile.investmentData.fundInvestments.map((fundInvestment, i) => {
//               const { name, fund, invested, currentValue, multiple, type, balanceToDeploy } = fundInvestment;
//               return (<tr key={i}>
//                 <td>{fund}</td>
//                 <td>{type[0]}</td>
//                 <td>£{(Math.round(invested * 100) / 100).toLocaleString()}</td>
//                 <td>£{currentValue.toLocaleString()}</td>
//                 <td>{Math.round(multiple * 100) / 100}</td>
//                 <td>{balanceToDeploy > 0 ? `£${balanceToDeploy.toLocaleString()}` : "£0"}</td>

//               </tr>)
//             })}
//           </tbody>
//         </table>
//       </div>
//       <div id="fund-investments" className="mt-24">
//         <h3 className="font-bold text-2xl">Portfolio</h3>
//         <table className="mt-4 text-left table-auto w-full">
//           <thead>
//             <tr className="border-b-2 border-white-600">
//               <th>Company</th>
//               <th>Date</th>
//               <th>Amount Invested</th>
//               <th>Current Value</th>
//               <th>Multiple</th>
//               <th>Fund</th>
//             </tr>
//           </thead>
//           <tbody>
//             {profile.investmentData.portfolio.map((company, i) => {
//               const { name, fund, invested, currentValue, multiple, type, date } = company;
//               return (<tr key={i}>
//                 <td>{name}</td>
//                 <td>{date}</td>
//                 <td>£{invested.toLocaleString()}</td>
//                 <td>£{currentValue.toLocaleString()}</td>
//                 <td>{Math.round(multiple * 100) / 100}</td>
//                 <td>{fund}</td>
//               </tr>)
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>

//   ) : (<div id="sign-in-area">
//     <h1 className="text-4xl font-bold">Ascension Investor Portal</h1>
//     {(profile && profile.investmentData) && <div className="mt-4 bold uppercase">{profile.investmentData.status}</div>}
//   </div>)
//   }