exports.totalReturnOfExpense = (idOfHistory, array = []) => {
    // Filter the array based on the given idOfHistory
    const filteredArray = array.filter(item => item.idOfHistory === idOfHistory);

    // Calculate the total return amount
    const totalReturnAmount = filteredArray.reduce((total, item) => total + item.returnAmount, 0);

    return totalReturnAmount;
}
