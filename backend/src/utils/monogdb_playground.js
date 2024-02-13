/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/
import { Resource } from "../models/resources.model.js";
// use("algocraft");
// Select the database to use.
const obj = {
    title: "React Basics Notes",
    link: "https://drive.google.com/file/d/1JTJkhtCeootLEbQP-yiIpzgZpMLqqJCv/view?usp=sharing",
    img: "https://res.cloudinary.com/dvspdkrk5/image/upload/v1707847970/react-img21_c9vwyb.png",
    description:
        "A concise guide to understanding the fundamentals of React. Learn about React components, state, props, JSX syntax, and component lifecycle methods",
};

async function saveobj(){
  try {
    const qs = new Resource(obj);
    await qs.save();
    console.log("Resource saved successfully.");
  } catch (error) {
    console.error("Error saving resource:", error);
  }
}

saveobj()
// db.sheets.aggregate([
//     {
//       $match: {
//         sheet_author: "neetcode300",
//       },
//     },
//     {
//       $lookup: {
//         from: "questions",
//         localField: "sheet_data",
//         foreignField: "_id",
//         as: "sheet_data",
//       },
//     },
//     {
//       $unwind: "$sheet_data",
//     },
//     {
//       $group: {
//         _id: null,
//         totalEasy: {
//           $sum: {
//             $cond: [{ $eq: ["$sheet_data.difficulty", "Easy"] }, 1, 0]
//           }
//         },
//         totalMedium: {
//           $sum: {
//             $cond: [{ $eq: ["$sheet_data.difficulty", "Medium"] }, 1, 0]
//           }
//         },
//         totalHard: {
//           $sum: {
//             $cond: [{ $eq: ["$sheet_data.difficulty", "Hard"] }, 1, 0]
//           }
//         },
//       },
//     },
//     {
//       $set: {
//         totalEasy: "$totalEasy",
//         totalMedium: "$totalMedium",
//         totalHard: "$totalHard"
//       }
//     }
//   ]).forEach(function(doc) {
//       db.sheets.updateOne(
//           { sheet_author: "neetcode300" },
//           { $set: { totalEasy: doc.totalEasy, totalMedium: doc.totalMedium, totalHard: doc.totalHard } },
//           { multi: true }
//       );
//   });
