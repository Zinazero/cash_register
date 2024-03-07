function checkCashRegister(price, cash, cid) {
    let obj = {
      status: "",
      change: []
    };
  
    const denominations = [
      ["PENNY", 1],
      ["NICKEL", 5],
      ["DIME", 10],
      ["QUARTER", 25],
      ["ONE", 100],
      ["FIVE", 500],
      ["TEN", 1000],
      ["TWENTY", 2000],
      ["ONE HUNDRED", 10000]
    ];
  
    let changeOwed = (cash - price) * 100; // Convert change owed to cents for accurate calculations
    let cashInDrawer = cid.reduce(function(a, b) { return a + b[1]; }, 0) * 100; // Calculate total cash in the drawer in cents
  
    if (changeOwed > cashInDrawer) { // If change owed is more than the cash in the drawer
      obj.status = "INSUFFICIENT_FUNDS";
    } else if (changeOwed === cashInDrawer) { // If change owed is exactly equal to the cash in the drawer
      obj.status = "CLOSED";
      obj.change = cid; // Return the entire cash in drawer as change
    } else { // If change owed can be given from the cash in the drawer
      for (let i = denominations.length - 1; i >= 0; i--) { // Iterate through denominations starting from the highest
        let count = 0;
        while (changeOwed >= denominations[i][1] && cid[i][1] > 0) { // While the change owed is greater than the current denomination and there is still cash of that denomination in the drawer
          changeOwed -= denominations[i][1]; // Reduce the change owed by the current denomination
          cid[i][1] -= denominations[i][1] / 100; // Deduct the amount given from the cash in the drawer
          count++; // Increment the count of denominations given
        }
        if (count > 0) { // If any cash was given from the current denomination
          obj.change.push([denominations[i][0], count * denominations[i][1] / 100]); // Add the denomination and the amount given to the change array
        }
      }
      if (changeOwed > 0) { // If there is still change owed after giving all possible cash from the drawer
        obj.status = "INSUFFICIENT_FUNDS";
        obj.change = []; // Clear the change array
      } else { // If all change is given successfully
        obj.status = "OPEN";
      }
    }
  
    if (obj.status === "INSUFFICIENT_FUNDS") { // If there is insufficient funds
      obj.change = []; // Clear the change array
    }
  
    return obj; // Return the result object
  }
  
  console.log(
    checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
  );