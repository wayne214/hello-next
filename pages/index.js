import Link from 'next/link' // 客户端导航
import Layout from '../components/MyLayout';
import fetch from 'isomorphic-unfetch';

function getPosts() {
    return [
        { id: 'hello-nextjs', title: 'Hello Next.js'},
        { id: 'learn-nextjs', title: 'Learn Next.js is awesome'},
        { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT'},
    ]
}
/**
 * snext / link只是一个更高阶的组件，它只接受“href”和一些类似的道具。
 如果需要设置样式，则需要对底层组件进行设置。
 * */
/**
 * Router Masking：路由掩码
 * 在这里，我们将使用Next.js的一个独特功能，称为路由掩码。
 * 基本上，它会在浏览器上显示与您的应用看到的实际网址不同的网址。
 * Link的"as"属性
 * */
const PostLink = ({post}) => (
    <li>
        <Link as={`/p/${post.id}`} href={`/post?title=${post.title}`}>
            <a>{post.title}</a>
        </Link>
    </li>
)

const Index = () => (
    <Layout>
        <h1>Batman TV Shows</h1>
        <ul>
            {/*{props.shows.map(({show})=>(*/}
                {/*<li>*/}
                    {/*<Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>*/}
                        {/*<a>{show.name}</a>*/}
                    {/*</Link>*/}
                {/*</li>*/}
            {/*))}*/}
            {getPosts().map((post) => (
                <PostLink key={post.id} post={post}/>
            ))}
        </ul>

        <style jsx>
            {`
            h1, a {
            font-family: 'Arial';
            }

            ul {
               padding: 0;
            }

            li {
               list-style: none;
               margin: 5px 0;
            }

            a {
               text-decoration: none;
               color: red;
            }
            `}
        </style>
    </Layout>
);

Index.getInitialProps = async function () {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()

    console.log(`Show data fetched. Count: ${data.length}`)

    return {
        shows: data
    }

}

export default Index