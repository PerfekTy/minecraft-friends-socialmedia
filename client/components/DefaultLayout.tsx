import Navbar from "./NAVIGATION/navbar.tsx";

const DefaultLayout = ({children} : {children?: React.ReactNode}) => {
    // Check if login
    return (
        <>
            <main>
                <Navbar/>
            </main>
            {children}
        </>

    );
};

export default DefaultLayout;