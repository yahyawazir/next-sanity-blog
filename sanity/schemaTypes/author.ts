import { UserIcon } from "@sanity/icons";
import { defineField } from "sanity";

export default {
    name: 'author',
    title: 'Author',
    type: 'document',
    icon: UserIcon,
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            title: 'Name'
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'name' }
        }),
        defineField({
            name: 'image',
            title: 'Profile Image',
            type: 'image',
            options: { hotspot: true }
        }),
    ]
}