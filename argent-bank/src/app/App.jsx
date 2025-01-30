import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import '../style/main.scss'; // Import the Sass file
import { Home } from '../pages/home/Home';
import { SignIn } from '../pages/signin/SignIn';
import { User } from '../pages/user/User';
import { Header } from '../features/header/Header';
import { Footer } from '../components/footer/Footer'

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route exact path="/" element={ <Home />} />

				<Route path="/login" element={ <SignIn />} />

				<Route path="/profile" element={<User />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App;