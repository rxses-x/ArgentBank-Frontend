import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserName } from "../../app/store";
import { fetchData } from "../../services/api";

const EditUserInfo = () => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.auth);
	const token = useSelector((state) => state.auth.token);

	const [tempUserName, setTempUserName] = useState("");

	// Validate username to allow only letters
	const isValidUserName = (userName) => /^[a-zA-Z]+$/.test(userName.trim());

	// Sync local state with Redux store
	useEffect(() => {
		setTempUserName(userInfo?.userName || "");
	}, [userInfo]);

	const handleSave = async () => {
		if (!isValidUserName(tempUserName)) {
			setTempUserName(userInfo?.userName || "");
			alert('Invalid username. Only letters are allowed, and no spaces.');
			return;
		}

		try {
			const response = await fetchData("user/profile", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ userName: tempUserName }),
			});
			const data = await response.json();
			if (response.ok) {
				dispatch(updateUserName(tempUserName));
				console.log("User info saved successfully!");
			} else {
				console.error("Error updating user info:", data.message);
			}
		} catch (error) {
			console.error("Error updating user info:", error);
		}
	};

	const handleCancel = () => {
		setTempUserName(userInfo?.userName || "");
	};

	return (
		<div className="edit-user__info">
			<div className="edit-user__form-container">
				<h2 className="edit-user-form-container--title">Edit User Info</h2>
				<form>
					<label>
						User Name:&nbsp;
						<input
							type="text"
							value={tempUserName}
							onChange={(e) => setTempUserName(e.target.value)}
						/>
					</label>
					<label>
						First Name:&nbsp;
						<input type="text" value={userInfo?.firstName || ""} disabled />
					</label>
					<label>
						Last Name:&nbsp;
						<input type="text" value={userInfo?.lastName || ""} disabled />
					</label>
					<div className="edit-user__form-container--button-container">
						<button type="button" onClick={handleSave}>
							Save
						</button>
						<button type="button" onClick={handleCancel}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditUserInfo;