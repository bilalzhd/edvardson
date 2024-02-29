"use client"
import { usePathname } from "next/navigation";
import ChevronRight from "./icons/ChevronRight";
import Link from "next/link";

export default function BreadCrumb() {
    const path = usePathname();
    const pathSegments = path.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', url: "/" }];
    let skipNextSegment = false;

    for (let i = 0; i < pathSegments.length; i++) {
        const segment = pathSegments[i];
        
        if (skipNextSegment) {
            skipNextSegment = false;
            continue;
        }

        if (segment === 'product-category') {
            const parentCategory = pathSegments[i + 1];
            breadcrumbs.push({ label: capitalize(parentCategory), url: `/${segment}/${parentCategory}` });
            skipNextSegment = true;
            continue;
        }

        const url = `/${pathSegments.slice(0, i + 1).join('/')}`;
        const label = capitalize(segment.replace(/-/g, ' '));

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

function capitalize(str: string) {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
