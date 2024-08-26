'use client';

import { useRouter } from "next/navigation";

export default function HomeNavigationIcon() {
    const router = useRouter();

    return (
        <div className="text-3xl font-semibold cursor-pointer" onClick={() => {
            router.push("/");
        }}>
            Oghenefejiro Abohweyere
        </div>
    )
}