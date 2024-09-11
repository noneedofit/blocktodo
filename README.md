# blocktodo

This is a Todo List application powered by local blockchain system using Solidity. The application allows users to create, view, and manage tasks on the blockchain.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v10.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)
- [Ganache CLI](https://www.npmjs.com/package/ganache-cli)
- [Truffle](https://www.trufflesuite.com/truffle)

## Getting Started

Follow these steps to set up and run the application on your local machine.

### 1. Clone the Repository

```sh
git clone https://github.com/haries-dev/TodoList-App-Ethereum-Solidity.git
cd TodoList-App-Ethereum-Solidity
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Start Ganache CLI
Open a new terminal window and start Ganache CLI to run a local blockchain:
```sh
ganache-cli
```

### 4. Compile and Migrate Smart Contracts
In the original terminal window, compile and migrate the smart contracts to the local blockchain:
```sh
truffle compile
truffle migrate
```

### 5. Run the Application
You can use the `lite-server` to serve the application. The lite-server is already configured in the `package.json` file.

```
npm run dev
```
This will open the application in your default web browser. If it doesn't, you can manually open it by navigating to `http://localhost:3000`.

### 6. Interact with the Application
You can now interact with the Todo List application. Add tasks, mark them as completed, and see the changes reflected on the blockchain.

### Project Structure
`contracts/`: Contains the Solidity smart contracts.
`migrations/`: Contains the migration scripts.
`src/`: Contains the frontend application files (HTML, CSS, JavaScript).
`test/`: Contains the test scripts for the smart contracts.
`truffle-config.js`: Truffle configuration file.



