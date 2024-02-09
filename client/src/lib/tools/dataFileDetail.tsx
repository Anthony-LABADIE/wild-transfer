export type Activity = {
  id: number
  type: string
  person: {
    name: string
    imageUrl?: string
  }
  comment?: string
  date: string
  dateTime: string
}

export type Mood = {
  id: string
  name: string
  value: string | null
  iconName?: string
  iconColor: string
  bgColor: string
}

export const activity: Activity[] = [
  {
    id: 1,
    type: 'created',
    person: { name: 'Chelsea Hagon' },
    date: '7d ago',
    dateTime: '2023-01-23T10:32',
  },
  {
    id: 2,
    type: 'edited',
    person: { name: 'Chelsea Hagon' },
    date: '6d ago',
    dateTime: '2023-01-23T11:03',
  },
  {
    id: 3,
    type: 'sent',
    person: { name: 'Chelsea Hagon' },
    date: '6d ago',
    dateTime: '2023-01-23T11:24',
  },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment:
      'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  {
    id: 5,
    type: 'viewed',
    person: { name: 'Alex Curren' },
    date: '2d ago',
    dateTime: '2023-01-24T09:12',
  },
  {
    id: 6,
    type: 'paid',
    person: { name: 'Alex Curren' },
    date: '1d ago',
    dateTime: '2023-01-24T09:20',
  },
]
// export const moods: Mood[] = [
//   {
//     name: 'Excited',
//     value: 'excited',
//     icon: FireIcon,
//     iconColor: 'text-white',
//     bgColor: 'bg-red-500',
//   },
//   {
//     name: 'Loved',
//     value: 'loved',
//     icon: HeartIcon,
//     iconColor: 'text-white',
//     bgColor: 'bg-pink-400',
//   },
//   {
//     name: 'Happy',
//     value: 'happy',
//     icon: FaceSmileIcon,
//     iconColor: 'text-white',
//     bgColor: 'bg-green-400',
//   },
//   {
//     name: 'Sad',
//     value: 'sad',
//     icon: FaceFrownIcon,
//     iconColor: 'text-white',
//     bgColor: 'bg-yellow-400',
//   },
//   {
//     name: 'Thumbsy',
//     value: 'thumbsy',
//     icon: HandThumbUpIcon,
//     iconColor: 'text-white',
//     bgColor: 'bg-blue-500',
//   },
//   {
//     name: 'I feel nothing',
//     value: null,
//     icon: XMarkIconMini,
//     iconColor: 'text-gray-400',
//     bgColor: 'bg-transparent',
//   },
// ]
