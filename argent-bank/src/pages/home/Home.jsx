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

import React, { memo, useEffect } from 'react';

const MemoizedFeaturesItem = memo(FeaturesItem);

export const Home = () => {
	const dispatch = useDispatch();

	const getToken = () => {
		const data = localStorage.getItem("authToken");
		if (!data) return null;
	  
		const { token, expiryTime } = JSON.parse(data);
	  
		if (Date.now() > expiryTime) {
		  console.log("Token expired, clearing...");
		  localStorage.removeItem("authToken");
		  dispatch(logout());
		  return null;
		}
	  
		return token;
	  };

	useEffect(() => {
		getToken();
	}, []);
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