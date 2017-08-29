const users = [
  {
    id: 1,
    name: 'Bob',
    playerId: 532
  },
  {
    id: 2,
    name: 'John',
    playerId: 8761
  }
]

const scores = [
  {
    id: 1,
    playerId: 532,
    score: 9000
  },
  {
    id: 2,
    playerId: 8761,
    score: 33000
  },
  {
    id: 3,
    playerId: 532,
    score: 17530
  }
]

const getUser = id => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.id === id)

    if (user) {
      resolve(user)
    } else {
      reject(new Error(`Unable to find user with an id of ${id}`))
    }
  })
}

const getScores = playerId => {
  return new Promise((resolve, reject) => {
    resolve(scores.filter(score => score.playerId === playerId))
  })
}

const getStatus = id => {
  let user

  return getUser(id).then(tempUser => {
    user = tempUser
    return getScores(user.playerId)
  }).then(scores => {
    let average = 0

    if (scores.length > 0) {
      average = scores.map(score => score.score).reduce((a, b) => a + b) / scores.length
    }

    return `${user.name} has an average score of ${average}`
  })
}

// async await
const getStatusAsync = async (id) => {
  const user = await getUser(id) // wait for promise
  const scores = await getScores(user.playerId)
  let average = 0

  if (scores.length > 0) {
    average = scores.map(score => score.score).reduce((a, b) => a + b) / scores.length
  }

  return `${user.name} has an average score of ${average}`

  // throw new Error('error') // same as rejecting
  // return 'bob' // same as resolving
}

getStatusAsync(2)
  .then(name => {
    console.log(name)
  })
  .catch(e => {
    console.log(e)
  })

// getUser(1)
//   .then(user => console.log(user))
//   .catch(e => console.log(e))

// getScores(532)
//   .then(scores => console.log(scores))
//   .catch(e => console.log(e))

// getStatus(1)
//   .then(status => console.log(status))
//   .catch(e => console.log(e))
