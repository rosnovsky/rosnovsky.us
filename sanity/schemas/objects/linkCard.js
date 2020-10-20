import React, { useState, useEffect } from 'react'

const Preview = ({ value }) => {
  const [data, setData] = useState()

  useEffect(() => {
    const response = async () => {
      let url = 'https://api.github.com/repos/rosnovsky/rosnovskyus/commits'
      let response = await fetch(url)

      let commits = await response.json() // read response body and parse as JSON

      setData(commits[0].commit.author.name)
      console.warn(commits[0].commit.author.name)
      return commits[0].commit.author.name
    }
    response()
  }, [])
  return <p>{data}</p>
}

export default {
  title: 'Link Card',
  name: 'linkCard',
  type: 'object',
  preview: {
    select: {
      url: 'href'
    },
    component: Preview
  },
  fields: [
    {
      title: 'URL',
      name: 'href',
      type: 'url',
      validation: Rule => Rule.uri({ allowRelative: true, scheme: ['https'] })
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      readOnly: true
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
      readOnly: true
    },
    {
      title: 'Author',
      name: 'author',
      type: 'string',
      readOnly: true
    },
    {
      title: 'Publisher',
      name: 'publisher',
      type: 'string',
      readOnly: true
    },
    {
      title: 'Logo URL',
      name: 'logo',
      type: 'url',
      readOnly: true
    },
    {
      title: 'Image URL',
      name: 'imageUrl',
      type: 'url',
      readOnly: true
    },
    {
      title: 'Publication Date',
      name: 'publicationDate',
      type: 'datetime',
      options: {
        dateFormat: 'MMM Do, YYYY'
      },
      readOnly: true
    }
  ]
}
