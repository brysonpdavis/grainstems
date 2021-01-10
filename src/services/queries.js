import {client, q} from './db'

const getAllStems = client
    .query(q.Map(q.Paginate(q.Match(q.Index("all_stems"))), q.Lambda("X", q.Get(q.Var("X")))))
    .then(response => {
        return response.data 
    })
    .catch(error => console.error('Error: ', error.message))

export default getAllStems