const fs = require('fs');
const path = require('path');

const importRegex = /import\s+.*?\s+from\s+['"](.*?)['"];?/g;
let idCounter = 1;
const nodeToIdMap = {};
const nodeToLevelMap = {};
const nodes = {};

/**
 * Recursively scans directory for JavaScript/TypeScript files and directories.
 */
function getFilesAndDirs(dir, level = 0, parent = null) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach(entry => {
        // Skip the node_modules directory
        if (entry.name === 'node_modules') return;

        const fullPath = path.join(dir, entry.name);
        const relativePath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');

        if (!nodeToIdMap[relativePath]) {
            nodeToIdMap[relativePath] = idCounter++;
            nodeToLevelMap[nodeToIdMap[relativePath]] = level;
        }

        if (entry.isDirectory()) {
            getFilesAndDirs(fullPath, level + 1, relativePath);
        } else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) {
            nodes[nodeToIdMap[relativePath]] = {
                id: nodeToIdMap[relativePath],
                isFile: true,
                name: relativePath,
                dependencies: [],
                levelWiseParents: parent ? [nodeToIdMap[parent]] : [],
                children: [],
                level,
                nearestRootModule: getRootModule(relativePath),
                allDependencies: []
            };
        }
    });
}

/**
 * Resolves import paths to actual files in the filesystem.
 */
function resolveImportPath(importPath, fileDir) {
    const extensions = ['.js', '.jsx', '.ts', '.tsx'];
    const fullPath = path.resolve(fileDir, importPath);

    // Check if the path exists directly
    if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isFile()) {
        return fullPath;
    }

    // Check with each possible extension
    for (const ext of extensions) {
        if (fs.existsSync(fullPath + ext)) {
            return fullPath + ext;
        }
    }

    // Check if it’s a directory with an index file
    if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()) {
        for (const ext of extensions) {
            const indexPath = path.join(fullPath, 'index' + ext);
            if (fs.existsSync(indexPath)) {
                return indexPath;
            }
        }
    }

    // Return null if no valid file is found
    return null;
}

/**
 * Finds all import statements within a file.
 */
function findImports(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const imports = [];
    let match;

    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        if (importPath.startsWith('.')) {
            const resolvedPath = resolveImportPath(importPath, path.dirname(filePath));
            if (resolvedPath) {
                const relativeResolvedPath = path.relative(process.cwd(), resolvedPath).replace(/\\/g, '/');
                if (nodeToIdMap[relativeResolvedPath]) {
                    imports.push(nodeToIdMap[relativeResolvedPath]);
                }
            }
        }
    }
    return imports;
}

/**
 * Builds dependencies and assigns properties to nodes.
 */
function buildDependencies(srcDir) {
    Object.keys(nodes).forEach(id => {
        const filePath = path.join(srcDir, nodes[id].name);
        nodes[id].dependencies = findImports(filePath);
        nodes[id].allDependencies = Array.from(new Set(nodes[id].dependencies.flatMap(dep => nodes[dep]?.dependencies || [])));
    });
}

/**
 * Finds the nearest root module for a given file path.
 */
function getRootModule(filePath) {
    const parts = filePath.split('/');
    return parts.slice(0, parts.indexOf('modules') + 2).join('/');
}

/**
 * Main function to generate the JSON structure in the required format.
 */
function generateDependencyGraph(projectPath) {
    const srcDir = path.join(projectPath, '');
    if (!fs.existsSync(srcDir)) {
        console.error(`No src directory found at ${srcDir}. Aborting.`);
        return;
    }

    getFilesAndDirs(srcDir);
    buildDependencies(srcDir);

    const result = {
        nodeToIdMap,
        nodeToLevelMap,
        nodes
    };

    fs.writeFileSync(path.join(srcDir, 'dependencyGraph.json'), JSON.stringify(result, null, 2), 'utf-8');
    console.log(`Dependency graph generated at ${path.join(srcDir, 'dependencyGraph.json')}`);
}

// Run with specified project path or default to current directory
const projectPath = process.argv[2] || process.cwd();
generateDependencyGraph(projectPath);
