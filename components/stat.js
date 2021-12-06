const Stat = ({ stat = { number: 50, title: "portfolio companies" } }) => {
    return (
        <div className="flex flex-col bg-gray-50 py-8 px-4 items-center w-64 rounded-lg">
            <h3 className="text-a-blue uppercase text-xs font-extrabold">{stat.title}</h3>
            <h1 className="text-4xl text-a-dark font-extrabold">{stat.number}</h1>
        </div>
    )
}

export default Stat
