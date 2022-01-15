use blackjack_hub;
db.dropDatabase();

db.players.insertMany(
    [
        {
          name: "Crammy Baggerston",          
          turnsSurvived: 10
        },
        {
            name: "Grimwalf Dooberstein",          
            turnsSurvived: 5
        },
        {
            name: "Dreamy Swastbecker",          
            turnsSurvived: 1
        }
      ]);