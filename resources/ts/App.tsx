import React from 'react';
import Home from './Pages/Home';
import AuthProvider from './providers/AuthProvider';
import {Toaster} from 'react-hot-toast';
import {
	BrowserRouter,
	Routes,
	Route,
	useRoutes,
    Router,
} from 'react-router-dom';
import Login from './Pages/Login';
import Account from './Pages/Account';
import Hunting from './Pages/Hunting';
import Fleets from './Pages/Fleets';

import routes from './routes';

const App: React.FC = () => {
	const _routes = useRoutes(routes);
	return (
		<div className="h-screen bg-gray-400">
			<Toaster />
            <AuthProvider>
			    {_routes}
            </AuthProvider>

		</div>
	);
};

/*const App: React.FC = () => {
    return (
        <div className="h-screen bg-gray-400">
            <Toaster />
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/account" element={<Account />}/>
                        <Route path="/hunting" element={<Hunting />}/>
                        <Route path="/fleets" element={<Fleets />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    )
}*/

export default App;
