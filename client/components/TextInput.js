import React, { PropTypes } from 'react'

const TextInput = ({name, label, value, onChange, placeholder, error}) => {
	let wrapperClass = "row";
	if (error && error.length > 0) {
		wrapperClass += " " + 'has-error';
	}
	return (
		<main>
			<center>
					<div className="row">
						<div className=" col s12">
							<div className={wrapperClass}>
								<label htmlFor={name}>{label}</label>
								<div className="input-field">
									<input
										type="text"
										name={name}
										className=""
										placeholder={placeholder}
										value={value}
										className=""
										onChange={onChange} />
									{error && <div className="">{error}</div>}
								</div>
						</div>
					</div>
					</div>
			</center>
		</main>
	)
}
export default TextInput;