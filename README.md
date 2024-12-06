# Backend - File Dependency Graph (FDG)

This project is a Node.js application for generating a FDG of JavaScript/TypeScript files in a project. The graph visualizes dependencies between files, and it outputs the graph in both JSON and PNG formats.

## Features

- **Dependency Graph Generation:** Scans a project’s directory structure and generates a JSON file representing the dependencies.
- **Graph Visualization:** Converts the JSON dependency graph into a PNG image using Graphviz.
- **Dynamic Imports Handling:** Resolves file imports and dependencies dynamically, including relative and module-based imports.

## Prerequisites

1. Node.js (v12 or higher)
2. npm (Node Package Manager)
3. Graphviz installed on your system 

## Installation

1. Clone the repository:
```sh
git clone https://github.com/DixitLukhi/backend-fdg.git
```
2. Navigate to the project directory:
```sh
cd backed-fdg
```
3. Install dependencies:
```sh
npm install
```

## Project Structure
- **generateDependencyGraph.js:** Scans the directory structure, analyzes dependencies, and generates the JSON graph.

- **generateGraph.js:** Converts the JSON graph into a PNG using Graphviz.

- **package.json:** Contains project metadata and dependencies.

## Usage
- **Generating the FDG (JSON)**
1. Run the script with the target project path:
```sh
node generateDependencyGraph.js
```
2. The JSON output will be saved as dependencyGraph.json in the target project’s directory.

- **Visualizing the Dependency Graph (PNG)**
1. Run the Graphviz script :
```sh
node generateGraph.js
```

2. The PNG output will be saved in the same directory as the JSON file with the name dependencyGraph.png.