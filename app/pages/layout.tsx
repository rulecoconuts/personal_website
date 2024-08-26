import HomeNavigationIcon from "./home_navigation_icon";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className="absolute top-[10px] left-[10px] pointer-">
                <HomeNavigationIcon />
            </div>

            {children}
        </div>
    );
}