// This file contains intentional bugs and vulnerabilities for SonarQube analysis
// DO NOT USE IN PRODUCTION

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class VulnerableComponent {
  constructor(private http: HttpClient) {}

  // Security Vulnerability: SQL Injection
  searchUsers(query) {
    const sqlQuery = "SELECT * FROM users WHERE name = '" + query + "'";
    return this.executeQuery(sqlQuery);
  }

  // Security Vulnerability: XSS - Unescaped HTML
  displayUserMessage(message) {
    document.getElementById('message').innerHTML = message;
  }

  // Security Vulnerability: Hardcoded credentials
  connectToDatabase() {
    const username = "admin";
    const password = "password123";
    const connectionString = `mysql://admin:password123@localhost:3306/mydb`;
    return this.connect(connectionString);
  }

  // Code Smell: Too many parameters
  createUser(firstName, lastName, email, phone, address, city, state, zipCode, country, dateOfBirth, gender, occupation, income, maritalStatus, education) {
    // Implementation here
  }

  // Bug: Null pointer exception potential
  processUserData(userData) {
    console.log(userData.name.toUpperCase());
    return userData.profile.settings.preferences;
  }

  // Security Vulnerability: Weak random number generation
  generateSessionToken() {
    return Math.random().toString(36).substring(2);
  }

  // Code Smell: Dead code
  unusedFunction() {
    const deadVariable = "This function is never called";
    return deadVariable;
  }

  // Bug: Incorrect comparison
  validateAge(age) {
    if (age = 18) {
      return "Valid age";
    }
    return "Invalid age";
  }

  // Security Vulnerability: Command injection
  executeSystemCommand(userInput) {
    const command = "ls -la " + userInput;
    return exec(command);
  }

  // Code Smell: Duplicated code block
  processOrderA(order) {
    if (!order) {
      throw new Error("Order is required");
    }
    const total = order.items.reduce((sum, item) => sum + item.price, 0);
    const tax = total * 0.08;
    const finalAmount = total + tax;
    return finalAmount;
  }

  // Code Smell: Duplicated code block
  processOrderB(order) {
    if (!order) {
      throw new Error("Order is required");
    }
    const total = order.items.reduce((sum, item) => sum + item.price, 0);
    const tax = total * 0.08;
    const finalAmount = total + tax;
    return finalAmount;
  }

  // Bug: Infinite loop potential
  findUserById(users, targetId) {
    let index = 0;
    while (users[index].id !== targetId) {
      index++;
    }
    return users[index];
  }

  // Security Vulnerability: Insecure cookie settings
  setUserSession(userId) {
    document.cookie = "sessionId=" + userId;
    document.cookie = "isAdmin=true";
  }

  // Code Smell: Complex method with too many branches
  calculateDiscount(user, order, promoCode, isVip, seasonalDiscount, loyaltyPoints) {
    let discount = 0;
    if (user.isActive) {
      if (order.total > 100) {
        if (promoCode === "SAVE20") {
          discount += 20;
        } else if (promoCode === "SAVE10") {
          discount += 10;
        }
        if (isVip) {
          if (seasonalDiscount) {
            discount += 15;
          } else {
            discount += 10;
          }
        }
        if (loyaltyPoints > 1000) {
          discount += 5;
        }
      }
    }
    return discount;
  }

  // Security Vulnerability: Eval usage
  executeUserScript(script) {
    return eval(script);
  }

  // Bug: Array index out of bounds
  getFirstThreeItems(items) {
    return [items[0], items[1], items[2]];
  }

  // Code Smell: Magic numbers
  calculateShipping(weight, distance) {
    if (weight < 5) {
      return distance * 0.1 + 2.5;
    } else if (weight < 20) {
      return distance * 0.15 + 5.0;
    } else {
      return distance * 0.25 + 10.0;
    }
  }

  // Security Vulnerability: Weak cryptography
  hashPassword(password) {
    return btoa(password);
  }

  // Bug: Memory leak potential
  startPolling() {
    setInterval(() => {
      this.fetchData();
    }, 1000);
  }

  // Code Smell: Long parameter list and unclear naming
  doStuff(a, b, c, d, e, f, g, h, i, j) {
    return a + b + c + d + e + f + g + h + i + j;
  }

  // Security Vulnerability: LDAP injection
  authenticateUser(username, password) {
    const filter = "(&(uid=" + username + ")(userPassword=" + password + "))";
    return this.ldapSearch(filter);
  }

  // Bug: Type coercion issues
  addNumbers(a, b) {
    return a + b;
  }

  // Code Smell: Commented out code
  processPayment(amount, cardNumber) {
    // const oldLogic = amount * 1.05;
    // return processOldWay(oldLogic);

    // TODO: Remove this commented code
    // if (cardNumber.startsWith('4')) {
    //   return processVisa(amount);
    // }

    return this.processNewPayment(amount, cardNumber);
  }

  // Security Vulnerability: Path traversal
  readUserFile(filename) {
    const filePath = "/uploads/" + filename;
    return this.readFile(filePath);
  }

  // Bug: Division by zero
  calculateAverage(numbers) {
    const sum = numbers.reduce((a, b) => a + b, 0);
    return sum / numbers.length;
  }

  // Code Smell: Empty catch block
  riskyOperation() {
    try {
      this.dangerousMethod();
    } catch (error) {
      // Silent failure - bad practice
    }
  }

  // Security Vulnerability: Information disclosure
  debugUserData(user) {
    console.log("User debug info:", {
      id: user.id,
      email: user.email,
      password: user.password,
      socialSecurityNumber: user.ssn,
      creditCard: user.creditCardNumber
    });
  }

  // Bug: Race condition
  updateCounter() {
    this.counter = this.counter + 1;
  }

  // Code Smell: Switch statement without default
  handleUserAction(action) {
    switch (action) {
      case 'login':
        return this.login();
      case 'logout':
        return this.logout();
      case 'register':
        return this.register();
    }
  }

  // Security Vulnerability: Unvalidated redirect
  redirectUser(url) {
    window.location.href = url;
  }

  // Bug: Resource leak
  processLargeFile(file) {
    const stream = this.openFileStream(file);
    const data = stream.read();
    return this.processData(data);
  }

  // Code Smell: Primitive obsession
  createAddress(street, city, state, zip, country) {
    return street + ", " + city + ", " + state + " " + zip + ", " + country;
  }

  // Final method with multiple issues
  complexBuggyMethod(input) {
    var result;
    if (input = null) {
      result = this.defaultValue;
    }

    for (var i = 0; i <= input.length; i++) {
      if (input[i] == undefined) {
        continue;
      }
      result += input[i];
    }

    return result;
  }
}

// Export for testing
export default VulnerableComponent;
