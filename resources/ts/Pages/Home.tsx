import React from 'react';
import ApplicationLayout from "../layouts/ApplicationLayout";


const Home: React.FC = () => {
    
    return (
        <ApplicationLayout>
            <div className="w-full border-b">
                <h1 className="text-xl">Hunter Tool</h1>

                <div className="my-2">
                    Register additional Hunters in the account page
                </div>

                <div className="my-2">
                    Hunt from the hunting page.
                </div>
            </div>

        </ApplicationLayout>
    )
}

export default Home
