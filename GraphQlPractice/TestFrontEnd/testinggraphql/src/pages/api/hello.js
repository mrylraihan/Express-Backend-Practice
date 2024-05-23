// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let query=req.body.query
  const data = await fetch('http://localhost:4000/graphql', {
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query})
  })
  .then((res) => res.json())
  res.status(200).json(data);
}
