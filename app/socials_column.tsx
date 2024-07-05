"use client"
import 'reflect-metadata'
import { useAtom } from "jotai";
import Image from "next/image";
import loadableSocialsAtom from "./atoms/socials_atom";

export default function SocialsColumn() {
    const width: number = 50;
    const [socials] = useAtom(loadableSocialsAtom);

    if (socials.state === 'loading') return (<></>);

    if (socials.state === 'hasError') return (<>Failed to load socials: {`${socials.error}`}</>);

    return (
        <div className="flex flex-col space-y-5">
            {socials.data.map((item) => {
                return (
                    <a key={item.name} href={item.url} target="_blank">
                        <div className={`relative w-[${width}px]`}>
                            <img width={width} src={item.name} alt={item.name} className='object-contain' />
                        </div>
                    </a>
                );
            })}
        </div>
    );
}