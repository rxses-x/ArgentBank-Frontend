import React, { memo, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux'
import IconChat from '../../assets/icon-chat.png'
import IconMoney from '../../assets/icon-money.png'
import IconSecurity from '../../assets/icon-security.png'
import { FeaturesItem } from '../../components/featuresItem/FeaturesItem'
import { Hero } from '../../components/hero/Hero'
import { logout } from '../../app/store'

const features = [
	{
		imgSrc: IconChat,
		imgAlt: "Chat",
		title: "You are our #1 priority",
		description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
	},
	{
		imgSrc: IconMoney,
		imgAlt: "Money",
		title: "More savings means higher rates",
		description: "The more you save with us, the higher your interest rate will be!"
	},
	{
		imgSrc: IconSecurity,
		imgAlt: "Security",
		title: "Security you can trust",
		description: "We use top of the line encryption to make sure your data and money is always safe."
	}
]

const MemoizedFeaturesItem = memo(FeaturesItem);

export const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const checkToken = () => {
			const data = localStorage.getItem("authToken");
			if (!data) return;

			try {
				const { token, expiryTime } = JSON.parse(data);
				if (!token || Date.now() > expiryTime) {
					console.log("Token expired, logging out...");
					localStorage.removeItem("authToken");
					dispatch(logout());
					window.location.reload();
					return;
				}

				// Calculate time left before expiration
				const remainingTime = expiryTime - Date.now();
				
				return remainingTime;
			} catch (error) {
				console.error("Error parsing token:", error);
				localStorage.removeItem("authToken");
				dispatch(logout());
				window.location.reload();
			}
		};

		// Check every second
		const interval = setInterval(() => {
			const remainingTime = checkToken();
			if (remainingTime && remainingTime <= 0) {
				clearInterval(interval);
			}
		}, 1000);

		// Listen for storage changes (other tabs)
		const handleStorageChange = (event) => {
			if (event.key === "authToken") {
				console.log("authToken changed, rechecking expiration...");
				checkToken();
			}
		};

		window.addEventListener("storage", handleStorageChange);

		return () => {
			clearInterval(interval);
			window.removeEventListener("storage", handleStorageChange);
		};
	}, [dispatch]);

	return (
		<main>
			<Hero />
			<section className="features">
				<h2 className="sr-only">Features</h2>
				{features.map((feature, index) => (
					<MemoizedFeaturesItem
						key={index}
						title={feature.title}
						desc={feature.imgAlt}
						image={feature.imgSrc}
					>
						{feature.description}
					</MemoizedFeaturesItem>
				))}
			</section>
		</main>
	)
}