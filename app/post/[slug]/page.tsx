import React from 'react'
import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Label } from '@/components/ui/label'
import { SanityTypes } from '@/@types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CalendarIcon } from 'lucide-react'
import { Metadata } from 'next'
import { BlogPosting, BreadcrumbList, Service, WithContext } from 'schema-dts';
import { siteData } from '@/site'
import StructuredData from '@/components/StructuredData'
import moment from 'moment';

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

/**
 * 
 * @param {Props}
 * @description Metadata API - including Open Graph tags for social preview readability
 * @returns {Promise<Metadata>}
 */
export async function generateMetadata(
    { params, searchParams }: Props
): Promise<Metadata> {

    const query = `
        *[_type == "post" && slug.current == $slug] {
            _id,
            "title": metaTitle,
            "description": metaDescription,
            image,
        }[0]
    `
    const data = await client.fetch(query, { slug: params.slug });

    return {
        applicationName: "My Personal Blog",
        creator: 'Yahya Elfard',
        metadataBase: new URL(siteData.url),
        title: data.title,
        description: data.description,
        openGraph: {
            title: data.title,
            description: data.description,
            images: urlFor(data.image).url() ?? '',
            type: 'website',
            locale: 'en_AU'
        },
        authors: [{ name: 'Yahya Elfard' }],
        referrer: 'origin-when-cross-origin'
    }
}

export const revalidate = 60;

async function getPost(slug: string): Promise<any> {
    const query = `
        *[_type == 'post' && slug.current == $slug]{
            _createdAt,
            _id, 
            title, 
            image,
            metaTitle, 
            metaDescription,
            description,
            content,
            author->
        }[0]
    `
    return await client.fetch(query, { slug })
}

export default async function Page({ params: { slug } }: { params: { slug: string; } }) {
    const post: SanityTypes.Post = await getPost(slug);

    const schemaData: WithContext<BlogPosting> = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "image": urlFor(post.image).url() ?? "",
        "author": {
            "@type": "Person",
            "name": post.author.name,
            "url": "https://linkedin.com/in/yahya-elfard-451b51206"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": siteData.url
        },
        "datePublished": moment(post._createdAt).format("yyyy-mm-dd"),
        "publisher": {
            "@type": "Person",
            "name": post.author.name,
        },
    };
    
    const breadcrumb: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteData.url
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": post.title,
            "item": `${siteData.url}/post/${slug}`
        }
        ]
    }
    return (
        <>
            <StructuredData data={schemaData} />
            <StructuredData data={breadcrumb} />
            <div className="flex flex-col items-center w-full bg-background">
                <div className='h-full w-full flex flex-1 max-w-[1500px] pb-24 md:px-14 pt-32 px-4 flex-col space-y-4'>
                    <Label className='text-5xl max-w-4xl tracking-tighter font-extrabold'>{post.title}</Label>

                    <div className='flex flex-row items-center space-x-5 pb-2'>
                        <div className='flex flex-row items-center space-x-2'>
                            <Avatar>
                                {
                                    post.author?.image &&
                                    <AvatarImage src={urlFor(post.author?.image).url()} />
                                }
                                <AvatarFallback>{post.author.name.substring(0, 1)}</AvatarFallback>
                            </Avatar>
                            <p className='font-bold'>{post.author.name}</p>
                        </div>
                        <div className="flex flex-row items-center space-x-2">
                            <CalendarIcon size={20} className="text-primary" />
                            <p className="font-medium">{new Date(post._createdAt).toDateString()}</p>
                        </div>
                    </div>
                    <div className='w-full h-96 max-h-96 relative overflow-hidden'>
                        <Image
                            src={urlFor(post.image).url()}
                            alt={post.title}
                            fill
                            className='h-full w-full object-cover object-center rounded-lg'
                        />
                    </div>
                    <article className="prose lg:prose-lg pt-6 dark:prose-invert">
                        <PortableText
                            value={post.content}
                        />
                    </article>
                </div>
            </div>
        </>
    )
}
