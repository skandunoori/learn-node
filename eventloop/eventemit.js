const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
  constructor() {
    super();
    this.emit('event')
  }
  
}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event')
