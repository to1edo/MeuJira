interface seedObject {
  entries: seedEntry[];
}

interface seedEntry{
  description: string;
  createdAt: number;
  status: string;
}


export const seedData:seedObject = {
  entries:[
    {
      description: "Sit esse ullamco laboris duis deserunt dolor cillum.",
      createdAt: 1685859347161,
      status: "finished"
    },
    {
      description: "Dolore non pariatur cupidatat consectetur dolor laboris nisi velit.",
      createdAt: 1685859347162,
      status: "in-progress"
    },
    {
      description: "Sunt labore occaecat duis nostrud.",
      createdAt: 1685859347162,
      status: "pending"
    },
    {
      description: "Consequat esse commodo ipsum reprehenderit elit.",
      createdAt: 1685859347162,
      status: "finished"
    },
    {
      description: "Culpa anim cillum cupidatat excepteur dolore excepteur in incididunt.",
      createdAt: 1685859347162,
      status: "pending"
    }
  ]
}