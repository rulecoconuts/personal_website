'use client';

import { useAtomValue } from "jotai"
import { loadableAboutAtom } from "../../atoms/about_atom"

export default function AboutPage() {
    const aboutTxt = useAtomValue(loadableAboutAtom);

    if (aboutTxt.state == 'loading') return (<></>);

    if (aboutTxt.state == 'hasError') return (<>{`${aboutTxt.error}`}</>);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="flex flex-col z-10 w-full max-w-5xl justify-start items-stretch text-sm lg:flex">
                <div className="flex flex-row w-auto">
                    <div className="flex flex-col items-end text-4xl font-semibold">
                        About
                    </div>
                </div>
                <div className="grid grid-cols-2 auto-rows-min justify-start mt-10 gap-x-2 gap-y-2">
                    {aboutTxt.data}
                </div>
            </div>

        </main>
    )
}