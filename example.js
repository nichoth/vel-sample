var vel = require('vel');
var struct = require('observ-struct');
var observ = require('observ');

function Header(opts) {
  var state = struct({
    text: observ('my header')
  });

  setTimeout(function() {
    state.text.set('new header text');
  }, 1000);

  return state;
}


Header.vel = vel(function(h, state) {
  return h('h1', state.text);
});


var state = struct({
  header: Header()
});


state(function onChange(state) {
  root.render(state);
});

var root = vel(function(h, state) {
  return h('div', [Header.vel.vtree(state.header)]);
});

document.body.appendChild(root.render(state()));
