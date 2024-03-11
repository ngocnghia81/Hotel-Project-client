import React, { useState } from "react"
import { Link } from "react-router-dom"
import { registerUser } from "../utils/ApiFunctions"


const Registration = () => {
	const [registration, setRegistration] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: ""
	})

	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [passwordAgain,setPasswordAgain] = useState("")
	const [passwordsMatch, setPasswordsMatch] = useState(false);
	const [password,setPassword] = useState("")
	const [isPasswordValid,setIsPasswordValid] = useState(false)
	
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
		// Kiểm tra mật khẩu nhập lại khi mật khẩu thay đổi
		setPasswordsMatch(event.target.value === passwordAgain);
		if(event.target.value.length <=8 ){
			setIsPasswordValid(false)
			setErrorMessage("Password must be greater than or equal to 8 characters!")
		}
		setIsPasswordValid(true)
		handleInputChange(event)
	};
	const handlePasswordAgainChange = (event) => {
		setPasswordAgain(event.target.value);
		// Kiểm tra mật khẩu nhập lại khi mật khẩu nhập lại thay đổi
		
		setPasswordsMatch(event.target.value === password);
	};

	const handleInputChange = (e) => {
		setRegistration({ ...registration, [e.target.name]: e.target.value })
	}

	const handleRegistration = async (e) => {
		e.preventDefault()
		try {
			const result = await registerUser(registration)
			setSuccessMessage(result)
			setErrorMessage("")
			setRegistration({ firstName: "", lastName: "", email: "", password: "" })
		} catch (error) {
			setSuccessMessage("")
			setErrorMessage(`Registration error : ${error.message}`)
		}
		setTimeout(() => {
			setErrorMessage("")
			setSuccessMessage("")
		}, 5000)
	}

	return (
		<section className="container col-6 mt-5 mb-5">
			{errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
			{successMessage && <p className="alert alert-success">{successMessage}</p>}

			<h2>Register</h2>
			<form onSubmit={handleRegistration}>
				<div className="mb-3 row">
					<label htmlFor="firstName" className="col-sm-2 col-form-label">
						First Name
					</label>
					<div className="col-sm-10">
						<input
							id="firstName"
							name="firstName"
							type="text"
							className="form-control"
							value={registration.firstName}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="lastName" className="col-sm-2 col-form-label">
						Last Name
					</label>
					<div className="col-sm-10">
						<input
							id="lastName"
							name="lastName"
							type="text"
							className="form-control"
							value={registration.lastName}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="email" className="col-sm-2 col-form-label">
						Email
					</label>
					<div className="col-sm-10">
						<input
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={registration.email}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="password" className="col-sm-2 col-form-label">
						Password
					</label>
					<div className="col-sm-10">
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							value={registration.password}
							onChange={handlePasswordChange}
						/>
					</div>
				</div>
				<div className="mb-3 row">
					<label htmlFor="passwordAgain" className="col-sm-2 col-form-label">
						Re-enter Password
					</label>
					<div className="col-sm-10">
						<input
							type="password"
							className="form-control"
							id="passwordAgain"
							name="passwordAgain"
							value={passwordAgain}
							onChange={handlePasswordAgainChange}
						/>
					</div>
				</div>
				{passwordsMatch && isPasswordValid && (
					<div className="mb-3">
					<button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
						Register
					</button>
					
				</div>
				)}
				<span style={{ marginLeft: "10px" }}>
						Already have an account? <Link to={"/login"}>Login</Link>
					</span>
			</form>
		</section>
	)
}

export default Registration