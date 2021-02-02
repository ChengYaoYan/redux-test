const getData = function() {
  return document.getElementById('container').value;
};
const encodeData = function(data) {
  let te = new TextEncoder();
  return te.encode(data);
};
const hashData = function(algorithm) {
  let str = getData();
  let finData = encodeData(str);
  str = null;
  return crypto.subtle.digest(algorithm, finData);
};
{
  let but = document.getElementById('submit');
  but.onclick = function(ev) {
    let algos = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
    let out = document.getElementById('output');
    for (let i = 0; i < algos.length; i++) {
      const newEl = document.createElement('li');
      hashData(algos[i]).then((res) => {
        let te = new TextDecoder();
        newEl.textContent = te.decode(res);
        out.append(newEl);
      })
    }
    out = null;
  }
  but = null;
};