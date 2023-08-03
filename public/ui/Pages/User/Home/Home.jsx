import React from 'react'
import './Home.scss'
import '../../../Scss/common.scss'
import HeroSection from './HeroSection'
import ExploreSection from './ExploreSection'
import ProfileSection from './ProfileSection'
import AboutSection from './AboutSection'
import ContactUsSection from './ContactUsSection'
import FAQSection from './FAQSection'

const Home = () => {
	return (
		<div className='home'>
			<HeroSection />
			<ExploreSection />
			<ProfileSection />
			<AboutSection />
			<ContactUsSection />
			<FAQSection />
		</div>
	)
}

export default Home