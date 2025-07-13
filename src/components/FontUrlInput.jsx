import React from "react";

export default function FontUrlInput({
	id,
	value,
	onChange,
	label,
	className,
}) {
	const handleInputChange = (e) => {
		let inputValue = e.target.value;
		// Remove leading/trailing single or double quotes
		if (inputValue.startsWith("'") && inputValue.endsWith("'")) {
			inputValue = inputValue.slice(1, -1);
		} else if (inputValue.startsWith('"') && inputValue.endsWith('"')) {
			inputValue = inputValue.slice(1, -1);
		}
		onChange(inputValue);
	};

	return (
		<div>
			<label
				htmlFor={id}
				className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
			>
				{label}
			</label>
			<div
				className={`flex items-center whitespace-nowrap p-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 ${
					className || ""
				}`}
			>
				<span className="text-gray-600 dark:text-gray-400 mr-1">
					@import url(
				</span>
				<input
					id={id}
					type="text"
					value={value}
					onChange={handleInputChange}
					className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100"
				/>
				<span className="text-gray-600 dark:text-gray-400 ml-1">)</span>
			</div>
		</div>
	);
}
