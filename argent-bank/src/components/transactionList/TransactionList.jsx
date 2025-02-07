import { useState } from "react";

const TransactionList = () => {
	const transactions = [
		{
			id: 1,
			date: "27/02/20",
			description: "Golden Sun Bakery",
			amount: "$8.00",
			balance: "$48,098.43",
			details: [
				{
					balance: "$298.00",
					type: "Electronic",
					category: "Food",
					note: "Lorem ipsum",
				},
				{
					balance: "$298.00",
					type: "Electronic",
					category: "Food",
					note: "Lorem ipsum",
				},
				{
					balance: "$298.00",
					type: "Electronic",
					category: "Food",
					note: "Lorem ipsum",
				},
				{
					balance: "$298.00",
					type: "Electronic",
					category: "Food",
					note: "Lorem ipsum",
				}
			]
		},
		{
			id: 2,
			date: "27/02/20",
			description: "Golden Sun Bakery",
			amount: "$8.00",
			balance: "$48,098.43",
			details: [
				{
					balance: "$298.00",
					type: "Electronic",
					category: "Food",
					note: "Lorem ipsum",
				},
				{
					balance: "$298.00",
					type: "Electronic",
					category: "Food",
					note: "Lorem ipsum",
				},
				{
					balance: "$298.00",
					type: "Electronic",
					category: "Food",
					note: "Lorem ipsum",
				},
				{
					balance: "$298.00",
					type: "Electronic",
					category: "Food",
					note: "Lorem ipsum",
				}
			]
		},
		{
			id: 3,
			date: "27/02/20",
			description: "Golden Sun Bakery",
			amount: "$8.00",
			balance: "$48,098.43",
			details: [
				{
					balance: "$298.00",
					type: "Electronic",
					category: "Food",
					note: "Lorem ipsum",
				},
				{
					balance: "$298.00",
					type: "Electronic",
					category: "Food",
					note: "Lorem ipsum",
				},
				{
					balance: "$298.00",
					type: "Electronic",
					category: "Food",
					note: "Lorem ipsum",
				},
				{
					balance: "$298.00",
					type: "Electronic",
					category: "Food",
					note: "Lorem ipsum",
				}
			]
		},
	];

	const [expandedAccount, setExpandedAccount] = useState(null);
	const [expandedTransaction, setExpandedTransaction] = useState(null);
	const [category, setCategory] = useState("");
	const [note, setNote] = useState("");
	const [isEditingCategory, setIsEditingCategory] = useState(false);
	const [isEditingNote, setIsEditingNote] = useState(false);

	const categories = [
		"Food",
		"Utilities",
	];

	const toggleAccount = (id) => {
		setExpandedAccount(expandedAccount === id ? null : id);
	};

	const toggleTransaction = (id) => {
		setExpandedTransaction(expandedTransaction === id ? null : id);
	};

	const handleCategoryChange = (e) => {
		setCategory(e.target.value); // Update the selected category
		console.log("Selected category:", e.target.value); // Debugging or sending to API
	};

	const handleNoteChange = (e) => {
		setNote(e.target.value); // Update the selected category
		console.log("Note:", e.target.value); // Debugging or sending to API
	};

	return (
		<div className="transaction-list__container">
			{transactions.map((account) => (
				<>
					<div key={`transaction_list-${account.id}`} className="transaction-list__transaction">
						{/* Outer Collapse: Account Summary */}
						<div
							className="transaction-list__transaction--row"
							onClick={() => toggleAccount(account.id)}
						>
							<div className="transaction-list__transaction--row-header">
								<p className="transaction-list__transaction--accountname">Argent Bank Checking (x{account.id})</p>
								<p className="transaction-list__transaction--accountbalance">{account.balance}</p>
								<p className="transaction-list__transaction--accountbalanceavailable">Available balance</p>
							</div>
							<span className="transaction-list__transaction--arrow">
								{expandedAccount === account.id ? "X" : ">"}
							</span>
						</div>
					</div>
					{expandedAccount === account.id && (
						<div key={`transaction_container-${account.id}`} className="transaction-list__transactions-container">
							<div className="transaction-list__transactions-header">
								<p className="transaction-list__header-cell">Date</p>
								<p className="transaction-list__header-cell">Description</p>
								<p className="transaction-list__header-cell">Amount</p>
								<p className="transaction-list__header-cell">Balance</p>
							</div>

							{account.details.map((transaction, index) => (
								<>
									<div
										key={ `account-${index}` }
										className="transaction-list__transaction-row"
										onClick={() => toggleTransaction(index)}
										>
										<p className="transaction-list__transaction-row-cell">{account.date}</p>
										<p className="transaction-list__transaction-row-cell">{account.description}</p>
										<p className="transaction-list__transaction-row-cell">{account.amount}</p>
										<p className="transaction-list__transaction-row-cell">
											{transaction.balance}
											<span className="transaction-list__transaction-row__arrow">
												{expandedTransaction === index ? "▲" : "▼"}
											</span>
										</p>
									</div>
									{/* Transaction Details */}
									{expandedTransaction === index && (
										<div key={`transaction_details-${index}`} className="transaction-list__transaction-details">
											<p>Transaction Type: {transaction.type}</p>
											<p>
												Category&nbsp;
												{isEditingCategory ? (
													<select
														value={transaction.category}
														onChange={(e) => handleCategoryChange(e)}
														onBlur={() => setIsEditingCategory(false)} // Hide dropdown on blur
													>
														<option value="" disabled>
															Select a category
														</option>
														{categories.map((cat, index) => (
															<option key={index} value={cat}>
																{cat}
															</option>
														))}
													</select>
												) : (
													<>
														<span style= {{fontWeight: "bold"}}>{transaction.category || "No category selected"}</span>
														<span
															className="transaction-list__icon"
															onClick={() => setIsEditingCategory(true)}
														>✏️
														</span>
													</>
												)}
											</p>
											<p>
												Note&nbsp;
												{isEditingNote ? (
													<input
														type="text"
														value={note}
														onChange={(e) => handleNoteChange(e)}
														onBlur={() => setIsEditingNote(false)} // Hide dropdown on blur
													/>
												) : (
													<>
														<span style= {{fontWeight: "bold"}}>{transaction.note}</span>
														<span
															className="transaction-list__icon"
															onClick={() => setIsEditingNote(true)}
														>✏️</span>
													</>
												)}
											</p>
										</div>
									)}
								</>
							))}
						</div>
					)}
				</>
			))}
		</div>
	);
};

export default TransactionList;