import React from "react"

export default function Product({
	_id,
	country,
	city,
	address1,
	address2,
	zipCode,
	addressType,
}) {
	return (

		<div>
			<p>{country}</p>
			<p>{city}</p>
			<p>{address1}</p>
			<p>{address2}</p>
			<p></p>
		</div>
    )}