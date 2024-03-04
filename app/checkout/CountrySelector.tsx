"use client"

import ChevronDown from "@/components/icons/ChevronDown";
import { useState } from "react"
import { countries } from "./responsivebreakpoints";

type Country = {
    countryCode: string,
    countryName: string
}

export default function CountrySelector({ countries }: any) {
    const [selected, setSelected] = useState("Sweden / SEK");
    const [showCountries, setShowCountries] = useState(false);
    const [search, setSearch] = useState("");

    const handleClick = (event: any) => {
        const selectedCountryCode = event.target.parentNode.parentNode.getAttribute('data-value');
        const selectedCountryName = event.target.innerText;
        if (selectedCountryCode) {
            setSelected(selectedCountryName + " - " + selectedCountryCode.toLocaleLowerCase());
            setShowCountries(false)
            setSearch("")
        }
    };

    const filteredCountries = countries?.filter((country: Country) => country?.countryName.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="relative">
            <div className="px-4 py-2 flex w-full rounded border border-gray-600 items-center justify-between" onClick={() => setShowCountries(prev => !prev)}>
                <input type="button" value={selected} />
                <ChevronDown className="w-4 h-4" />
            </div>
            <div className={`${showCountries ? 'block' : 'hidden'} absolute top-[42px] w-full`}>
                <div className="tws-react-common--search-dropdown-header">
                    <input type="text" onChange={(e) => setSearch(e.target.value)} className="border-gray-600 border-b border-r border-l focus:outline-none px-4 py-2 w-full tws-react-common--search-dropdown-header-input form-control" placeholder="Search..." />
                </div>
                <ul className={`bg-white border p-4 space-y-2 tws-react-common--search-dropdown-ul max-h-[300px] overflow-y-auto cursor-pointer`} onClick={handleClick}>
                    {filteredCountries.map((c: Country) => {
                        return (
                            <li key={c.countryCode} data-value={c.countryCode} className="tws-react-common--search-dropdown-item">
                                <a className="w-full">
                                    <span className="block w-full tws-react-common--search-dropdown-item-value">{c.countryName}</span>
                                </a>
                            </li>
                        )
                    })}
                    {filteredCountries.length < 1 && <li>No Countries Found...</li>}
                </ul>
            </div>
        </div>
    )
}

