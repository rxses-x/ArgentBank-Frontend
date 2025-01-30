import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../app/store";
import { fetchData } from "../../services/api";
import EditUserInfo from "../../components/editUser/EditUser";
import TransactionList from "../../components/transactionList/TransactionList";

export const User = () => {
    const [username, setUsername] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const setUserData = (data) => {
        // check if data is not null
        if (!data) { return }
        setUsername(data.userName);
        setLastname(data.lastName);
        setFirstname(data.firstName);
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!token) {
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

                setUserData(userInfo);

                dispatch(login({ userInfo, token: data.body.token }));

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
