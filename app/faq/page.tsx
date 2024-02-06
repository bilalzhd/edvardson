import BreadCrumb from "@/components/BreadCrumb";
import Link from "next/link";

export default function Faq() {
    return (
        <>
        <BreadCrumb firstLink="FAQ" />
        <div className="xl:max-w-[80%] 2xl:max-w-[70%] mx-auto my-5 text-[14px]">
            <h1 className="font-[22px] mb-5">Vanliga frågor</h1>
            <ul>
                <li className="mb-3"><Link href="/villkor-info" className="underline hover:font-bold">Köpvillkor & info</Link></li>

                <li><Link href="/om-edvardson" className="underline hover:font-bold">Om Edvardson</Link></li>
            </ul>
        </div>
        </>
    )
}
