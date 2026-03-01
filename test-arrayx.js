import assert from 'node:assert';
import '../../etc/arrayx.mjs';

// randomSelect
const testArrayx1 = async () => {
  console.log('##### Arrayx test: randomSelect select one');
  {
    let arr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ];
    let sel = arr.randomSelect(1);

    assert.equal(sel.length, 1);
    assert.ok(arr.includes(sel[0]));
  }

  console.log('##### Arrayx test: randomSelect select multi');
  {
    let arr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ];
    let sel = arr.randomSelect(3);
    let check = [];

    assert.equal(sel.length, 3);
    for (let e of sel) {
      assert.ok(arr.includes(e));
      assert.ok(!check.includes(e));
      check.push(e);
    }
  }

  console.log('##### Arrayx test: randomSelect empty array');
  {
    let arr = [];
    let sel = arr.randomSelect(3);

    assert.equal(sel.length, 0);
  }

  console.log('##### Arrayx test: randomSelect n > array length');
  {
    let arr = [ 1, 2, 3 ];
    let sel = arr.randomSelect(4);

    assert.equal(sel.length, 3);
    assert.deepEqual(sel, arr);
  }

  console.log('##### Arrayx test: randomSelect n = 0');
  {
    let arr = [ 1, 2, 3 ];
    let sel = arr.randomSelect(0);

    assert.equal(sel.length, 0);
  }

  console.log('##### Arrayx test: randomSelect custom selector');
  {
    let arr = [ 'a', 'b', 'c' ];

    for (let i = 0; i < 100; i++) {
      let sel = arr.randomSelect(1, len => len - 2); // always 1
      assert.equal(sel.length, 1);
      assert.equal(sel[0], 'b'); // arr[1]
    }
  }

  console.log('##### Arrayx test: randomSelect error');
  {
    let arr = [ 1, 2, 3 ];

    assert.throws(() => { arr.randomSelect('XXX'); }, /TypeError/);
    assert.throws(() => { arr.randomSelect(-1); }, /RangeError/);
    assert.throws(() => { arr.randomSelect(2, 'AAA'); }, /TypeError/);
  }
};

// shuffle
const testArrayx2 = async () => {
  console.log('##### Arrayx test: shuffle');
  {
    let arr = [ 'a', 'b', 'c', 'd', 'e' ];
    let s = arr.shuffle();

    assert.equal(s.length, arr.length);
    for (let e of arr)
      assert.ok(s.includes(e));
  }

  console.log('##### Arrayx test: shuffle empty array');
  {
    let arr = [];
    let s = arr.shuffle();

    assert.equal(s.length, 0);
  }
};

// seqInt
const testArrayx3 = async () => {
  console.log('##### Arrayx test: seqInt start < end');
  {
    let arr1 = Array.seqInt(0, 2);
    let arr2 = Array.seqInt(3, 5);
    let arr3 = Array.seqInt(-2, 0);
    let arr4 = Array.seqInt(-1, 1);

    assert.deepEqual(arr1, [0, 1, 2]);
    assert.deepEqual(arr2, [3, 4, 5]);
    assert.deepEqual(arr3, [-2, -1, 0]);
    assert.deepEqual(arr4, [-1, 0, 1]);
  }

  console.log('##### Arrayx test: seqInt start == end');
  {
    let arr1 = Array.seqInt(0, 0);
    let arr2 = Array.seqInt(-1, -1);
    let arr3 = Array.seqInt(1, 1);

    assert.deepEqual(arr1, [0]);
    assert.deepEqual(arr2, [-1]);
    assert.deepEqual(arr3, [1]);
  }

  console.log('##### Arrayx test: seqInt start > end');
  {
    let arr1 = Array.seqInt(0, -1);
    let arr2 = Array.seqInt(1, 0);
    let arr3 = Array.seqInt(-1, -2);

    assert.deepEqual(arr1, []);
    assert.deepEqual(arr2, []);
    assert.deepEqual(arr3, []);
  }

  console.log('##### Arrayx test: seqInt error');
  {
    assert.throws(() => { Array.seqInt('XXX'); }, /TypeError/);
    assert.throws(() => { Array.seqInt(1, 'XXX'); }, /TypeError/);
  }
};

// fillRandomInt
const testArrayx4 = async () => {
  console.log('##### Arrayx test: fillRandomInt 0 ... 5');
  {
    let arr = Array.fillRandomInt(10, 0, 5);

    assert.equal(arr.length, 10);
    for (let e of arr)
      assert.ok(e >= 0 && e < 5);
  }

  console.log('##### Arrayx test: fillRandomInt -5 ... 0');
  {
    let arr = Array.fillRandomInt(10, -5, 0);

    assert.equal(arr.length, 10);
    for (let e of arr)
      assert.ok(e >= -5 && e < 0);
  }

  console.log('##### Arrayx test: fillRandomInt -5 ... 5');
  {
    let arr = Array.fillRandomInt(10, -5, 5);

    assert.equal(arr.length, 10);
    for (let e of arr)
      assert.ok(e >= -5 && e < 5);
  }
};

// fillUniqRandomInt
const testArrayx5 = async () => {
  console.log('##### Arrayx test: fillUniqRandomInt 0 ... 5 (length:1)');
  {
    let arr = Array.fillUniqRandomInt(1, 0, 5);

    assert.equal(arr.length, 1);
    assert.ok(arr[0] >= 0 && arr[0] < 5);
  }

  console.log('##### Arrayx test: fillUniqRandomInt 0 ... 5');
  {
    let arr = Array.fillUniqRandomInt(5, 0, 5);
    let check = [];

    assert.equal(arr.length, 5);
    for (let e of arr) {
      assert.ok(e >= 0 && e < 5);
      assert.equal(check.indexOf(e), -1);
      check.push(e);
    }
  }

  console.log('##### Arrayx test: fillUniqRandomInt 0 ... 5 (length:10)');
  {
    let arr = Array.fillUniqRandomInt(10, 0, 5);
    let check = [];

    assert.equal(arr.length, 5);
    for (let e of arr) {
      assert.ok(e >= 0 && e < 5);
      assert.equal(check.indexOf(e), -1);
      check.push(e);
    }
  }

  console.log('##### Arrayx test: fillUniqRandomInt -5 ... 0');
  {
    let arr = Array.fillUniqRandomInt(5, -5, 0);
    let check = [];

    assert.equal(arr.length, 5);
    for (let e of arr) {
      assert.ok(e >= -5 && e < 0);
      assert.equal(check.indexOf(e), -1);
      check.push(e);
    }
  }

  console.log('##### Arrayx test: fillUniqRandomInt -5 ... 5');
  {
    let arr = Array.fillUniqRandomInt(5, -5, 5);
    let check = [];

    assert.equal(arr.length, 5);
    for (let e of arr) {
      assert.ok(e >= -5 && e < 5);
      assert.equal(check.indexOf(e), -1);
      check.push(e);
    }
  }
};

// reshape
const testArrayx6 = async () => {
  let arr = [
     1,  2,  3,  4,  5,  6,  7,  8,  9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24
  ];

  console.log('##### Arrayx test: reshape 24');
  {
    assert.deepEqual(arr.reshape(), [
       1,  2,  3,  4,  5,  6,  7,  8,  9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24
    ]);
    assert.deepEqual(arr.reshape(24), [
       1,  2,  3,  4,  5,  6,  7,  8,  9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24
    ]);
  }

  console.log('##### Arrayx test: reshape 1x24');
  {
    assert.deepEqual(arr.reshape(1, 24), [
      [
         1,  2,  3,  4,  5,  6,  7,  8,  9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24
      ]
    ]);
  }

  console.log('##### Arrayx test: reshape 24x1');
  {
    assert.deepEqual(arr.reshape(24, 1), [
      [ 1], [ 2], [ 3], [ 4], [ 5], [ 6], [ 7], [ 8], [ 9], [10],
      [11], [12], [13], [14], [15], [16], [17], [18], [19], [20],
      [21], [22], [23], [24]
    ]);
  }

  console.log('##### Arrayx test: reshape 3x8');
  {
    assert.deepEqual(arr.reshape(3, 8), [
      [ 1,  2,  3,  4,  5,  6,  7,  8],
      [ 9, 10, 11, 12, 13, 14, 15, 16],
      [17, 18, 19, 20, 21, 22, 23, 24]
    ]);
  }

  console.log('##### Arrayx test: reshape 3x4x2');
  {
    assert.deepEqual(arr.reshape(3, 4, 2), [
      [[ 1,  2], [ 3,  4], [ 5,  6], [ 7,  8]],
      [[ 9, 10], [11, 12], [13, 14], [15, 16]],
      [[17, 18], [19, 20], [21, 22], [23, 24]]
    ]);
  }

  console.log('##### Arrayx test: reshape 2x2x2x3');
  {
    assert.deepEqual(arr.reshape(2, 2, 2, 3), [
      [
        [[ 1,  2,  3], [ 4,  5,  6]],
        [[ 7,  8,  9], [10, 11, 12]]
      ], [
        [[13, 14, 15], [16, 17, 18]],
        [[19, 20, 21], [22, 23, 24]]
      ]
    ]);
  }

  console.log('##### Arrayx test: reshape error');
  {
    assert.throws(() => { arr.reshape(3, 'XXX'); }, /TypeError/);
    assert.throws(() => { arr.reshape(0); }, /RangeError/);
    assert.throws(() => { arr.reshape(3, 3); }, /RangeError/);
  }
};

// idxOf
const testArrayx7 = async () => {
  let arr1 = [ 'a', 'b', 'c' ];
  let arr2 = [ {id: 1, name: 'one'}, { id: 2, name: 'two' }, {id: 3, name: 'three'}];

  console.log('##### Arrayx test: idxOf simple array');
  {
    let idx = arr1.idxOf(e => e === 'c');
    assert.equal(idx, 2);
  }

  console.log('##### Arrayx test: idxOf complex array');
  {
    let idx = arr2.idxOf(e => e.name === 'two');
    assert.equal(idx, 1);
  }

  console.log('##### Arrayx test: idxOf not exists');
  {
    let idx = arr2.idxOf(e => e.name === 'four');
    assert.equal(idx, -1);
  }
};

// cycle
const testArrayx8 = async () => {
  console.log('##### Arrayx test: cycle to right');
  {
    let arr = [1, 2, 3, 4, 5];
    assert.deepEqual(arr.cycle(0), [1, 2, 3, 4, 5]);
    assert.deepEqual(arr.cycle(1), [5, 1, 2, 3, 4]);
    assert.deepEqual(arr.cycle(2), [3, 4, 5, 1, 2]);
    assert.deepEqual(arr.cycle(5), [3, 4, 5, 1, 2]);
    assert.deepEqual(arr.cycle(6), [2, 3, 4, 5, 1]);
  }

  console.log('##### Arrayx test: cycle to left');
  {
    let arr = [1, 2, 3, 4, 5];
    assert.deepEqual(arr.cycle(-0), [1, 2, 3, 4, 5]);
    assert.deepEqual(arr.cycle(-1), [2, 3, 4, 5, 1]);
    assert.deepEqual(arr.cycle(-2), [4, 5, 1, 2, 3]);
    assert.deepEqual(arr.cycle(-5), [4, 5, 1, 2, 3]);
    assert.deepEqual(arr.cycle(-6), [5, 1, 2, 3, 4]);
  }
};

(async () => {
  await testArrayx1();
  await testArrayx2();
  await testArrayx3();
  await testArrayx4();
  await testArrayx5();
  await testArrayx6();
  await testArrayx7();
  await testArrayx8();

  console.log('All tests have been passed');
})();