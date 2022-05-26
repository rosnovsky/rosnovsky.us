import {MdAirplaneTicket} from 'react-icons/md';

export default {
  name: 'flight',
  title: 'Flight',
  type: 'document',
  icon: MdAirplaneTicket,
  fields: [
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'traveleres',
      title: 'Traveleres',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'person' },
          ]
        }]
    },
    {
      name: 'airline',
      title: 'Airline',
      type: 'reference',
      to: { type: 'airline' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'flightNumber',
      title: 'Flight Number',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.date}-${doc.flightNumber}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'from',
      title: 'From',
      type: 'reference',
      to: { type: 'city' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'to',
      title: 'To',
      type: 'reference',
      to: { type: 'city' },
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      from: 'from.name',
      to: 'to.name',
      date: 'date',
      airline: 'airline.name',
    },
    prepare({ from, to, date, airline }) {
      return {
        title: airline + ': ' + from + ' to ' + to,
        subtitle: new Date(date).toLocaleDateString('en-US', {  
          year: 'numeric', month: 'long', day: 'numeric'
        }),
      }
    }
  },
};
