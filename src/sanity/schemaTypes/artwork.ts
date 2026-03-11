import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const artwork = defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  icon: ImageIcon,
  groups: [
    { name: 'main', title: 'Main Info', default: true },
    { name: 'ordering', title: 'Ordering' },
    { name: 'details', title: 'Details' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'main',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'main',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'main',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (rule) => rule.required().warning('Alt text is important for SEO'),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'main',
      options: {
        list: [
          { title: 'Elegant Contemporary', value: 'elegant-contemporary' },
          { title: 'Abstracts', value: 'abstracts' },
          { title: 'Portraits', value: 'portraits' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'story',
      title: 'Story',
      type: 'text',
      group: 'main',
      rows: 4,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Gallery Order',
      type: 'number',
      group: 'ordering',
      description: 'Order number for this artwork on its gallery page (lower numbers appear first)',
      validation: (rule) => rule.required().min(1),
      initialValue: 100,
    }),
    defineField({
      name: 'featured',
      title: 'Show on Homepage',
      type: 'boolean',
      group: 'ordering',
      description: 'Turn ON to show this artwork on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'featuredOrder',
      title: 'Homepage Order',
      type: 'number',
      group: 'ordering',
      description: 'Order number on the homepage (lower numbers appear first). Only matters if "Show on Homepage" is ON.',
      hidden: ({ parent }) => !parent?.featured,
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'details',
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      group: 'details',
    }),
  ],
  orderings: [
    {
      title: 'Gallery Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Homepage Order',
      name: 'featuredOrderAsc',
      by: [{ field: 'featuredOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      category: 'category',
      displayOrder: 'displayOrder',
      featured: 'featured',
    },
    prepare({ title, media, category, displayOrder, featured }) {
      const orderLabel = displayOrder ? `#${displayOrder}` : ''
      const star = featured ? ' ⭐' : ''
      return {
        title: `${orderLabel} ${title}${star}`,
        subtitle: category,
        media,
      }
    },
  },
})
