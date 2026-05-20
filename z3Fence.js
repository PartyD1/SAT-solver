import { init } from 'z3-solver';

const { Context } = await init();
const {Solver, Int, And, Or, Not, Distinct} = new Context("main");

const CowSolver = new Solver();
const Cx = Int.const('x');
const Cy = Int.const('y');


/*
Left Fence: x = 5
Right Fence: x = 10
Top Fence: y = 25
Bottom Fence: y = 15
*/

CowSolver.add(And(
    Cx.gt(5),
    Cx.lt(10),
    Cy.gt(15),
    Cy.lt(25)
));



if (await CowSolver.check() === "sat") {

    let model = CowSolver.model();
    let xVal = parseInt(model.eval(Cx).toString());
    let yVal = parseInt(model.eval(Cy).toString());

    console.log(`sat. Cow placed at x=${xVal}, y=${yVal}`);

} else {

    console.log("unsat. Could not find a valid position for the Cow.");

}

const decorSolver = new Solver();

const Dx = Int.const('Dx');
const Dy = Int.const('Dy');
//Use Z3  decoration is either on the top side or the left side of the fence.
decorSolver.add(Or(
    And(Dx.eq(5), Dy.ge(15), Dy.le(25)),
    And(Dy.eq(15), Dx.ge(5), Dx.le(10))
));


if (await decorSolver.check() === "sat") {

    let model = decorSolver.model();
    let xVal = parseInt(model.eval(Dx).toString());
    let yVal = parseInt(model.eval(Dy).toString());

    console.log(`sat. Decoration placed at x=${xVal}, y=${yVal}`);

} else {

    console.log("unsat. Could not find a valid position for Decoration.");

}

const treeSolver = new Solver();

const Tx = Int.const('Tx');
const Ty = Int.const('Ty');

treeSolver.add(And(
    Tx.ge(8),
    Ty.ge(20),
    Or(
        Tx.lt(5),   // left of fence
        Tx.gt(10),  // right of fence
        Ty.lt(15),  // above fence
        Ty.gt(25)   // below fence
    )
));

if (await treeSolver.check() === "sat") {

    let model = treeSolver.model();
    let xVal = parseInt(model.eval(Tx).toString());
    let yVal = parseInt(model.eval(Ty).toString());

    console.log(`sat. Tree placed at x=${xVal}, y=${yVal}`);

} else {

    console.log("unsat. Could not find a valid position for Tree.");

}