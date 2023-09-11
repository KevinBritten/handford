import {defineType} from 'sanity'

const schemaTemplate = {
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'slide',
          title: 'Slide',

          fields: [
            {
              name: 'slideTitle',
              title: 'Slide Title',
              type: 'string',
            },

            {
              name: 'image',
              title: 'Image',
              type: 'image',
            },
            {
              name: 'videoIdentifier',
              title: 'Video Identifier',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'slideTitle',
              media: 'image',
            },
            prepare(selection) {
              const {title, media} = selection
              return {
                title: title,
                media: media,
              }
            },
          },
        },
      ],
    },
  ],
}

export const creative = defineType({name: 'creative', title: 'Creative', ...schemaTemplate})
export const imaging = defineType({name: 'imaging', title: 'Imaging', ...schemaTemplate})
