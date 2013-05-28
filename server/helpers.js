// Generates a bold IRC string
boldString = function (str) {
	return String.fromCharCode(2) + str + String.fromCharCode(2);
}

// Check if the string contains any/all of the array elements
stringContainsArrayItem = function (str, arr) {
	for (var i = 0; i < arr.length; i++) {
		if (str.indexOf(arr[i]) !== -1) {
			// String contains an array element
			return true;
		}
	}

	// String does not contain an array element
	return false;
}