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

use("algocraft");
// Select the database to use.

db.sheets.aggregate([
    {
      $match: {
        sheet_author: "neetcode300",
      },
    },
    {
      $lookup: {
        from: "questions",
        localField: "sheet_data",
        foreignField: "_id",
        as: "sheet_data",
      },
    },
    {
      $unwind: "$sheet_data",
    },
    {
      $group: {
        _id: null,
        totalEasy: {
          $sum: {
            $cond: [{ $eq: ["$sheet_data.difficulty", "Easy"] }, 1, 0]
          }
        },
        totalMedium: {
          $sum: {
            $cond: [{ $eq: ["$sheet_data.difficulty", "Medium"] }, 1, 0]
          }
        },
        totalHard: {
          $sum: {
            $cond: [{ $eq: ["$sheet_data.difficulty", "Hard"] }, 1, 0]
          }
        },
      },
    },
    {
      $set: {
        totalEasy: "$totalEasy",
        totalMedium: "$totalMedium",
        totalHard: "$totalHard"
      }
    }
  ]).forEach(function(doc) {
      db.sheets.updateOne(
          { sheet_author: "neetcode300" },
          { $set: { totalEasy: doc.totalEasy, totalMedium: doc.totalMedium, totalHard: doc.totalHard } },
          { multi: true }
      );
  });
  
  