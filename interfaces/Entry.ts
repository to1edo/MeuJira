export interface Entry{
  _id: string;
  description:string;
  createdAt:number;
  status: EntryStatus['status'];
}

export interface EntryStatus{
  status: 'pending'|'in-progress'|'finished'
}