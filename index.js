// resumeShortList
// writtenShortList
// techincalShorList
// hrShortList
// Job



let resumeShortList = () => {
    return new Promise((resolve, reject) => {
        resolve('Resume shortlisted')
    })
}


let writtenShortList = (details) => {

    return new Promise((resolve,reject)=> {
        resolve(details + ' Written shortlist')
    })
}

let techShortList = (details) => {
    return new Promise((resolve, reject) => {

        isClear = false;
        if(isClear){
            resolve(details + ' Techincal shortlisted')

        } else {
            reject('Rejected in technical round')
        }
    })
}


let hrShortList = (details) => {

    return new Promise((resolve,reject)=> {
        resolve(details + ' Hr shortlist')
    })
}


resumeShortList().then(writtenShortList).then(techShortList).
then(hrShortList).then((resolve, reject) => {
    console.log(resolve + ' got job')
}).catch(err => {
    console.log('Catch', err)
})