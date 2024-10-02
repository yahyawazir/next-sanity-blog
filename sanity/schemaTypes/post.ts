import { defineField } from "sanity";
import { DocumentIcon, PlayIcon } from '@sanity/icons';

export default {
    title: 'Post',
    name: 'post',
    icon: DocumentIcon,
    type: 'document',
    groups: [{ name: 'seo', title: 'SEO' }],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            description: 'This is your blog post title',
            type: 'string',
            validation: rule => rule.min(25).required()
        }),
        defineField({
            name: 'description',
            title: 'Description',
            description: 'Make this description brief so the visitor knows what to expect in this blog post',
            type: 'string',
            validation: (rule) => rule.min(50).max(250).required()
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' }
        }),
        defineField({
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
            description: 'Meta Title Tag',
            group: 'seo'
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'string',
            description: 'Meta Description Tag',
            group: 'seo'
        }),
        defineField({
            name: 'author',
            type: 'reference',
            title: 'Author',
            to: [{ type: 'author' }],
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            // This allows you to crop images in the editor
            options: { hotspot: true }
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }]
        })
    ]
}