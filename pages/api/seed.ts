import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../database';

type Data={
  message:string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>){

  if(process.env.NODE_ENV === 'production'){
    return res.status(401).json({message: 'Don\'t have permission to perform this action.'})
  }

  if(req.method !== 'GET'){
    return res.json({message: 'Method not allowed'})
  }

  await db.conect()
  await db.disconnect()

  res.status(200).json({message: 'OK'});
}
