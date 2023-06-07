
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { EntryModel as Entry, Ientry } from '../../../models';

type Data =
  { message: string } |
  Ientry[] |
  Ientry


export default function handler(req:NextApiRequest, res:NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET': 
      return getEntries(res);

    case 'POST': 
      return addEntry(req.body.description, res);

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

const addEntry = async ( description:string ,res:NextApiResponse<Data>) => {

  try {

    await db.connect()
    const result = await Entry.create({description})
    // console.log(result)
    return res.status(201).json(result)

  } catch (error) {

    console.log(error)
    return res.status(500).json({message: 'server error'})

  }finally{
    await db.disconnect()
  }
  
}