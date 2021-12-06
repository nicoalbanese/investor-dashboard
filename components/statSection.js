import Stat from "./stat"
import { useAppContext } from "../context/state"

const StatSection = ({ stats }) => {

    const { sharedState } = useAppContext();
    // const investorDetails = sharedState.investorDetails;

    console.log(sharedState.airtableData.investorDetails)
    return (
        <div className="grid grid-flow-col gap-4 justify-between">
            <Stat stat={{ title: "amount deployed", number: `£${(sharedState.airtableData.investorDetails[0].amountDeployed).toLocaleString()}` }} />
            <Stat stat={{ title: "multiple", number: 0 }} />
            <Stat stat={{ title: "Portfolio companies", number: 0 }} />
        </div>
    )
}

export default StatSection
