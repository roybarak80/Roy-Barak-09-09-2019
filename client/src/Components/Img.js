import React from 'react';

const Img = props =>
	<div className="col-lg-3 col-md-4 col-xs-6 thumb">
		<a href={props.link} className="d-block mb-4 h-100">

			<img className="img-fluid img-thumbnail" src={props.url} alt="Unsplash Image here" />
		</a>
		{/* <p>
			Photo by
			<a href={props.user}>{props.name}</a>
			<a href={props.link}> See on Unsplash</a>
		</p> */}
	</div>




export default Img;
