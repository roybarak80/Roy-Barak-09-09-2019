import React, { Component } from 'react';

export default class SearchForm extends Component {
	state = {
		searchText: ''
	};

	onSearchChange = e => {
		this.setState({ searchText: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.onSearch(this.query.value);
		e.currentTarget.reset();
	};

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" href="#">Images App</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">


					</ul>

					<form className="form-inline my-2 my-lg-0 search-form" onSubmit={this.handleSubmit}>

						<input
							type="search"
							className="form-control mr-sm-2"
							onChange={this.onSearchChange}
							ref={input => (this.query = input)}
							name="search"
							placeholder="Search..."
						/>
						<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
					</form>


				</div>
			</nav>

		);
	}
}
