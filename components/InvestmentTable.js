const people = [
    {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Admin',
        email: 'jane.cooper@example.com',
        image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Admin',
        email: 'jane.cooper@example.com',
        image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Admin',
        email: 'jane.cooper@example.com',
        image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    // More people...
]

const InvestmentTable = ({ headers, investments, type }) => {
    // console.log(investments)
    return (
        <div className="mb-24">
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {headers.map(header => (<th
                                            key={header.id}
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {header.title}
                                        </th>))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* {people.map((person, i) => (
                                        <Investment investment={person} key={i} />
                                    ))} */}
                                    {type === "fund" && investments.map((investment, i) => (
                                        <FundInvestment investment={investment} key={i} />
                                    ))}
                                    {type === "portfolio" && investments.map((investment, i) => (
                                        <UnderlyingInvestment investment={investment} key={i} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvestmentTable


const UnderlyingInvestment = ({ investment }) => {
    return (<>
        <tr key={investment.email} className="">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="">
                        <div className="text-sm font-medium text-gray-900">{investment.name}</div>
                        <a href={investment.website} target="_blank" rel="noreferrer"><div className="text-sm text-gray-500 hover:opacity-30">{investment.website}</div></a>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{(investment.date)}</div>
                <div className="text-sm text-gray-500">{investment.department}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{investment.role}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-a-blue hover:opacity-50">
                    Edit
                </a>
            </td>
        </tr>
    </>)
}
const FundInvestment = ({ investment }) => {
    return (<>
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="">
                        <div className="text-sm font-medium text-gray-900">{investment.fund}</div>
                        <div className="text-sm text-gray-500">{investment.email}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">£{(investment.invested).toLocaleString()}</div>
                {/* <div className="text-sm text-gray-500">{investment.department}</div> */}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                {investment.balanceToDeploy > 500 ?
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Deploying
                    </span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Deployed
                    </span>}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{investment.role}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-a-blue hover:opacity-50">
                    Edit
                </a>
            </td>
        </tr>
    </>)
}