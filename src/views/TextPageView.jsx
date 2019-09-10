import React from 'react';

import checkImageLoaded from '../helpers/checkImageLoaded';

export default class TextPageView extends React.Component {
	state = {
		subscribed: false,
		validEmail: true
	}

	changeText = () => {
		if (!this.state.subscribed) {
			if (document.getElementById('text-page-email-input').value !== "") {
				if (this.state.validEmail === true) {
					document.getElementsByClassName('content-subscribe')[0].style.opacity = '0';
					document.getElementsByClassName('email-input-subscribe')[0].style.opacity = '0';

					document.getElementById('text-page-subscribe-button').classList.add("is-loading");
					setTimeout(() => {
						document.getElementById('text-page-subscribe-button').classList.remove("is-loading");
						document.getElementById('text-page-subscribe-button').classList.remove("enabled");
						document.getElementById('text-page-subscribe-button').classList.add("disabled");

						document.getElementById('text-page-subscribe-button').innerHTML = '<i class="fas fa-check-square perx-icons"></i>Subscribed';
						this.setState({subscribed: true});
					}, 2000);
				} else {
					document.getElementById('text-page-email-input').classList.add('is-danger');
					document.getElementById('text-page-error-msg').style.opacity = "1";
				}
			} 
		}
	};

	componentDidUpdate() {
		if (this.state.subscribed) document.getElementsByClassName('content-success')[0].style.opacity = '1';
	}
	componentDidMount() {
		var image = document.createElement('img');
		image.src = checkImageLoaded(document.getElementsByClassName('text-page-background-image')[0]);
		image.onload = () => {
		    document.getElementsByClassName('text-page-body-container')[0].style.opacity = '1';
		};
	}

	validateEmail = () => {
		//reset error messages
		document.getElementById('text-page-email-input').classList.remove('is-danger');
		document.getElementById('text-page-error-msg').style.opacity = "0";

		var address = document.getElementById('text-page-email-input').value;

	    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

     	this.setState({
     		validEmail: re.test(String(address).toLowerCase())
     	});
	};

	render() {
		return (
			<div className="text-page-body-container">
				<div className="text-page-background-image" />
				<div className="text-page-cta-container">
					{this.state.subscribed ? 
						(
						<div className="content-success">
							<span className="is-header text-page-header">All Done!</span>
							<span className="is-header text-page-body">Proin hendrerit ultrices consectetur. Maecenas posuere imperdiet augue vel pharetra. Morbi sed malesuada ipsum. Aliquam in mollis diam, ut convallis orci. Mauris dignissim id tellus eget dignissim.</span>
						</div>
						)
						:
						(
						<div className="content-subscribe">
							<span className="is-header text-page-header">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
							<span className="is-header text-page-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor hendrerit orci. Ut est ligula, convallis id lacus ut, auctor pulvinar mi</span>
						</div>
						)
					}
					<div>
						<div className="field email-input-subscribe">
						  <p className="control has-icons-left has-icons-right">
						    <input id="text-page-email-input" 
								    className="input" 
								    type="email" placeholder="Email" onChange={this.validateEmail} 
						    />
						    <span id="text-page-error-msg">*Email address is invalid.</span>
						    <span className="icon is-small is-left">
						      <i className="fas fa-envelope"></i>
						    </span>
						  </p>
						</div>
						<a className="button is-primary is-large enabled" id='text-page-subscribe-button' href="/" onClick={this.changeText}>Subscribe</a>
					</div>
				</div>
			</div>
		);
	}
}