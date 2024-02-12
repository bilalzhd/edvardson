// import ChevronRight from "./icons/ChevronRight";

// export default function BreadCrumb({ firstLink, secondLink, thirdLink }: any) {
//     const firstLinkUrl = firstLink?.toLowerCase().replace(/\s+/g, '-');
//     return (
//         <div className="px-4 md:px-0 py-[20px] text-[11px] text-[#0a0a0a] flex items-center mx-auto xl:max-w-[87%] 2xl:max-w-[70%] 2xl:pl-[25px]">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-3 h-3"><path fill="#000" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" /></svg>
//             <span className="tws-breadcrumbs--crumb items-center flex">
//                 <ChevronRight className="w-2 h-2" />
//                 <a href={firstLinkUrl} className="tws-breadcrumbs--text">
//                     <span>{firstLink || "Before and after the hunt"}</span>
//                 </a>
//             </span>
//             {secondLink && <span className="tws-breadcrumbs--crumb items-center flex">
//                 <ChevronRight className="w-2 h-2" />
//                 <a href="https://www.edvardson.se/sv/fore-och-efter-jakten/slakt-och-kotthantering/" className="tws-breadcrumbs--text">
//                     {secondLink}
//                 </a>
//             </span>}
//             {thirdLink && <span className="tws-breadcrumbs--current tws-breadcrumbs--crumb flex items-center">
//                 <ChevronRight className="w-2 h-2" />
//                 <a href="https://www.edvardson.se/sv/fore-och-efter-jakten/slakt-och-kotthantering/knivar/" className="tws-breadcrumbs--text">
//                     {thirdLink}
//                 </a>
//             </span>}
//         </div>
//     )
// }

// import { useRouter } from 'next/navigation';
"use client"
import { usePathname } from "next/navigation";
import ChevronRight from "./icons/ChevronRight";
import Link from "next/link";

export default function BreadCrumb() {
    const path = usePathname();
    const pathSegments = path.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', url: "/" }];

    let skipProductCategory = false;

    for (let i = 0; i < pathSegments.length; i++) {
        const segment = pathSegments[i];

        if (segment === 'product-category') {
            skipProductCategory = true;
            continue;
        }
        if (skipProductCategory) {
            skipProductCategory = false;
            continue;
        }
        
        const url = `/${pathSegments.slice(0, i + 1).join('/')}`;
        const label = segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

        breadcrumbs.push({ label, url });
    }

    return (
        <div className="px-4 md:px-0 py-[20px] text-[11px] text-[#0a0a0a] flex items-center mx-auto xl:max-w-[87%] 2xl:max-w-[70%] 2xl:pl-[25px]">
            {breadcrumbs.map((breadcrumb, index) => (
                <span key={index} className="tws-breadcrumbs--crumb items-center flex">
                    {index > 0 && <ChevronRight className="w-2 h-2" />}
                    <Link href={breadcrumb.url} className="tws-breadcrumbs--text">
                        <span>{breadcrumb.label}</span>
                    </Link>
                </span>
            ))}
        </div>
    );
}
