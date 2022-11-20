class LinkedListNode {
  public key: number;
  public val: number;
  public prev: LinkedListNode | null;
  public next: LinkedListNode | null;

  constructor(key: number, val: number) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class LRU {
  private capacity: number;
  private map: Map<number, LinkedListNode>;
  private head: LinkedListNode;
  private tail: LinkedListNode;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new Map<number, LinkedListNode>();
    this.head = new LinkedListNode(-1, -1);
    this.tail = new LinkedListNode(-1, -1);
    this.head.next = this.tail;
    this.head.prev = null;
    this.tail.prev = this.head;
    this.tail.next = null;
  }

  put(key: number, val: number) {
    if (this.map.has(key)) {
      const node = this.map.get(key) as LinkedListNode;;
      node!!.val = val;
      node!!.prev!!.next = node!!.next;
      node!!.next!!.prev = node!!.prev;
      this.moveToHead(node);
      return;
    }

    if (this.map.size === this.capacity) {
      this.map.delete(this.tail!!.prev!!.key);
      this.tail.prev = this.tail!!.prev!!.prev;
      this.tail.prev!!.next = this.tail;
    }

    const node = new LinkedListNode(key, val);
    this.map.set(key, node);

    this.moveToHead(node);
  }

  get(key: number): number {
    if (!this.map.has(key)) return -1;

    const node = this.map.get(key) as LinkedListNode;
    node!!.prev!!.next = node!!.next;
    node!!.next!!.prev = node!!.prev;

    this.moveToHead(node);

    return node!!.val;
  }

  prettyPrint() {
    console.log("Current LRU: ");

    let current = this.head;

    while(current !== null) {
      if (current.prev === null || current.next === null) {
        current = current.next as LinkedListNode;
        continue;
      }

      if (current.next !== this.tail) {
        process.stdout.write(`${current.val} → `);
      } else {
        console.log(`${current.val}\n`);
      }

      current = current.next as LinkedListNode;;
    }
  }

  private moveToHead(node: LinkedListNode) {
    node.prev = this.head;
    node.next = this.head.next;
    node.next!!.prev = node;
    this.head.next = node;
  }
}

const lru = new LRU(5);
lru.put(1,1); // values = [1]
const test = lru.get(1);
lru.prettyPrint();
lru.put(2,2); // values = [2,1]
lru.prettyPrint();
lru.put(3,3); // values = [3,2,1]
lru.prettyPrint();
lru.get(1);   // values = [1,3,2], return 1
lru.prettyPrint();
lru.get(3);   // values = [3,1,2], return 3
lru.prettyPrint();
lru.get(3);   // values = [3,1,2], return 3
lru.prettyPrint();
lru.put(4,4); // values = [4,3,1,2]
lru.prettyPrint();
lru.put(5,5); // values = [5,4,3,1,2], cache is full
lru.prettyPrint();
lru.put(6,6); // values = [6,5,4,3,1], remove least recently visited element, 2
lru.prettyPrint();
lru.get(4);   // values = [4,6,5,3,1], return 4
lru.prettyPrint();
lru.put(7,7); // values = [7,4,6,5,3], remove 1
lru.prettyPrint();
lru.put(7,2); // values = [2,4,6,5,3], element with key=7 is updated
lru.prettyPrint();
lru.get(7);   // keys = [7,4,6,5,3], values = [2,4,6,5,3], return 2
lru.prettyPrint();
lru.put(3,9); // keys = [3,7,4,6,5], values = [9,2,4,6,5], move key=3 to head
lru.prettyPrint();
lru.get(3);   // keys = [3,7,4,6,5], values = [9,2,4,6,5], return 9
lru.prettyPrint();
