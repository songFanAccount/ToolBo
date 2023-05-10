import './App.css';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import DefaultLayout from './components/DefaultLayout';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
	return (
    	<BrowserRouter>
			<Routes>
				<Route path="/" element={<DefaultLayout />} >
					<Route index element={<Home />} />
					<Route path="about" element={<AboutUs />} />
					<Route path="contact" element={<Contact />} />

				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
    	</BrowserRouter>
  	);
}

export default App;
