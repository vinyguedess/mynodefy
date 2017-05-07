const assert = require("chai").assert;

const ER = require("./../../../src/Validators/EntityRules"),
  User = require("./../../DataProvider/Entity/User");

describe("EntityTest", () => {
  describe("Manipulating attributes", () => {
    it("Should set and get Entity's attributes", () => {
      let u = new User();

      u.set("name", "Neymar Jr.");
      u.set({
        job: "Soccer Player",
        active: true
      });
      u.age = 25;

      assert.equal("Neymar Jr.", u.name);
      assert.equal("Soccer Player", u.get("job"));
      assert.isAtLeast(u.age, 25);
      assert.isTrue(u.get("active"));
    });
  });

  describe("Validating an Entity", () => {
    it("Should validate required fields", () => {
      let u = new User();
      u.set({
        name: "Sandra Bullock",
        //login: "empty required field",
        password: "!sandra@bullock"
      });
      assert.isFalse(ER.validate(u).isValid());

      u.login = "sandra.bullock@";
      assert.isTrue(ER.validate(u).isValid());
    });

    it("Should validate if fields is under max defined size", () => {
      let u = new User();
      u.set({
        name: "Catherize Zeta Jones",
        login: "catherine.zeta.jones@100000",
        password: "@cat.z-jones"
      });
      assert.isFalse(ER.validate(u).isValid());

      u.login = "catz-jones";
      assert.isTrue(ER.validate(u).isValid());
    });

    it("Should validate if fields is over min defined size", () => {
      let u = new User();
      u.set({
        name: "Amanda Waller",
        login: "awall",
        password: "a@wal"
      });
      assert.isFalse(ER.validate(u).isValid());

      u.password = "a@waller";
      assert.isTrue(ER.validate(u).isValid());
    });

    it("Should get a list of errors", () => {
      let u = new User();
      //u.set('name', 'Stephen Spilberg');
      u.set("login", "stephen.spilberg");
      u.set("password", "ss@12");

      let errors = ER.validate(u).getErrors();
      console.log(errors);
    });
  });
});
