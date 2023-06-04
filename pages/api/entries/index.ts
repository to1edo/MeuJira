
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { EntryModel as Entry, Ientry } from '../../../models';

type Data =
  { message: string } |
  Ientry[] 


export default function handler(req:NextApiRequest, res:NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET': 
      return getEntries(res);

    default: 
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const getEntries = async (res:NextApiResponse<Data>) => {
  
  await db.connect()
  const entries = await Entry.find().sort({createdAt: 'ascending'})
  await db.disconnect()

  return res.status(200).json(entries)
}