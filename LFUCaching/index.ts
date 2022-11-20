class DoubleLinkedListNode {
  public value: number;
  public count: number;
  public prev: DoubleLinkedListNode | null;
  public next: DoubleLinkedListNode | null;

  constructor(value: number, count: number) {
    this.value = value;
    this.count = count;
    this.prev = null;
    this.next = null;
  }
}

class LFU {
  private capacity: number;
  private map: Map<number, DoubleLinkedListNode>;
  private head: DoubleLinkedListNode;
  private tail: DoubleLinkedListNode;
  private MAX = Number.MAX_VALUE;
  private MIN = -Number.MIN_VALUE;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new Map<number, DoubleLinkedListNode>();
    this.head = new DoubleLinkedListNode(this.MAX, this.MAX);
    this.tail = new DoubleLinkedListNode(this.MIN, this.MIN);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  private getKeyByValue(value: number): number {
    for (let [entryKey, entryNode] of this.map.entries()) {
      if (entryNode.value === value) {
        return entryKey;
      }
    }

    return 0;
  }

  add(key: number, value: number): void {
    if (this.map.has(key)) {
      return;
    }

    if (this.map.size === this.capacity) {
      const deleteKey = this.getKeyByValue(this.tail.prev?.value as number);
      this.map.delete(deleteKey);
      this.tail.prev = this.tail.prev?.prev as DoubleLinkedListNode;
      this.tail.prev.next = this.tail;
    }

    const newNode = new DoubleLinkedListNode(value, 0);
    this.map.set(key, newNode);

    this.move(newNode);
  }

  get(key: number): number {
    if (!this.map.has(key)) {
      return this.MIN;
    }

    const current = this.map.get(key);
    if (current && current.prev && current.prev.next && current.next) {
      current.prev.next  = current?.next;
      current.next.prev = current.prev;
      current.count++;

      this.move(current);
    }

    return current?.value as number;
  }

  move(node: DoubleLinkedListNode) {
    let current: DoubleLinkedListNode = this.head;

    while (current !== null) {
      if (current.count > node.count) {
        current = current.next as DoubleLinkedListNode;
      } else {
        node.prev = current.prev;
        node.next = current;
        node.next.prev = node;
        node.prev!!.next = node;
        break;
      }
    }
  }

  prettyPrint() {
    console.log("Current LRU: ");
    let current = this.head;

    while (current !== null) {
      if (current.value === this.MAX || current.value === this.MIN) {
        current = current.next as DoubleLinkedListNode;
        continue;
      }

      if (current.next!!.value !== this.MIN) {
        process.stdout.write(`${current.value}(count: ${current.count}) → `);
      } else {
        console.log(`${current.value}(count: ${current.count})\n`);
      }

      current = current.next as DoubleLinkedListNode;
    }
  }
}

const lfu: LFU = new LFU(5);
lfu.add(1,1); // value = [1],         frequency = [0]
lfu.prettyPrint();
lfu.add(2,2); // value = [2,1],       frequency = [0,0]
lfu.prettyPrint();
lfu.add(3,3); // value = [3,2,1],     frequency = [0,0,0]
lfu.prettyPrint();
lfu.get(1);   // value = [1,3,2],     frequency = [1,0,0], return 1
lfu.prettyPrint();
lfu.get(3);   // value = [3,1,2],     frequency = [1,1,0], return 3
lfu.prettyPrint();
lfu.get(3);   // value = [3,1,2],     frequency = [2,1,0], return 3
lfu.prettyPrint();
lfu.add(4,4); // value = [3,1,4,2],   frequency = [2,1,0,0]
lfu.prettyPrint();
lfu.add(5,5); // value = [3,1,5,4,2], frequency = [2,1,0,0,0], cache is full
lfu.prettyPrint();
lfu.add(6,6); // value = [3,1,6,5,4], frequency = [2,1,0,0,0], last element 2 is removed
lfu.prettyPrint();
lfu.get(4);   // value = [3,4,1,6,5], frequency = [2,1,1,0,0], return 4
lfu.prettyPrint();
lfu.add(7,7); // value = [3,4,1,7,6], frequency = [2,1,1,0,0], last element 5 is removed
lfu.prettyPrint();
lfu.get(7);   // value = [3,7,4,1,6], frequency = [2,1,1,1,0], return 7
lfu.prettyPrint();
lfu.get(6);   // value = [3,6,7,4,1], frequency = [2,1,1,1,1], return 6
lfu.prettyPrint();
lfu.get(6);   // value = [6,3,7,4,1], frequency = [2,2,1,1,1], return 6
lfu.prettyPrint();
lfu.get(6);   // value = [6,3,7,4,1], frequency = [3,2,1,1,1], return 6
lfu.prettyPrint();
lfu.add(8,8); // value = [6,3,7,4,8], frequency = [3,2,1,1,0], last element 1 is removed
lfu.prettyPrint();
