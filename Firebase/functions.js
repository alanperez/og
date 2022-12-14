//const app = require('./index');
import { logIn } from "./firebaseAuth";
import {createObject, fetchObject, createWorkout, fetchWorkoutObject} from './fireStoreController';
import { register } from "./firebaseAuth";

export function registerUser(email, password, retypedPassword) {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
    {
        return("You have entered an invalid email address!")
    }
    if (!( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password))){
        return ("Password must be between 8 to 15 characters, must contain at least 1 upper case, one lower case, one numerical, and one special character");
    }
    if (!(retypedPassword === password)){
        return ("passwords do not match!")
    }
    
    return ("Account Generated")
}

export async function loginUser(email, password){
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
    {
        return("You have entered an invalid email address!")
    }
    try{
        const a = await logIn(email,password);
        console.log("a object: ", a);
        console.log(await a);
        const b = await fetchObject(a);
        console.log("b object: ", b);
        return b;
    }catch(e){
        console.error(e);
        return e;
    }
    
    //console.log(b);
    
    
}

export function personalInformationInput(age,bodyweight,heightFt, heightIn){
    if (age < 0 ){
        return "invalid age";
    }
    if (bodyweight < 0){
        return "invalid body weight";
    }

    if (heightFt < 0 || heightFt > 9){
        return "invalid height (feet)"
    }

    if (heightIn < 0 || heightIn > 11){
        return "invalid height (inches)"
    }

    return ("Personal Info Inputted")


}

export async function makeUser(username,email, password, retypedPassword, age,bodyweight,heightFt, heightIn){
    try{

        if (!registerUser(email, password, retypedPassword) === "Account Generated"){
            return false;
        }

        if (!personalInformationInput(age, bodyweight,heightFt,heightIn) === "Personal Info Inputted"){
            return false;
        }

        const b = await register(email,password);
        console.log(password);
        const a = await createObject(username,email, age ,bodyweight,heightFt, heightIn,b.uid);
        //const b = await 
        return true;
    }catch(e){
        console.error(e);
        return false;
    }
    
    
}



export function checkWorkoutMax(pounds, sets, reps){

    if (sets < 1 || sets > 30){
        return "invalid sets, must be between 1 and 30";
    }

    if (pounds < 1 || pounds > 600){
        return "invalid weights (lbs), must be between 1 and 600";
    }

    if (reps < 5 || reps > 40){
        return "invalid reps, must be between 1 and 40";
    }

    return ("Workout Input information Successful")
}


export async function makeWorkout(workoutName,workoutType,workoutDate,workoutTime,workoutDuration,workoutNotes, workoutSets, workoutReps, workoutWeights) {

    try {
        const res = await createWorkout(workoutName,workoutType,workoutDate,workoutTime,workoutDuration,workoutNotes, workoutSets, workoutReps, workoutWeights);
        return true;
    } catch (error) {
        console.error("making workout error: ", error);
    }

}
// accepts a workout UID and returns the workout object
export async function getWorkoutInfo(workoutUID){
    const a = await fetchWorkoutObject(workoutUID);
    console.log("object: ", a );
    return await a;
}

export async function getWorkout(workoutUID){
    if (workoutUID == "EzQJ4aIV6o4poWrk7IV4"){
        return {
            "uid": "EzQJ4aIV6o4poWrk7IV4",
            "workoutDate": {
              "nanoseconds": 718000000,
              "seconds": 1669951042,
            },
            "workoutDuration": "a",
            "workoutName": "A",
            "workoutNotes": "a",
            "workoutReps": "a",
            "workoutSets": "a",
            "workoutTime": "a",
            "workoutType": "b",
            "workoutWeights": "a",
          }
    }else{
        return {}
    }
}

export function editWorkOut(workoutSets, workoutReps, workoutWeights){
    const editObj = {
        workoutReps: workoutReps,
        workoutSets: workoutSets,
        workoutWeights: workoutWeights
    }
    //const x = await setDoc(colRef,editObj, {merge: true});
    
    return editObj
}