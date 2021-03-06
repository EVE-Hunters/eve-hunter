import React from 'react';
import ApplicationLayout from "../layouts/ApplicationLayout";

const Login: React.FC = () => {
    return (
        <ApplicationLayout>
            <div className="w-full mt-4 flex justify-center">
                <a href="/auth/sso/redirect">
                    <img src="/images/eve-sso-login-white-large.png"/>
                </a>
            </div>
        </ApplicationLayout>
    )
}

export default Login
