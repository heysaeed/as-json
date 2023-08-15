import { bench, blackbox } from "as-bench/assembly/bench";
import { JSON } from "./src/json";
// @ts-ignore
@json
class Vec3 {
    x: f64;
    y: f64;
    z: f64;
}

// @ts-ignore
@json
class Player {
    firstName: string;
    lastName: string;
    lastActive: i32[];
    age: i32;
    pos: Vec3 | null;
    isVerified: boolean;
}

const vec: Vec3 = {
    x: 3.4,
    y: 1.2,
    z: 8.3,
}

const player: Player = {
    firstName: "Emmet",
    lastName: "West",
    lastActive: [8, 27, 2022],
    age: 23,
    pos: {
        x: 3.4,
        y: 1.2,
        z: 8.3,
    },
    isVerified: true,
}

console.log("Original: " + JSON.stringify(vec));
//console.log("Revised: " + vec.__JSON_Deserialize('{"x":3,"y":1,"z":8}').__JSON_Serialize());
console.log("Implemented: " + JSON.stringify(JSON.parse<Vec3>('{"x":3.4,"y":1.2,"z":8.3}')));

console.log("Original: " + JSON.stringify(player));
//console.log("Revised: " + vec.__JSON_Deserialize('{"x":3,"y":1,"z":8}').__JSON_Serialize());
console.log("Implemented: " + JSON.stringify(JSON.parse<Player>('{"firstName":"Emmet","lastName":"West","lastActive":[8,27,2022],"age":23,"pos":{"x":3.4,"y":1.2,"z":8.3},"isVerified":true}')));
.*
// 9,325,755
bench("Stringify Object (Vec3)", () => {
    blackbox<string>(vec.__JSON_Serialize());
});

// 17,747,531 -> 55,517,015
bench("New Parse Object (Vec3)", () => {
    blackbox<Vec3>(vec.__JSON_Deserialize(blackbox<string>('{"x":0,"y":0,"z":0}')));
});

// 17,747,531
bench("Old Parse Object (Vec3)", () => {
    blackbox<Vec3>(JSON.parse<Vec3>(blackbox<string>('{"x":3.4,"y":1.2,"z":8.3}')));
});*/