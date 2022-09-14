/*import React from 'react';
import { render } from 'react-dom';
import App from "./App";*/

/*render(
    <React.StrictMode>
        <App />
    </React.StrictMode>

, document.getElementById("app"));*/

import React from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthProvider from './providers/AuthProvider';
const container = document.getElementById('app');
if(container){
	const root = createRoot(container);
	root.render(
		<React.StrictMode>
			<BrowserRouter>

                <App/>

            </BrowserRouter>
		</React.StrictMode>
	);
}

