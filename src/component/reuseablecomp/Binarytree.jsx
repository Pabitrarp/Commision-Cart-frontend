import React, { useEffect, useMemo, useState } from "react";
import ReactFlow, { Controls, Background, useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";

// Utility function to convert binary tree into nodes and edges
const transformBinaryTree = (node, level = 1, position = 0, parent = null) => {
  const nodes = [];
  const edges = [];

  if (!node) return { nodes, edges };

  const nodeId = node._id;

  // Add current node to the nodes list
  nodes.push({
    id: nodeId,
    type: "default",
    data: {
      label: (
        <div style={{ textAlign: "center" }}>
          <strong>{node.name}</strong>
          <br />
          Referral Earn: {node.referearn}
        </div>
      ),
    },
    position: { x: position * 200, y: level * 100 }, // Position dynamically
    style: {
      border: "1px solid #ccc",
      padding: "10px",
      borderRadius: "5px",
      backgroundColor: "#f9f9f9",
    },
  });

  // Add edge to connect the parent node to the current node
  if (parent) {
    edges.push({
      id: `${parent}-${nodeId}`,
      source: parent,
      target: nodeId,
      animated: true,
      style: { stroke: "#555" },
    });
  }

  // Recursively process left and right children
  const leftResult = transformBinaryTree(node.left, level + 1, position - 1, nodeId);
  const rightResult = transformBinaryTree(node.right, level + 1, position + 1, nodeId);

  return {
    nodes: [...nodes, ...leftResult.nodes, ...rightResult.nodes],
    edges: [...edges, ...leftResult.edges, ...rightResult.edges],
  };
};

export const Binarytree = ({ node }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]); // useNodesState handles draggable positions
  const [edges, setEdges] = useEdgesState([]); // useEdgesState manages edges

  // Memoize transformed tree data to avoid unnecessary recalculations
  const transformedTree = useMemo(() => (node ? transformBinaryTree(node) : { nodes: [], edges: [] }), [node]);

  useEffect(() => {
    if (!node) {
      console.warn("node is empty");
      return;
    }
    setNodes(transformedTree.nodes);
    setEdges(transformedTree.edges);
  }, [transformedTree, setNodes, setEdges]);

  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange} // Handles position updates
        fitView
        nodesDraggable // Makes nodes draggable
        panOnDrag
        panOnScroll
        zoomOnScroll
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};
