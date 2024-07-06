interface SectionItemProps {
    logo: string,
    title: string,
    onClick: () => void;
}
export default function SectionItem({ logo, title, onClick }: SectionItemProps) {
    let width: number = 50;
    return (
        <div className="flex flex-col items-center shrink-0">
            <div className={`relative shrink-0 rounded-[100%] bg-white w-[90px] h-[90px]`}>
                <img src={logo} width={width} className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]" />
            </div>
            <div className="m-4 font-semibold font-[30px]">{title}</div>
        </div>
    );
}