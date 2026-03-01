/*!
 * arrayx.mjs
 *
 * Copyright (c) 2015,2020 Chez Naijamn
 * Released under the MIT license
 */

Array.prototype.randomSelect = function(n, selector) {
  if (!Number.isInteger(n))
    throw new TypeError('n must be integer greater than or equal to zero');
  if (n < 0)
    throw new RangeError('n must be integer greater than or equal to zero');
  if (selector && typeof selector !== 'function')
    throw new TypeError('selector must be function');

  if (this.length <= n) {
    return [].concat(this);
  } else {
    let arr = [];
    let indices = new Array(n);
    let i = 0;
    selector = selector || (len => Math.floor(Math.random() * len));
    while (i < n) {
      let idx = selector.call(null, this.length);
      if (!indices.includes(idx)) {
        indices[i++] = idx;
        arr.push(this[idx]);
      }
    }
    return arr;
  }
};

// Fisher-Yates Algorithm
Array.prototype.shuffle = function() {
  let arr = this.concat();
  let len = arr.length;
  for (let i = len - 1; i > 0; i--) {
    let r = Math.trunc(Math.random() * (i + 1));
    let tmp = arr[i];
    arr[i] = arr[r];
    arr[r] = tmp;
  }
  return arr;
};

// XXX O(n)...O(n^2)
//Array.prototype.shuffle = function() {
//  let arr = this.concat();
//  arr.sort(() => Math.random() - 0.5);
//  return arr;
//};

Array.seqInt = function(start, end) {
  if (!Number.isInteger(start))
    throw new TypeError('start must be integer');
  if (!Number.isInteger(end))
    throw new TypeError('end must be integer');

  let n = end - start;
  if (n < 0)
    return [];

  return Array.from({ length: n + 1 }, (v, i) => i + start);
};

Array.fillRandomInt = function(length, min, max) {
  if (!Number.isInteger(length))
    throw new TypeError('length must be positive integer');
  if (length <= 0)
    throw new RangeError('length must be positive integer');
  if (!Number.isInteger(min))
    throw new TypeError('min must be integer');
  if (!Number.isInteger(max))
    throw new TypeError('max must be integer');

  let n = max - min;
  if (n <= 0)
    throw new RangeError('must be min < max');

  let arr = new Array(length);
  let i = 0;
  while (length-- > 0)
    arr[i++] = Math.floor(Math.random() * n + min);
  return arr;
};

Array.fillUniqRandomInt = function(length, min, max) {
  if (!Number.isInteger(length))
    throw new TypeError('length must be positive integer');
  if (length <= 0)
    throw new RangeError('length must be positive integer');
  if (!Number.isInteger(min))
    throw new TypeError('min must be integer');
  if (!Number.isInteger(max))
    throw new TypeError('max must be integer');

  let n = max - min;
  if (n <= 0)
    throw new RangeError('must be min < max');

  if (length > n)
    length = n;

  let arr = [];
  let i = 0;
  while (i < length) {
    let r = Math.floor(Math.random() * n + min);
    if (arr.indexOf(r) === -1) {
      arr.push(r);
      ++i;
    }
  }
  return arr;
};

Array.prototype.reshape = function(...dim) {
  if (dim.length === 0)
    dim = [ this.length ];

  let len = dim.reduce((p, c) => {
    if (!Number.isInteger(c))
      throw new TypeError('dim must by array of positive integer');
    return p * c;
  }, 1);

  if (len !== this.length)
    throw new RangeError(`${dim} is invalid dimension. multiply them must be ${this.length}`);

  if (dim.length === 1)
    return this.concat();

  let result = new Array(dim[0]);
  let pos = 0;
  let skip = dim[dim.length - 1];

  let rec = (arr, i) => {
    for (let j = 0; j < arr.length; j++) {
      if (i < dim.length - 1) {
        arr[j] = new Array(dim[i]);
        rec(arr[j], i + 1);
      } else {
        arr[j] = this.slice(pos, pos + skip);
        pos += skip;
      }
    }
  };
  rec(result, 1);

  return result;
};

Array.prototype.idxOf = function(equalFunction) {
  for (let i = 0, len = this.length; i < len; i++)
    if (equalFunction.call(null, this[i]))
      return i;
  return -1;
};

Array.prototype.cycle = function(howMany) {
  if (!Number.isInteger(howMany))
    throw new TypeError('howMany must be integer');

  howMany %= this.length;

  if (howMany < 0) {
    let a = this.splice(0, -howMany);
    this.splice(this.length, 0, ...a);
  } else if (howMany > 0) {
    let a = this.splice(this.length - howMany, howMany);
    this.splice(0, 0, ...a);
  }
  return this;
};