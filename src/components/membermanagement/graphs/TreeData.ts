
import { v4 as uuidv4 } from "uuid";

export class TreeNode {
  node_id: string;
  id: number;
  name: string;
  profile_picture: string;
  children: TreeNode[];
  collapsed: boolean;
  _children: TreeNode[];

  constructor(id: number, name: string, profile_picture: string) {
    this.node_id = uuidv4();
    this.id = id;
    this.name = name;
    this.profile_picture = profile_picture;
    this.children = [];
    this.collapsed = false;
    this._children = [];
  }
}

export class TreeData {
  root: TreeNode;

  constructor(treeNode: TreeNode) {
    this.root = treeNode;
  }
  addPerson(person: TreeNode, id: number) {
    this.addPersonRecursive(this.root, person, id);
  }

  removePerson(id: number) {
    this.removePersonRecursive(this.root, id);
  }

  private addPersonRecursive(node: TreeNode, person: TreeNode, id: number) {
    if (node.id === id) {
      if (!node.children) {
        node.children = [];
      }
      node.children.push(person);
      return;
    }
    for (const child of node.children) {
      this.addPersonRecursive(child, person, id);
    }
  }

  private removePersonRecursive(node: TreeNode, id: number) {
    if (node.children) {
      node.children = node.children.filter((child) => child.id !== id);
      for (const child of node.children) {
        this.removePersonRecursive(child, id);
      }
    }
  }
}
