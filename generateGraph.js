const fs = require('fs');
const graphviz = require('graphviz');
const path = require('path');

function generateGraphFromJson(jsonPath) {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    const g = graphviz.digraph("DependencyGraph");

    // Map each node to a label for Graphviz
    const nodes = data.nodes;
    Object.keys(nodes).forEach(id => {
        const node = nodes[id];
        g.addNode(node.id.toString(), { label: path.basename(node.name) });
    });

    // Add edges based on dependencies
    Object.keys(nodes).forEach(id => {
        const node = nodes[id];
        node.dependencies.forEach(depId => {
            g.addEdge(node.id.toString(), depId.toString());
        });
    });

    // Generate the output as a PNG image
    const outputPath = path.join(path.dirname(jsonPath), 'dependencyGraph.png');
    g.output("png", outputPath, (err, stdout, stderr) => {
        if (err) {
            console.error("Error generating graph:", err);
        } else {
            console.log(`Graph generated at ${outputPath}`);
        }
    });
}

// Path to your JSON file
const jsonPath = path.resolve(process.argv[2] || './dependencyGraph.json');
generateGraphFromJson(jsonPath);
