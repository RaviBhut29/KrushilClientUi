import React from 'react'
import './footer.scss'
import '../../Scss/common.scss'
import logo from '../../Images/logo.svg';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter } from 'react-feather';


const Footer = () => {
	return (
		<div className='footer-sec'>
			<div className='mailing-section'>
				<div className="container">
					<div className="mailing-col">
						<h3 className='text-gradient'>Ready to get started?</h3>
						<p className='grey-text text-center'>Products on online services or over the Internet. Electronic commerce draws on technologies such as mobile commerce application</p>
						<div className='mailing-input'>
							<input type="text" placeholder='Enter mail address' />
							<button className='blue-btn btn btn-secondary mt-3'>Send</button>
						</div>
					</div>
				</div>

			</div>

			<div className='footer'>
				<div className="container">
					<div className="logo cursor-pointer">
						<img src={logo} alt="main logo" />
					</div>
					<div className="row mt-1 mb-2">
						<div className="col">
							<div className="footer-col">
								<ul>
									<li>
										<Link>Services</Link>
									</li>
									<li>
										<Link>Portfolio</Link>
									</li>
									<li>
										<Link>How it work</Link>
									</li>
									<li>
										<Link>FAQs</Link>
									</li>
								</ul>
							</div>
						</div>
						
						<div className="col">
							<ul>
								<li>
									<Link>About us</Link>
								</li>
								<li>
									<Link>Contact us</Link>
								</li>
								<li>
									<Link>Privacy & Policy</Link>
								</li>
								<li>
									<Link>Trust & Safety</Link>
								</li>
							</ul>
						</div>
						<div className="col">
							<ul>
								<li>
									<Link>Logo Design</Link>
								</li>
								<li>
									<Link>Brand Design</Link>
								</li>
								<li>
									<Link>Stationery Design</Link>
								</li>
								<li>
									<Link>Social Media</Link>
								</li>
							</ul>
						</div>
						<div className="col">
							<ul>
								<li>
									<Link>Business Card Design</Link>
								</li>
								<li>
									<Link>Lable Design</Link>
								</li>
								<li>
									<Link>Banner Design</Link>
								</li>
								<li>
									<Link>Hoardings Design</Link>
								</li>
							</ul>
						</div>
						<div className="col">
							<ul>
								<li>
									<Link>Billboard Design</Link>
								</li>
								<li>
									<Link>Brochure Design</Link>
								</li>
								<li>
									<Link>Catalogue Design</Link>
								</li>
								<li>
									<Link>Flayer Design</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="bottom-col d-flex align-items-center justify-content-between">
						<p className='cursor-pointer grey-text'>© 2023 Flyses. All rights reserved.</p>
						<div className='d-flex align-items-center'>
							<div className='footer-link-icon'>
								<Twitter/>
							</div>
							<div className='footer-link-icon'>
								<Instagram/>
							</div>
							<div className='footer-link-icon'>
								<Facebook/>
							</div>
							<div className='footer-link-icon'>
								<Linkedin/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer