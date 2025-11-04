'use client';


export default function Table({posts}: {posts: any}) {
    console.log(posts);
    return (
        <div>
            <pre>{JSON.stringify(posts, null, 2)}</pre>
        </div>
    );
}