function randClass(){
    let classroom = Math.floor(Math.random()*3)
    let suffixes = ["a", "b", "c"]
    let suffix = suffixes[Math.round(Math.random()*2)]
    test = `${classroom}`+"."+ suffix
    return test
}

for (let index = 0; index < 25; index++) {
    console.log(randClass())
}