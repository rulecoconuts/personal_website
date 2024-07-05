interface SectionItemProps {
    logo: string,
    title: string,
    onClick: () => void;
}
export default function SectionItem({ logo, title, onClick }: SectionItemProps) {
    let width: number = 50;
    return (
        <div className="flex flex-col items-center">
            <div className="rounded-[100%] bg-white p-5">
                <img src={logo} width={width} height={width} />
            </div>
            <div className="m-4 font-semibold font-[30px]">{title}</div>
        </div>
    );
}