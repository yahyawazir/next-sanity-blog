import React from "react";
import { SanityTypes } from "@/@types";
import ShineBorder from "@/components/magicui/shine-border";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { siteData } from "@/site";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbList, WithContext } from "schema-dts";



export async function generateMetadata() {
  const title = 'My Personal Blog', description = 'Welcome to my personal blog';
  return {
    applicationName: "My Personal Blog",
    creator: 'Yahya Elfard',
    metadataBase: new URL('http://localhost:3000'),
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_AU'
    },
    authors: [{ name: 'Yahya Elfard' }],
    referrer: 'origin-when-cross-origin'
  }
}

export const revalidate = 60;
async function getPosts() {
  const query = `
    *[_type == 'post'] | order(_createdAt desc)
  `
  return await client.fetch(query);
}
export default async function Home() {
  const posts: SanityTypes.Post[] = await getPosts();

  const breadcrumb: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": siteData.url
    }
    ]
  }
  return (
    <>
      <StructuredData data={breadcrumb} />
      <div className="flex flex-col items-center w-full bg-background">
        <div className='h-full w-full flex flex-1 max-w-[1500px] md:px-14 pt-24 px-4 flex-col space-y-4'>
          {/* Optional MagicUI component */}
          <ShineBorder
            borderWidth={3} className="relative flex h-[250px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-white bg-clip-text text-center text-4xl lg:text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">My Personal Blog</span>
          </ShineBorder>
          <div className='grid md:grid-cols-3 gap-8 grid-cols-1'>
            {
              posts.map((post: SanityTypes.Post, key: number) => {
                return (
                  <Link key={key} className="space-y-5 group cursor-pointer" href={`/post/${post.slug.current}`}>
                    <Card className="flex flex-col justify-between h-full">
                      <div className="space-y-5">
                        <div className="h-96 w-full overflow-hidden rounded-lg rounded-b-none relative">
                          <div className="h-full w-full bg-black opacity-0 absolute z-20 group-hover:opacity-25 transition-all duration-200 ease-out" />
                          <Image
                            src={urlFor(post.image).url()}
                            fill
                            alt={post.title}
                            className="h-full object-cover aspect-auto w-full group-hover:scale-150 group-hover:ease-in-out ease-in-out transition-all duration-500"
                          />
                        </div>
                        <div className="space-y-3 px-4 py-2">
                          <div className="flex flex-row items-center space-x-2">
                            <CalendarIcon size={20} className="text-primary" />
                            <p className="font-medium">{new Date(post._createdAt).toDateString()}</p>
                          </div>
                          <h2 className="text-2xl font-extrabold">{post.title}</h2>
                          <p>{post.description}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <Button className="w-full " variant={'outline'}>
                          <p>Read more</p>
                        </Button>
                      </div>
                    </Card>
                  </Link>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}
