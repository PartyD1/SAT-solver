import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Not, Distinct} = new Context("main");

const solver = new Solver();

//const x = Int.const('x');  // x is a Z3 integer
//solver.add(And(x.le(10), x.ge(9)));  // x <= 10, x >=9
const bob = Int.const('bob');
const mary = Int.const('mary');
const cathy = Int.const('cathy');
const sue = Int.const('sue');

solver.add(And(Not(bob.eq(1)), Not(bob.eq(3)), Not(bob.eq(4))));
solver.add(Not(mary.eq(4)));
solver.add(And(Not(sue.eq(1)), Not(sue.eq(2)), Not(sue.eq(4))));
solver.add(And(bob.ge(1), bob.le(4)));
solver.add(And(mary.ge(1), mary.le(4)));
solver.add(And(cathy.ge(1), cathy.le(4)));
solver.add(And(sue.ge(1), sue.le(4)));
solver.add(Distinct(bob, mary, cathy, sue));



// Run Z3 solver, find solution and sat/unsat

if (await solver.check() === "sat") {

    let model = solver.model();
    let bobVal = parseInt(model.eval(bob).toString());
    let maryVal = parseInt(model.eval(mary).toString());
    let cathyVal = parseInt(model.eval(cathy).toString());
    let sueVal = parseInt(model.eval(sue).toString());
    const labels = ["Cat", "Dog", "Bird", "Fish"];

    console.log(`sat. A valid value for Bob is: ${labels[bobVal-1]}`);
    console.log(`sat. A valid value for Mary is: ${labels[maryVal-1]}`);
    console.log(`sat. A valid value for Cathy is: ${labels[cathyVal-1]}`);
    console.log(`sat. A valid value for Sue is: ${labels[sueVal-1]}`);

} else {

    console.log("unsat. Could not find a valid value for x.");

}
