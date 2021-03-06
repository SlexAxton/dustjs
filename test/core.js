(function(exports){

exports.coreSetup = function(suite, auto) {
  auto.forEach(function(test) {
    suite.test(test.name, function(){
      testRender(this, test.source, test.context, test.expected);
    });
  });

  suite.test("base context", function() {
    var base = dust.makeBase({
      sayHello: function() { return "Hello!" }
    });
    testRender(this, "{sayHello} {foo}", base.push({foo: "bar"}), "Hello! bar");
  });

  suite.test("valid keys", function() {
    testRender(this, "{_foo}{$bar}{baz1}", {_foo: 1, $bar: 2, baz1: 3}, "123");
  });
}

function testRender(unit, source, context, expected) {
  var name = unit.id;
  dust.loadSource(dust.compile(source, name));
  dust.render(name, context, function(err, output) {
    try {
      unit.ifError(err);
      unit.equals(output, expected);
    } catch(err) {
      unit.fail(err);
      return;
    }
    unit.pass();
  });
}

})(typeof exports !== "undefined" ? exports : window);