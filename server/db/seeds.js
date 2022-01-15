use blackjack_hub;
db.dropDatabase();

db.players.insertMany(
    [
        {
          name: "Crammy Baggerston",          
          currentMoney: 0,
          turnsSurvived: 10

        },
        {
            name: "Grimwalf Dooberstein", 
            currentMoney: 0,         
            turnsSurvived: 5
        },
        {
            name: "Dreamy Swastbecker",          
            currentMoney: 0,
            turnsSurvived: 1
        }
      ]);