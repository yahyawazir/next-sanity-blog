import { SanityImageAssetDocument } from "next-sanity";

export namespace SanityTypes {
    export interface Post {
        _id: string;
        _createdAt: Date;
        _updatedAt: Date;
        title: string;
        description: string;
        slug: { current: string };
        author: Author<SanityImageAssetDocument | undefined>;
        image: SanityImageAssetDocument;
        content: any;
    }
    export interface Author<T> {
        _id: string;
        name: string;
        image: T;
    }
}