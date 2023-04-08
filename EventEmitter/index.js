const fs = require('fs');
const EventEmitter = require('events');

// class WithTime extends EventEmitter {
//   execute(asyncFunc, ...args) {
//     this.emit('begin');
//     console.time('execute');
//     asyncFunc(...args, (err, data) => {
//       if (err) {
//         return this.emit('error', err);
//       }

//       this.emit('data', data);
//       console.timeEnd('execute');
//       this.emit('end');
//     });
//   }
// }

// const withTime = new WithTime();

// withTime.on('begin', () => console.log('About to execute'));
// withTime.on('end', () => console.log('Done with execute'));

// withTime.execute(fs.readFile, __filename);

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    console.time('execute');
    asyncFunc(...args, (err, data) => {
      if (err) {
        return this.emit('error', err); // Not Handled
      }

      this.emit('data', data);
      console.timeEnd('execute');
    });
  }
}

const withTime = new WithTime();
withTime.on('error', (err) => {
  // do something with err, for example log it somewhere
  console.log(err)
});

withTime.on('data', (data) => {
  console.log(`Length: ${data.length}`);
});

withTime.prependListener('data', (data) => {
  console.log(`Characters: ${data.toString().length}`);
});

// withTime.execute(fs.readFile, ''); // BAD CALL
withTime.execute(fs.readFile, __filename);
