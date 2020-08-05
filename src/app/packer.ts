export interface Item {
  w: number;
  h: number;
  name?: string;
  fit?: { x: number; y: number };
  rotate?: boolean;
}

interface Partitionable {
  x: number;
  y: number;
  w: number;
  h: number;
  name?: string;
  used: boolean;
  rotate: boolean;
  down?: Partitionable;
  right?: Partitionable;
}

export default class Packer {
  root: Partitionable;

  constructor(width: number, height: number) {
    this.root = {
      x: 0,
      y: 0,
      w: width,
      h: height,
      used: false,
      name: '',
      rotate: false,
    };
  }

  fit(blocks: Item[], reset?: boolean) {
    let node = null;
    if (reset) {
      this.root.used = false;
    }
    for (const block of blocks) {
      node = this.findNode(this.root, block);

      if (node) {
        block.fit = this.splitNode(node, block);
      }
    }
  }

  findNode(root: Partitionable, block: Item) {
    if (!root) {
      console.log('root is not defined!!!');
    }

    if (root.used) {
      return (
        this.findNode(root.right, block) || this.findNode(root.down, block)
      );
    } else if (block.w <= root.w && block.h <= root.h) {
      return root;
    } else if (block.h <= root.w && block.w <= root.h) {
      let temp = block.w;
      block.w = block.h;
      block.h = temp;
      block.rotate = !block.rotate;
      return root;
    } else return null;
  }

  splitNode(node: Partitionable, block: Item) {
    node.used = true;
    node.down = {
      x: node.x,
      y: node.y + block.h,
      w: node.w,
      h: node.h - block.h,
      used: false,
      rotate: node.rotate,
    };
    node.right = {
      x: node.x + block.w,
      y: node.y,
      w: node.w - block.w,
      h: block.h,
      used: false,
      rotate: node.rotate,
    };
    return node;
  }
}
