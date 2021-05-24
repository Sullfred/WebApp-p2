

module.exports.leveling = function leveling(currentXp, currentLevel, earnedXp, requiredXp){
    let newXp = currentXp + earnedXp
    if (newXp >= requiredXp){
        currentLevel++;
        currentXp = newXp-requiredXp;
        requiredXp = Math.floor(requiredXp*1.2);
        if(currentXp >= requiredXp){
            //console.log(`CurrentXp:${currentXp}, Currentlvl:${currentLevel}, NewXp:${newXp}, RequiredXp:${requiredXp}`);
            leveling(currentXp, currentLevel, 0, requiredXp);
        }
        else{
            //console.log(`CurrentXp:${currentXp}, Currentlvl:${currentLevel}, NewXp:${newXp}, RequiredXp:${requiredXp}`);
            return [currentLevel, currentXp, requiredXp];
        }
    }
    else{
        //console.log(`CurrentXp:${currentXp}, Currentlvl:${currentLevel}, NewXp:${newXp}, RequiredXp:${requiredXp}`)
        currentXp = newXp;
        return [currentLevel, currentXp, requiredXp];
    }

}