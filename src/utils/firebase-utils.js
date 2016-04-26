import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';

const firebaseUrl = `https://magic-chen.firebaseio.com`;
console.log(`Connecting to ${firebaseUrl}`);
export const firebaseRoot = new Firebase(firebaseUrl);


