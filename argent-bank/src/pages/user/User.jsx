import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../app/store";
import { fetchData } from "../../services/api";
import EditUserInfo from "../../components/editUser/EditUser";
import TransactionList from "../../components/transactionList/TransactionList";

export const User = () => {
    const tokenState = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                let token = tokenState || JSON.parse(localStorage.getItem("authToken"))?.token;
                if (!token) {
                    console.log("No token found, redirecting to login page");
                    navigate("/"); // Redirect if no token is found
                    return;
                }

                const response = await fetchData("user/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!data.body) {
                    throw new Error(data.message || 'Failed to fetch user data.');
                }

                const userInfo = {
                    userName: data.body.userName,
                    firstName: data.body.firstName,
                    lastName: data.body.lastName,
                };

                dispatch(login({ userInfo: userInfo, token: token }));

            } catch (err) {
                console.error("Error fetching user data:", err);
                navigate("/");
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            <main className="main">
                <EditUserInfo />
                <h2 className="sr-only">Accounts</h2>
                <TransactionList />
            </main>
        </>
    );
}
