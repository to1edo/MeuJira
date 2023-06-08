import { NextApiRequest, NextApiResponse } from 'next';
import { EntryModel as Entry, Ientry } from '../../../models';
import { db } from '../../../database';
import mongoose from 'mongoose';

type Data =
  { message: string } |
  Ientry[] |
  Ientry

export default function handler(req:NextApiRequest, res:NextApiResponse) {

  req.statusCode = 200;

  if( !mongoose.isValidObjectId( req.query.id ) ){
    return res.status(400).json({message: 'id is not valid'});
  }

  switch (req.method) {
    case 'PUT': 
      return updateEntry(req, res);

    case 'GET':
      return getEntry(req, res);

    case 'DELETE':
      return deleteEntry(req, res);
  
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

}

const updateEntry = async ( req:NextApiRequest, res:NextApiResponse<Data>) => {

  try {

    const { id } = req.query;
  
    await db.connect()

    const entryToUpdate = await Entry.findById(id);
    
    if(!entryToUpdate){
      return res.status(404).json({message: 'Entry not found'});
    }

    const { description = entryToUpdate.description, status = entryToUpdate.status } = req.body;
    const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { new: true, runValidators: true });

    return res.status(200).json(updatedEntry!);

  } catch (error) {

    console.log(error)
    return res.status(500).json({message: 'server error'})

  }finally{
    await db.disconnect()
  }
  
}

const getEntry = async (req:NextApiRequest, res:NextApiResponse<Data>) => {
  
  const { id } = req.query;

  try {

    await db.connect();
    const entry = await Entry.findById(id);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    
    return res.status(200).json(entry!);

  } catch (error) {

    console.log(error)
    return res.status(500).json({message: 'server error'})

  }finally{
    await db.disconnect()
  }
}

const deleteEntry = async(req:NextApiRequest, res:NextApiResponse<Data>) => {
  const { id } = req.query;

  try {

    await db.connect();
    await Entry.deleteOne({ _id: id });
    return res.status(200).json({message: 'Entry deleted'});

  } catch (error) {

    console.log(error)
    return res.status(500).json({message: 'server error'})

  }finally{
    await db.disconnect()
  }
}