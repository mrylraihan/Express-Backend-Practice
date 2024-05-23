import React, { useEffect } from 'react'

function index() {
  let query = `
  query{
  getNoteData{
    _id
    title
    owner {
      _id
      userName
    }
  }
}
  
  `
  useEffect(() => {
    fetch('./api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    })
      .then(res => res.json())
      .then(console.log)
      .catch(console.error)
  }, [])
  return (
    <div className='App'>
      <h1>hello</h1>
    </div>
  )
}

export default index